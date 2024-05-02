import { JSDOM } from "jsdom";

export default function (html: string) {
    const dom = JSDOM.fragment(html);

    let newCourse = true;
    for (const [tbodyIndex, tr] of dom.querySelectorAll("tr").entries()) {
        if (tbodyIndex === 0) continue;

        if (newCourse) {
            let classNumber: string,
                courseCode: string,
                section: string,
                days: string,
                timeStart: string,
                timeEnd: string,
                room: string,
                capacity: string,
                enrolled: string,
                remarks: string;
            for (const [trIndex, td] of tr.querySelectorAll("td").entries()) {
                switch (trIndex) {
                    case 0:
                        classNumber = td.textContent!.trim();
                        break;
                    case 1:
                        courseCode = td.textContent!.trim();
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

            // Translate time, if applicable
            const translateTime = (time: string) => {
                const [hr, min] = time.split(":").map(Number);
                const date = new Date();
                date.setHours(hr, min);

                return date;
            };

            newCourse = false;
            continue;
        }
    }
}
