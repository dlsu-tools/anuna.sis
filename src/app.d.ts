// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { SupabaseClient, Session, User } from "@supabase/supabase-js";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            // From https://supabase.com/docs/guides/auth/server-side/sveltekit
            supabase: SupabaseClient;
            safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
            session: Session | null;
            user: User | null;
            // From https://supabase.com/docs/guides/auth/server-side/sveltekit
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
