import type { PageServerLoad } from "./$types";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";

export const load: PageServerLoad = async () => {
    // Get course data

    // gross amounts of non-null assertions because dev mode
    const { data: courses } = await supabaseAdmin
        .from("courses")
        .select(
            `class_number, 
            term,
            enrolled,
            capacity,
            remarks,
            section,
            faculty (full_name),
            course_codes (course_code)`,
        )
        .limit(1);

    const {
        capacity,
        class_number: classNumber,
        course_codes: courseCodes,
        enrolled,
        faculty,
        remarks,
        section,
        term,
    } = courses![0];

    const { data: schedule } = await supabaseAdmin
        .from("course_schedules")
        .select("*")
        .eq("class_number", classNumber!)
        .eq("term", term!);

    const courseInfo = {
        classNumber: classNumber!,
        term: term!,
        enrolled: enrolled!,
        capacity: capacity!,
        remarks: remarks!,
        section: section!,
        faculty: faculty!.full_name,
        courseCode: courseCodes!.course_code,
    };

    return {
        courseInfo,
        schedule: schedule!,
    };
};
