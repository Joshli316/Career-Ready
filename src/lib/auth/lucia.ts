import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { getDb } from "@/lib/db";
import { sessions, users } from "@/lib/db/schema";

export function initializeLucia(d1: D1Database) {
  const db = getDb(d1);
  const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

  return new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    },
    getUserAttributes: (attributes: DatabaseUserAttributes) => {
      return {
        email: attributes.email,
      };
    },
  });
}

interface DatabaseUserAttributes {
  email: string;
}

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
