import type * as Party from "partykit/server";
import { onConnect, type YPartyKitOptions } from "y-partykit";

// Document collaboration server using Y.js + PartyKit
// Each document gets its own "party" (isolated Durable Object)

export default class DocumentParty implements Party.Server {
  constructor(readonly room: Party.Room) {}

  // Y.js configuration
  readonly options: YPartyKitOptions = {
    // Persist Y.js document state to PartyKit's built-in storage
    persist: {
      mode: "snapshot",
    },
    // Optional: Add awareness for cursor tracking
    callback: {
      handler: async (yDoc) => {
        // This runs whenever the document changes
        // We can use this to sync to the main database periodically
        const roomId = this.room.id;
        const [type, documentId] = roomId.split(":");

        if (type === "document" && documentId) {
          // Store document metadata in room storage for persistence
          await this.room.storage.put("lastUpdated", Date.now());
          await this.room.storage.put("documentId", documentId);
        }
      },
    },
  };

  // Handle WebSocket connections
  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // Extract auth token from URL if provided
    const url = new URL(ctx.request.url);
    const token = url.searchParams.get("token");

    // Optional: Validate token and get user info
    // For now, we allow all connections but you can add auth here
    if (token) {
      try {
        // Store user info on the connection for awareness
        const userInfo = this.parseToken(token);
        if (userInfo) {
          conn.setState({ user: userInfo });
        }
      } catch (e) {
        console.error("Failed to parse token:", e);
      }
    }

    // Use y-partykit's onConnect to handle Y.js sync
    return onConnect(conn, this.room, this.options);
  }

  // Handle HTTP requests (for health checks, manual persistence, etc.)
  async onRequest(req: Party.Request) {
    const url = new URL(req.url);

    // Health check endpoint
    if (url.pathname.endsWith("/health")) {
      return new Response(JSON.stringify({
        status: "ok",
        room: this.room.id,
        connections: [...this.room.getConnections()].length
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Get document state endpoint (for syncing to main DB)
    if (req.method === "GET" && url.pathname.endsWith("/state")) {
      const lastUpdated = await this.room.storage.get("lastUpdated");
      const documentId = await this.room.storage.get("documentId");

      return new Response(JSON.stringify({
        documentId,
        lastUpdated,
        connections: [...this.room.getConnections()].length
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Persist to main database endpoint (called by a cron or webhook)
    if (req.method === "POST" && url.pathname.endsWith("/persist")) {
      const documentId = await this.room.storage.get("documentId");

      // Here you would call your main API to persist
      // For now, just acknowledge
      return new Response(JSON.stringify({
        success: true,
        documentId,
        message: "Persistence triggered"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Not found", { status: 404 });
  }

  // Parse JWT token to get user info (simplified)
  parseToken(token: string): { id: string; name: string; color: string } | null {
    try {
      // Decode JWT payload (middle part)
      const payload = token.split(".")[1];
      if (!payload) return null;

      const decoded = JSON.parse(atob(payload));

      return {
        id: decoded.sub || decoded.id || "anonymous",
        name: decoded.name || "Anonymous",
        color: this.generateColor(decoded.sub || decoded.id || "anonymous"),
      };
    } catch {
      return null;
    }
  }

  // Generate consistent color for user
  generateColor(userId: string): string {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
      "#F7DC6F", "#BB8FCE", "#85C1E2", "#F8B88B", "#82E0AA"
    ];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }
}
