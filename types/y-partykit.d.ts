// Type declarations for y-partykit
// This allows the build to pass even if y-partykit isn't installed yet

declare module "y-partykit/provider" {
  import type { Doc } from "yjs";
  import type { Awareness } from "y-protocols/awareness";

  export interface YPartyKitProviderOptions {
    connect?: boolean;
    awareness?: Awareness;
    params?: Record<string, string>;
    protocol?: "ws" | "wss";
    resyncInterval?: number;
  }

  export class YPartyKitProvider {
    constructor(
      host: string,
      room: string,
      doc: Doc,
      options?: YPartyKitProviderOptions
    );

    awareness: Awareness;
    doc: Doc;
    room: string;
    wsconnected: boolean;
    synced: boolean;

    connect(): void;
    disconnect(): void;
    destroy(): void;

    on(event: "status", callback: (data: { status: string }) => void): void;
    on(event: "synced", callback: (data: { synced: boolean }) => void): void;
    on(event: "sync", callback: (isSynced: boolean) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
  }
}
