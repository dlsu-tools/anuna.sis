// From https://supabase.com/docs/guides/auth/server-side/sveltekit
/**
 * This file is necessary to ensure protection of all routes in the `private`
 * directory. It makes the routes in this directory _dynamic_ routes, which
 * send a server request, and thus trigger `hooks.server.ts`.
 **/
// From https://supabase.com/docs/guides/auth/server-side/sveltekit
