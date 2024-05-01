import type { PageServerLoad } from "./$types";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";

export const load: PageServerLoad = async () => {
    // Get course data

    // gross amounts of non-null assertions because dev mode
    const { data: courses } = await supabaseAdmin
        .from("courses")
        .select(
            `classNumber, 
            term,
            enrolled,
            capacity,
            remarks,
            section,
            faculty (fullName),
            courseCodes (courseCode)`,
        )
        .limit(1);
    const course = courses![0];

    const { data: schedule } = await supabaseAdmin
        .from("courseSchedules")
        .select("*")
        .eq("classNumber", course.classNumber!)
        .eq("term", course.term!);

    const courseInfo = {
        classNumber: course.classNumber!,
        term: course.term!,
        enrolled: course.enrolled!,
        capacity: course.capacity!,
        remarks: course.remarks!,
        section: course.section!,
        faculty: course.faculty!.fullName!,
        courseCode: course.courseCodes!.courseCode,
    };
    return {
        courseInfo,
        schedule: schedule!,
    };
};
