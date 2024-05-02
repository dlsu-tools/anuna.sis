import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";

export const load: PageServerLoad = async ({ depends, locals }) => {
    depends("supabase:db:users");
    const { supabase } = locals;

    const {
        data: { user },
        error: errorItem,
    } = await supabase.auth.getUser();

    if (errorItem || !user) error(401, "Unauthorized");

    // check if on boarded
    const { count } = await supabaseAdmin
        .from("users")
        .select("*", { count: "exact" })
        .eq("id", user.id);
    if ((count ?? 0) > 0) redirect(303, "/users/dashboard");

    // get college list
    const { data: colleges } = await supabaseAdmin.from("colleges").select("*");

    return { colleges };
};

import type { Actions } from "./$types";

export const actions = {
    default: async ({ request, locals: { getSession, supabase } }) => {
        const data = await request.formData();

        // validate form
        if (!data.has("id")) return { status: 400 };
        if (!data.has("college")) return { status: 400 };

        // validate user
        const userId = await getSession();
        if (!userId) return { status: 401 };

        // check if user already exists in database
        const { count } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("dlsuId", data.get("id")!);
        if (count != 0) return { status: 403 };

        // seems good, add user to database
        supabaseAdmin
            .from("users")
            .insert({ dlsuid: data.get("id"), homeCollege: data.get("college"), id: userId });
    },
} satisfies Actions;
