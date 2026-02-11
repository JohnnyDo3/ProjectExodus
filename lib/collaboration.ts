/**
 * Collaboration Configuration
 *
 * This file configures the real-time collaboration infrastructure using Y.js and PartyKit.
 *
 * PartyKit runs on Cloudflare's edge network (Durable Objects) for:
 * - Global low-latency connections
 * - Automatic scaling (each document = isolated "party")
 * - Built-in persistence
 *
 * DEPLOYMENT:
 * 1. Run `npm run party:deploy` to deploy to PartyKit
 * 2. Set NEXT_PUBLIC_PARTYKIT_HOST in .env to your deployed URL
 *
 * DEVELOPMENT:
 * Run `npm run party:dev` to start local PartyKit server
 */

// PartyKit project name (must match partykit.json)
const PARTYKIT_PROJECT = "exodus-collab";

export const collaborationConfig = {
  // PartyKit host URL
  // Development: 127.0.0.1:1999
  // Production: exodus-collab.your-username.partykit.dev
  host:
    process.env.NEXT_PUBLIC_PARTYKIT_HOST ||
    (process.env.NODE_ENV === "development" ? "127.0.0.1:1999" : null),

  // Project name for PartyKit
  project: PARTYKIT_PROJECT,

  // Protocol (ws for dev, wss for production)
  get protocol() {
    if (typeof window === "undefined") return "wss";
    return window.location.protocol === "https:" ? "wss" : "ws";
  },

  // Full WebSocket URL builder
  getConnectionUrl(roomId: string, token?: string) {
    const host = this.host;
    if (!host) {
      console.warn("PartyKit host not configured");
      return null;
    }

    const protocol = this.protocol;
    let url = `${protocol}://${host}/party/${roomId}`;

    if (token) {
      url += `?token=${encodeURIComponent(token)}`;
    }

    return url;
  },

  // Check if collaboration is available
  get isAvailable() {
    return !!this.host;
  },

  // Reconnection settings
  maxAttempts: 10,
  delay: 1000,
  factor: 2,
  maxDelay: 30000,

  // Awareness settings (for cursor tracking)
  awarenessSettings: {
    timeout: 30000,
  },
};

/**
 * Get room name for collaboration
 * Format: document:{documentId} or mindmap:{mindmapId}
 */
export function getDocumentName(
  type: "document" | "mindmap",
  id: string
): string {
  return `${type}:${id}`;
}

/**
 * Get user info for awareness (cursor display)
 */
export function getUserAwarenessInfo(user: {
  id: string;
  name: string | null;
  image?: string | null;
}) {
  return {
    user: {
      id: user.id,
      name: user.name || "Anonymous",
      image: user.image,
      color: generateUserColor(user.id),
    },
  };
}

/**
 * Generate a consistent color for each user based on their ID
 */
function generateUserColor(userId: string): string {
  const colors = [
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#45B7D1", // Blue
    "#FFA07A", // Orange
    "#98D8C8", // Mint
    "#F7DC6F", // Yellow
    "#BB8FCE", // Purple
    "#85C1E2", // Sky Blue
    "#F8B88B", // Peach
    "#82E0AA", // Green
  ];

  // Generate a consistent index from user ID
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;

  return colors[index];
}

/**
 * Create a PartyKit-compatible Y.js provider
 * This is used by the CollaborativeEditor component
 */
export async function createPartyKitProvider(
  roomId: string,
  ydoc: any,
  options?: {
    token?: string;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onSynced?: () => void;
  }
) {
  // Dynamically import y-partykit to avoid SSR issues
  let YPartyKitProvider: any;
  try {
    const partykit = await import("y-partykit/provider");
    // YPartyKitProvider is the default export
    YPartyKitProvider = partykit.default;
  } catch (e) {
    throw new Error("y-partykit not installed. Run: npm install y-partykit");
  }

  const host = collaborationConfig.host;
  if (!host) {
    throw new Error("PartyKit host not configured");
  }

  const provider = new YPartyKitProvider(host, roomId, ydoc, {
    connect: true,
    params: options?.token ? { token: options.token } : undefined,
  });

  // Set up event handlers
  if (options?.onConnect) {
    provider.on("status", ({ status }: { status: string }) => {
      if (status === "connected") options.onConnect?.();
    });
  }

  if (options?.onDisconnect) {
    provider.on("status", ({ status }: { status: string }) => {
      if (status === "disconnected") options.onDisconnect?.();
    });
  }

  if (options?.onSynced) {
    provider.on("synced", () => options.onSynced?.());
  }

  return provider;
}
