'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { getPusherClient } from '@/lib/pusher'
import type { Channel } from 'pusher-js'

// Event types for admin real-time updates
export type AdminEvent =
  | { type: 'new-user'; data: { id: string; name: string; email: string; createdAt: string } }
  | { type: 'new-product'; data: { id: string; name: string; vendorName: string; status: string } }
  | { type: 'new-report'; data: { id: string; type: string; priority: string; description: string } }
  | { type: 'new-article'; data: { id: string; title: string; authorName: string; status: string } }
  | { type: 'content-flagged'; data: { id: string; contentType: string; reason: string } }
  | { type: 'user-banned'; data: { id: string; name: string; bannedBy: string; reason: string } }
  | { type: 'product-approved'; data: { id: string; name: string; approvedBy: string } }
  | { type: 'product-rejected'; data: { id: string; name: string; rejectedBy: string; reason: string } }
  | { type: 'report-resolved'; data: { id: string; resolvedBy: string; action: string } }
  | { type: 'admin-action'; data: { action: string; adminName: string; targetType: string; targetId: string } }
  | { type: 'alert'; data: { id: string; title: string; message: string; priority: string; type: string } }
  | { type: 'stats-updated'; data: { stat: string; newValue: number; change: number } }

type EventHandler<T extends AdminEvent['type']> = (
  data: Extract<AdminEvent, { type: T }>['data']
) => void

interface AdminPusherContextValue {
  isConnected: boolean
  subscribe: <T extends AdminEvent['type']>(event: T, handler: EventHandler<T>) => () => void
  lastEvent: AdminEvent | null
  recentEvents: AdminEvent[]
}

const AdminPusherContext = createContext<AdminPusherContextValue | null>(null)

const MAX_RECENT_EVENTS = 50

export function AdminPusherProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [channel, setChannel] = useState<Channel | null>(null)
  const [lastEvent, setLastEvent] = useState<AdminEvent | null>(null)
  const [recentEvents, setRecentEvents] = useState<AdminEvent[]>([])
  const [handlers, setHandlers] = useState<Map<string, Set<EventHandler<any>>>>(new Map())

  // Initialize Pusher connection
  useEffect(() => {
    const pusher = getPusherClient()
    if (!pusher) return

    const adminChannel = pusher.subscribe('private-admin')

    adminChannel.bind('pusher:subscription_succeeded', () => {
      setIsConnected(true)
      setChannel(adminChannel)
    })

    adminChannel.bind('pusher:subscription_error', () => {
      setIsConnected(false)
    })

    // Bind to all admin event types
    const eventTypes: AdminEvent['type'][] = [
      'new-user',
      'new-product',
      'new-report',
      'new-article',
      'content-flagged',
      'user-banned',
      'product-approved',
      'product-rejected',
      'report-resolved',
      'admin-action',
      'alert',
      'stats-updated',
    ]

    eventTypes.forEach((eventType) => {
      adminChannel.bind(eventType, (data: any) => {
        const event = { type: eventType, data } as AdminEvent
        setLastEvent(event)
        setRecentEvents((prev) => [event, ...prev].slice(0, MAX_RECENT_EVENTS))

        // Call registered handlers
        const eventHandlers = handlers.get(eventType)
        if (eventHandlers) {
          eventHandlers.forEach((handler) => handler(data))
        }
      })
    })

    return () => {
      eventTypes.forEach((eventType) => {
        adminChannel.unbind(eventType)
      })
      pusher.unsubscribe('private-admin')
      setIsConnected(false)
      setChannel(null)
    }
  }, []) // Note: handlers excluded intentionally to avoid resubscribing

  // Update handlers when they change
  useEffect(() => {
    if (!channel) return

    const eventTypes: AdminEvent['type'][] = [
      'new-user',
      'new-product',
      'new-report',
      'new-article',
      'content-flagged',
      'user-banned',
      'product-approved',
      'product-rejected',
      'report-resolved',
      'admin-action',
      'alert',
      'stats-updated',
    ]

    // Re-bind handlers when they change
    eventTypes.forEach((eventType) => {
      channel.unbind(eventType)
      channel.bind(eventType, (data: any) => {
        const event = { type: eventType, data } as AdminEvent
        setLastEvent(event)
        setRecentEvents((prev) => [event, ...prev].slice(0, MAX_RECENT_EVENTS))

        const eventHandlers = handlers.get(eventType)
        if (eventHandlers) {
          eventHandlers.forEach((handler) => handler(data))
        }
      })
    })
  }, [channel, handlers])

  // Subscribe to specific event types
  const subscribe = useCallback(<T extends AdminEvent['type']>(
    event: T,
    handler: EventHandler<T>
  ): (() => void) => {
    setHandlers((prev) => {
      const newHandlers = new Map(prev)
      const eventHandlers = newHandlers.get(event) || new Set()
      eventHandlers.add(handler)
      newHandlers.set(event, eventHandlers)
      return newHandlers
    })

    // Return unsubscribe function
    return () => {
      setHandlers((prev) => {
        const newHandlers = new Map(prev)
        const eventHandlers = newHandlers.get(event)
        if (eventHandlers) {
          eventHandlers.delete(handler)
          if (eventHandlers.size === 0) {
            newHandlers.delete(event)
          }
        }
        return newHandlers
      })
    }
  }, [])

  return (
    <AdminPusherContext.Provider
      value={{
        isConnected,
        subscribe,
        lastEvent,
        recentEvents,
      }}
    >
      {children}
    </AdminPusherContext.Provider>
  )
}

// Hook to use admin pusher context
export function useAdminPusher() {
  const context = useContext(AdminPusherContext)
  if (!context) {
    throw new Error('useAdminPusher must be used within an AdminPusherProvider')
  }
  return context
}

// Hook to subscribe to specific admin events
export function useAdminEvent<T extends AdminEvent['type']>(
  event: T,
  handler: EventHandler<T>,
  deps: React.DependencyList = []
) {
  const { subscribe } = useAdminPusher()

  useEffect(() => {
    const unsubscribe = subscribe(event, handler)
    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, subscribe, ...deps])
}

// Hook to get real-time stats updates
export function useAdminStats(onStatsUpdate: (stat: string, newValue: number, change: number) => void) {
  useAdminEvent('stats-updated', (data) => {
    onStatsUpdate(data.stat, data.newValue, data.change)
  }, [onStatsUpdate])
}

// Hook to get new alerts
export function useAdminAlerts(onAlert: (alert: { id: string; title: string; message: string; priority: string; type: string }) => void) {
  useAdminEvent('alert', onAlert, [onAlert])
}
