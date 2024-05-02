import type { RequestHandler } from "./$types";
import { JSDOM } from "jsdom";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import type { Tables } from "$lib/database";

export const POST: RequestHandler = async ({ request }) => {
    const dom = JSDOM.fragment(await request.text());

    let newCourse = true;
    // Translate time, if applicable
    const translateTime = (time: string) => {
        const [hr, min] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(hr, min);

        return date;
    };

    const courseInfo: Partial<Tables<"courses">> = {};
    for (const [tbodyIndex, tr] of dom.querySelectorAll("tr").entries()) {
        if (tbodyIndex === 0) continue;

        if (newCourse) {
            for (const [trIndex, td] of tr.querySelectorAll("td").entries()) {
                switch (trIndex) {
                    case 0:
                        courseInfo.classNumber = Number(td.textContent!.trim());
                        break;
                    case 1:
                        courseInfo.courseCode = td.textContent!.trim();
                        break;
                    case 2:
                        section = td.textContent!.trim();
                        break;
                    case 3:
                        days = td.textContent!.trim();
                        break;
                    case 4:
                        [timeStart, timeEnd] = td.textContent!.trim().split(" - ");
                        break;
                    case 5:
                        room = td.textContent!.trim();
                        break;
                    case 6:
                        capacity = td.textContent!.trim();
                        break;
                    case 7:
                        enrolled = td.textContent!.trim();
                        break;
                    case 8:
                        remarks = td.textContent!.trim();
                        break;
                }
            }

            // find course code
            const { data: courseCodes } = await supabaseAdmin
                .from("courseCodes")
                .select("id")
                .eq("courseCode", courseCode!)
                .limit(1);
            let courseCodeId: number | undefined = courseCodes?.[0].id;
            if (courseCodes?.length ?? 0 === 0) {
                // add course code to database
                await supabaseAdmin.from("courseCodes").insert({ courseCode: courseCode! });

                const { data: newCourseCode } = await supabaseAdmin
                    .from("courseCodes")
                    .select("id")
                    .eq("courseCode", courseCode!);
                courseCodeId = newCourseCode![0].id;
            }

            // add course to database
            supabaseAdmin.from("courses").upsert({
                classNumber: Number(classNumber!),
                courseCode: courseCodeId!,
                section: section!,
                capacity: Number(capacity!),
                enrolled: Number(enrolled!),
                remarks: remarks!,
                term: 1233,
            });

            newCourse = false;
        }
    }

    return new Response();
};
