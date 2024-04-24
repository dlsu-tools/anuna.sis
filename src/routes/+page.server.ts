import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData();
        const provider = formData.get("provider") as string;

        if (provider == "dlsu") {
            /* OAuth sign-in. */

            /**
             * Sign-in will not happen yet, because we're on the server-side,
             * but we need the returned url.
             */
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${url.origin}/auth/callback?next=/`,
                },
            });

            if (error) throw error;

            /* Now authorize sign-in on browser. */
            if (data.url) redirect(303, data.url);
        } else return fail(400);
    },
} satisfies Actions;
