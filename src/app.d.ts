import { SupabaseClient, Session, User } from "@supabase/supabase-js";
import type { Database } from "$lib/database";

declare global {
    namespace App {
        interface Locals {
            // From https://github.com/j4w8n/sveltekit-supabase-ssr
            supabase: SupabaseClient<Database>;
            // getSession(): Promise<Session | null>;
            getSession(): Promise<string | null>; // BUG: Security issue, see hooks.sever.ts
            getUser(): Promise<User | null>;
            // From https://github.com/j4w8n/sveltekit-supabase-ssr
        }
        interface PageData {}
        // interface Error {}
        // interface Platform {}
    }
}

export {};
