import type { RequestHandler } from "./$types";
import { JSDOM } from "jsdom";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import type { Tables } from "$lib/database";
import { error } from "@sveltejs/kit";
import { SCRAPER_URL } from "$env/static/private";

export const POST: RequestHandler = async ({ request, fetch }) => {
    const reqJson = await request.json();
    const url = new URL(SCRAPER_URL);
    const params = new URLSearchParams();
    params.append("code", reqJson.courseCode);
    params.append("apiKey", "test");
    params.append("id", reqJson.idNumber); // TODO: remove
    url.search = params.toString();

    const response = await fetch(url.toString()).catch((e: Error) => {
        error(500, e);
    });

    const dom = JSDOM.fragment(await response.text());

    // TODO: add auth checking

    let newCourse = true;
    // Translate time, if applicable
    const translateTime = (time: string) => {
        const [hr, min] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(hr, min);

        return date;
    };

    const getCourseId = async (courseCode: string) => {
        const { data: courseCodes } = await supabaseAdmin
            .from("course_codes")
            .select("id")
            .eq("courseCode", courseCode)
            .limit(1);

        if (courseCodes?.length == 1) return courseCodes[0].id;
        else {
            const { data: newRecord } = await supabaseAdmin
                .from("course_codes")
                .insert({ course_code: courseCode })
                .select("id");

            return newRecord![0].id;
        }
    };

    let days,
        timeStart,
        timeEnd,
        room,
        courseInfo: Partial<Tables<"courses">> = {},
        scheduleInfo: Partial<Tables<"course_schedules">>[] = [];

    // tbodyIndex is the index of the tr in the tbody
    for (const [tbodyIndex, tr] of dom.querySelectorAll("tr").entries()) {
        if (tbodyIndex === 0) continue; // skip header row
        // check if previous courseCode is the same as the current courseCode
        if (
            // Not a prof row
            !tr.hasAttribute("1") &&
            // check if there is a class number
            tr.querySelector("td")?.textContent?.trim() &&
            tbodyIndex > 2 // go through first 2 rows though.
        ) {
            // insert data
            await supabaseAdmin.from("courses").insert(courseInfo as Tables<"courses">);
            for (const schedule of scheduleInfo) {
                await supabaseAdmin.from("course_schedules").insert({
                    ...(schedule as Tables<"course_schedules">),
                    class_number: courseInfo.class_number!,
                    term: courseInfo.term!,
                });
            }

            courseInfo = {};
            scheduleInfo = [];
        }

        if (newCourse) {
            for (const [trIndex, td] of tr.querySelectorAll("td").entries()) {
                switch (trIndex) {
                    case 0:
                        courseInfo.class_number = Number(td.textContent!.trim());
                        break;
                    case 1: {
                        const courseCode = td.textContent!.trim(); // for checking if courseCode is the same at the start
                        courseInfo.course_code_id = await getCourseId(courseCode);
                        break;
                    }
                    case 2:
                        courseInfo.section = td.textContent!.trim();
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
                        courseInfo.capacity = Number(td.textContent!.trim());
                        break;
                    case 7:
                        courseInfo.enrolled = Number(td.textContent!.trim());
                        break;
                    case 8:
                        courseInfo.remarks = td.textContent!.trim();
                        break;
                }
            }

            newCourse = false;
        }
        if (!courseInfo.faculty_id && tr.hasAttribute("1")) {
            // (try to) get td inside tr
            const facultyName = tr.querySelector("td")?.textContent?.trim();

            // check if faculty exists or is already inserted
            if (!facultyName) continue;

            const { data: faculty } = await supabaseAdmin
                .from("faculty")
                .select("id")
                .eq("full_name", facultyName);

            let id;
            if (faculty?.length === 0) {
                const { data, error: queryError } = await supabaseAdmin
                    .from("faculty")
                    .insert({ full_name: facultyName })
                    .select("id");

                if (queryError)
                    error(
                        500,
                        `Error inserting faculty (${queryError.code}): ${queryError.message}`,
                    );

                id = data![0].id;
            } else id = faculty![0].id;

            courseInfo.faculty_id = id;
        }
    }

    return new Response();
};
