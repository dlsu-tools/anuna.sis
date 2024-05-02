import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import type { PublicSchema, Tables } from "$lib/database";

export async function fInsert(
    table: keyof PublicSchema["Tables"],
    queryData: Tables<typeof table>,
    select: (keyof Tables<typeof table>)[],
) {
    // look for data first
    let query = supabaseAdmin.from(table).select(select.join(","));
    for (const key in queryData) {
        // @ts-expect-error queryData is based off table anyways
        query = query.eq(key, queryData[key]);
    }
    const { data, error } = await query;
    if (error) throw error;

    if (data.length === 0) {
        // insert data
        const { data, error } = await supabaseAdmin.from(table).insert(queryData);
        if (error) throw error;
        return data;
    }
}
