import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async ({ depends, locals: { supabase } }) => {
    depends("supabase:db:users");

    const {
        data: { user },
        error: errorItem,
    } = await supabase.auth.getUser();

    if (errorItem || !user) error(401, "Unauthorized");

    const { data } = await supabase.from("users").select("id").eq("email", user.email);

    return {
        hasOnBoarded: data?.length ?? 0 != 0,
        supabase,
    };
}) satisfies PageServerLoad;
