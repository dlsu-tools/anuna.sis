// From https://github.com/j4w8n/sveltekit-supabase-ssr
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { getSession } }) => {
    const session = await getSession();

    if (!session) {
        redirect(307, "/");
    }
};
// From https://github.com/j4w8n/sveltekit-supabase-ssr
