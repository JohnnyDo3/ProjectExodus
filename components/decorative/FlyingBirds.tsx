'use client'

import { useEffect, useState } from 'react'
import { useSkyTheme } from '@/components/theme/SkyThemeProvider'

interface Bird {
  id: number
  clusterId: number
  offsetX: number // Horizontal offset within cluster
  offsetY: number // Vertical offset within cluster (for V-formation)
  size: number
  delay: number // Individual bird delay within cluster
}

interface Cluster {
  id: number
  y: number
  speed: number
  delay: number // Cluster start delay
  amplitude: number
  flapCycleDuration: number
  glideDuration: number
  formation: 'v-left' | 'v-right' | 'scattered' // Formation type
}

export function FlyingBirds() {
  const { currentPhase } = useSkyTheme()
  const [clusters, setClusters] = useState<Cluster[]>([])
  const [birds, setBirds] = useState<Bird[]>([])

  // Birds sleep at night! Only show during daytime phases
  const isDaytime = ['dawn', 'morning', 'day', 'afternoon'].includes(currentPhase)

  useEffect(() => {
    // Create 2-4 clusters
    const numClusters = 3 // 3 clusters for balance
    const initialClusters: Cluster[] = []
    const initialBirds: Bird[] = []
    let birdIdCounter = 1

    for (let i = 0; i < numClusters; i++) {
      const formation = i === 0 ? 'v-left' : i === 1 ? 'v-right' : 'scattered'

      const cluster: Cluster = {
        id: i + 1,
        y: 40 + (i * 10), // Spread clusters vertically - lowered from 15% to 40% start
        speed: 35 + Math.random() * 8, // 35-43 seconds
        delay: i * 12, // Stagger cluster starts
        amplitude: 48 + Math.random() * 15,
        flapCycleDuration: 1.9 + Math.random() * 0.4,
        glideDuration: 3.3 + Math.random() * 0.6,
        formation
      }
      initialClusters.push(cluster)

      // Create 3-9 birds per cluster
      const birdsInCluster = 4 + Math.floor(Math.random() * 5) // 4-8 birds

      for (let j = 0; j < birdsInCluster; j++) {
        let offsetX = 0
        let offsetY = 0

        if (formation === 'v-left') {
          // V-shape pointing left (leader at left, others trail behind in V)
          if (j === 0) {
            // Leader
            offsetX = 0
            offsetY = 0
          } else {
            // Followers form V behind leader
            const side = j % 2 === 0 ? 1 : -1
            const depth = Math.floor((j + 1) / 2)
            offsetX = depth * 40 // Trail behind
            offsetY = side * depth * 25 // Spread vertically
          }
        } else if (formation === 'v-right') {
          // V-shape pointing right (leader at right, others trail behind in V)
          if (j === 0) {
            // Leader is ahead
            offsetX = 0
            offsetY = 0
          } else {
            const side = j % 2 === 0 ? 1 : -1
            const depth = Math.floor((j + 1) / 2)
            offsetX = -depth * 40 // Trail behind (negative because leader is ahead)
            offsetY = side * depth * 25
          }
        } else {
          // Scattered formation
          offsetX = (Math.random() - 0.5) * 80
          offsetY = (Math.random() - 0.5) * 60
        }

        const bird: Bird = {
          id: birdIdCounter++,
          clusterId: cluster.id,
          offsetX,
          offsetY,
          size: 0.9 + Math.random() * 0.3, // 0.9-1.2
          delay: j * 0.2 // Small delay between birds in same cluster
        }
        initialBirds.push(bird)
      }
    }

    setClusters(initialClusters)
    setBirds(initialBirds)
  }, [])

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
        style={{
          opacity: isDaytime ? 1 : 0,
          transition: 'opacity 2s ease-in-out'
        }}
      >
        {clusters.map((cluster) => (
          <div key={cluster.id}>
            {birds
              .filter((bird) => bird.clusterId === cluster.id)
              .map((bird) => (
                <div
                  key={bird.id}
                  className="bird-container absolute opacity-35 dark:opacity-25"
                  style={{
                    top: `${cluster.y}%`,
                    // @ts-ignore - CSS custom properties
                    '--bird-speed': `${cluster.speed}s`,
                    '--bird-delay': `${cluster.delay + bird.delay}s`,
                    '--bird-amplitude': `${cluster.amplitude}px`,
                    '--bird-size': bird.size,
                    '--flap-cycle': `${cluster.flapCycleDuration}s`,
                    '--glide-duration': `${cluster.glideDuration}s`,
                    '--total-cycle': `${cluster.flapCycleDuration + cluster.glideDuration}s`,
                    '--offset-x': `${bird.offsetX}px`,
                    '--offset-y': `${bird.offsetY}px`,
                  }}
                >
                  {/* Simple V-shape bird */}
                  <svg
                    width={20 * bird.size}
                    height={12 * bird.size}
                    viewBox="0 0 20 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="bird-svg"
                  >
                    {/* Simple V shape - two lines */}
                    <path
                      className="bird-wings"
                      d="M 2,4 L 10,8 L 18,4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.85"
                    />
                  </svg>
                </div>
              ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        .bird-container {
          animation: fly var(--bird-speed) cubic-bezier(0.35, 0, 0.65, 1) var(--bird-delay) infinite;
          animation-fill-mode: both;
          will-change: transform, left;
        }

        @keyframes fly {
          0% {
            left: -100px;
            transform: translateY(calc(var(--offset-y) + 0px)) translateX(var(--offset-x)) rotate(0deg) scale(var(--bird-size));
          }
          /* Flapping upward - maintain formation */
          8% {
            transform: translateY(calc(var(--offset-y) + calc(var(--bird-amplitude) * -0.5))) translateX(var(--offset-x)) rotate(-5deg) scale(var(--bird-size));
          }
          16% {
            transform: translateY(calc(var(--offset-y) + calc(var(--bird-amplitude) * -0.9))) translateX(var(--offset-x)) rotate(-7deg) scale(var(--bird-size));
          }
          24% {
            transform: translateY(calc(var(--offset-y) + calc(var(--bird-amplitude) * -1.15))) translateX(var(--offset-x)) rotate(-6deg) scale(var(--bird-size));
          }
          32% {
            transform: translateY(calc(var(--offset-y) + calc(var(--bird-amplitude) * -1.3))) translateX(var(--offset-x)) rotate(-4deg) scale(var(--bird-size));
          }
          /* Swooping glide down - maintain formation */
          45% {
            transform: translateY(calc(var(--offset-y) + calc(var(--bird-amplitude) * -0.8))) translateX(var(--offset-x)) rotate(0deg) scale(var(--bird-size));
          }
          60% {
            transform: translateY(calc(var(--offset-y) + calc(var(--bird-amplitude) * -0.2))) translateX(var(--offset-x)) rotate(4deg) scale(var(--bird-size));
          }
          75% {
            transform: translateY(calc(var(--offset-y) + calc(var(--bird-amplitude) * 0.4))) translateX(var(--offset-x)) rotate(5deg) scale(var(--bird-size));
          }
          90% {
            transform: translateY(calc(var(--offset-y) + calc(var(--bird-amplitude) * 0.2))) translateX(var(--offset-x)) rotate(2deg) scale(var(--bird-size));
          }
          100% {
            left: calc(100% + 100px);
            transform: translateY(calc(var(--offset-y) + 0px)) translateX(var(--offset-x)) rotate(0deg) scale(var(--bird-size));
          }
        }

        /* Wing flapping - synchronized within cluster */
        .bird-wings {
          animation: wing-beat var(--total-cycle) ease-in-out infinite;
          animation-delay: var(--bird-delay);
          transform-origin: 10px 8px;
          transform-box: fill-box;
        }

        @keyframes wing-beat {
          /* Flapping phase - wings compress vertically */
          0% {
            transform: scaleY(1);
          }
          6% {
            transform: scaleY(0.5);
          }
          12% {
            transform: scaleY(1);
          }
          18% {
            transform: scaleY(0.5);
          }
          24% {
            transform: scaleY(1);
          }
          30% {
            transform: scaleY(0.5);
          }
          36% {
            transform: scaleY(1);
          }
          /* Gliding - minimal movement */
          45%, 100% {
            transform: scaleY(0.95);
          }
        }
      `}</style>
    </>
  )
}
