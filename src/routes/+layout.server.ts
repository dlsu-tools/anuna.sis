// From https://github.com/j4w8n/sveltekit-supabase-ssr
export const load = async ({ locals: { getSession } }) => {
    const session = await getSession();

    return { session };
};
// From https://github.com/j4w8n/sveltekit-supabase-ssr
