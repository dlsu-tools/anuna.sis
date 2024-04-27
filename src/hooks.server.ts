// From https://github.com/j4w8n/sveltekit-supabase-ssr
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createServerClient } from "@supabase/ssr";
import type { Handle } from "@sveltejs/kit";
import { SUPABASE_JWT } from "$env/static/private";
import jwt from "jsonwebtoken";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            get: (key) => event.cookies.get(key),
            set: (key, value, options) => {
                event.cookies.set(key, value, { ...options, path: "/" });
            },
            remove: (key, options) => {
                event.cookies.delete(key, { ...options, path: "/" });
            },
        },
    });

    /**
     * We do not call `getUser()` here,
     * since we're validating the JWT.
     *
     * !!! SECURITY WARNING !!!
     * Cookies aren't validated properly, use getUser instead.
     * For now, only validated user ID will be returned
     */
    event.locals.getSession = async () => {
        const {
            data: { session },
            // BUG: Console warning, to be fixed by Supabase:
            // https://github.com/supabase/auth-js/issues/888
        } = await event.locals.supabase.auth.getSession();

        if (!session) return null;

        /* Ensures the session is valid. See README Security section for details. */
        try {
            // BUG: Session is to be considered completely untrustworthy
            // to be fixed in future patch by Supabase
            const jwtResult = jwt.verify(session.access_token, SUPABASE_JWT);
            return (jwtResult.sub as string) ?? null; // See security warning
        } catch (err) {
            return null;
        }

        // return session;
    };

    event.locals.getUser = async () => {
        const { data, error } = await event.locals.supabase.auth.getUser();

        if (!data || error) return null;
        return data.user;
    };

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === "content-range";
        },
    });
};
// From https://github.com/j4w8n/sveltekit-supabase-ssr
