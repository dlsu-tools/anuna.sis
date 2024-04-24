import { SupabaseClient, Session } from "@supabase/supabase-js";
import { Database } from "./DatabaseDefinitions";

declare global {
    namespace App {
        interface Locals {
            // From https://github.com/j4w8n/sveltekit-supabase-ssr
            supabase: SupabaseClient<Database>;
            getSession(): Promise<Session | null>;
            // From https://github.com/j4w8n/sveltekit-supabase-ssr
        }
        interface PageData {
            // From https://github.com/j4w8n/sveltekit-supabase-ssr
            session: Session | null;
            supabase: SupabaseClient;
            // From https://github.com/j4w8n/sveltekit-supabase-ssr
        }
        // interface Error {}
        // interface Platform {}
    }
}

export {};
