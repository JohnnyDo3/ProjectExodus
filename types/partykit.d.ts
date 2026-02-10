// Type declarations for PartyKit server
// This allows the build to pass even if partykit isn't installed yet

declare module "partykit/server" {
  export interface Room {
    id: string;
    storage: RoomStorage;
    getConnections(): IterableIterator<Connection>;
    broadcast(message: string | ArrayBuffer, without?: string[]): void;
  }

  export interface RoomStorage {
    get<T = unknown>(key: string): Promise<T | undefined>;
    put<T>(key: string, value: T): Promise<void>;
    delete(key: string): Promise<boolean>;
    list<T = unknown>(options?: { prefix?: string }): Promise<Map<string, T>>;
  }

  export interface Connection {
    id: string;
    send(message: string | ArrayBuffer): void;
    close(code?: number, reason?: string): void;
    setState(state: any): void;
    state: any;
  }

  export interface ConnectionContext {
    request: Request;
  }

  export interface Request {
    url: string;
    method: string;
    headers: Headers;
    json(): Promise<any>;
    text(): Promise<string>;
  }

  export interface Server {
    room: Room;
    onConnect?(conn: Connection, ctx: ConnectionContext): void | Promise<void>;
    onMessage?(message: string | ArrayBuffer, conn: Connection): void | Promise<void>;
    onClose?(conn: Connection): void | Promise<void>;
    onError?(conn: Connection, error: Error): void | Promise<void>;
    onRequest?(req: Request): Response | Promise<Response>;
  }

  export type { Room, Connection, ConnectionContext, Request, Server };
}

declare module "y-partykit" {
  import type { Doc } from "yjs";
  import type * as Party from "partykit/server";

  export interface YPartyKitOptions {
    persist?: {
      mode: "snapshot" | "update";
    };
    callback?: {
      handler: (yDoc: Doc) => void | Promise<void>;
      debounceWait?: number;
      debounceMaxWait?: number;
    };
  }

  export function onConnect(
    conn: Party.Connection,
    room: Party.Room,
    options?: YPartyKitOptions
  ): void;
}
