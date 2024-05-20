import type { PageServerLoad } from "./$types";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url: { searchParams } }) => {
    // Default data pool
    const size = Number(searchParams.get("size") ?? "10");
    const page = Number(searchParams.get("page") ?? "1");

    const { data, error: supabaseError } = await supabaseAdmin
        .from("courses")
        .select(
            "class_number, enrolled, capacity, remarks, section, faculty (full_name), course_codes (course_code)",
        )
        .order("last_updated", { ascending: false })
        .limit(10)
        .range((page - 1) * size, page * size - 1);

    if (supabaseError) error(500, supabaseError.message);

    const parsed = await Promise.all(
        data.map(async (course) => {
            if (!course.course_codes?.course_code)
                console.warn("Missing course code", course.class_number);
            // TODO: add actual warning API or something

            const { data: scheduleData, error: scheduleError } = await supabaseAdmin
                .from("course_schedules")
                .select("start_time, end_time, room, day")
                .eq("class_number", course.class_number)
                .eq("term", "1233");

            if (scheduleError) error(500, scheduleError.message);

            return {
                classNumber: course.class_number,
                enrolled: course.enrolled,
                capacity: course.capacity,
                remarks: course.remarks ?? "",
                section: course.section,
                faculty: course.faculty?.full_name ?? "Unassigned / Blind",
                courseCode: course.course_codes?.course_code ?? "???????",
                schedule: scheduleData.sort((a, b) => {
                    const days = "MTWHFS";
                    return days.indexOf(a.day) - days.indexOf(b.day);
                }),
            };
        }),
    );

    return { parsed };
};
