import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ depends, locals }) => {
    depends("supabase:db:users");
    const { supabase } = locals;

    const {
        data: { user },
        error: errorItem,
    } = await supabase.auth.getUser();

    if (errorItem || !user) error(401, "Unauthorized");

    const { data } = await supabase.from("users").select("id").eq("email", user.email);

    // check if onboarded
    if ((data?.length ?? 0) > 0) redirect(303, "/users/dashboard");
    return {};
};

import type { Actions } from "./$types";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
    },
} satisfies Actions;
