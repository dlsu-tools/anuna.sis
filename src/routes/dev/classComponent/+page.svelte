<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    const { courseInfo, schedule } = data;

    const timeTable: {
        timeStart: Date;
        timeEnd: Date;
        days: ("M" | "T" | "W" | "H" | "F" | "S")[];
    }[] = [];

    for (const { startTime, endTime, day } of schedule) {
        const convertTime = (time: string) => {
            const [hour, minute] = time.split(":").map(Number);
            return new Date(0, 0, 0, hour, minute);
        };
        const compareTime = (a: Date, b: Date) => a.getTime() == b.getTime();

        const timeIndex = timeTable.findIndex(
            (time) =>
                compareTime(time.timeStart, convertTime(startTime!)) &&
                compareTime(time.timeEnd, convertTime(endTime!)),
        );

        if (timeIndex == -1) {
            timeTable.push({
                timeStart: convertTime(startTime!),
                timeEnd: convertTime(endTime!),
                days: [day as "M" | "T" | "W" | "H" | "F" | "S"],
            });
        } else {
            timeTable[timeIndex].days.push(day as "M" | "T" | "W" | "H" | "F" | "S");
        }
    }

    const fillerTimeLength = Array(Math.max(3 - timeTable.length, 0));

    import * as Card from "$lib/components/ui/card";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import ScheduleSlot from "./ScheduleSlot.svelte";
</script>

<!-- Parent div -->
<div class="w-screen grid grid-cols-8">
    <!-- Component -->
    <Card.Root class="col-span-4 col-start-3">
        <Card.Header>
            <Card.Title><span class="text-lg">{courseInfo.courseCode}</span></Card.Title>
            <!-- TODO: add badges -->
        </Card.Header>
        <Card.Content class="flex gap-3">
            <!-- Class Time -->
            <div class="flex flex-col place-items-center gap-2">
                <div class="flex flex-col place-items-center">
                    <p class="text-4xl font-geistMono font-bold">{courseInfo.section}</p>
                    <p class="text-sm">section</p>
                </div>
                <Separator class="w-10"></Separator>
                <div class="flex flex-col place-items-center">
                    <p class="text-xl">{courseInfo.classNumber}</p>
                    <p class="text-sm">class number</p>
                </div>
            </div>
            <!-- Time schedule -->
            <Separator orientation="vertical" class="h-20 place-self-center"></Separator>
            <div class="basis-[62.5%] flex">
                {#each timeTable as { days, timeStart, timeEnd }}
                    <div class="basis-1/3">
                        <ScheduleSlot {days} {timeStart} {timeEnd}></ScheduleSlot>
                    </div>
                {/each}
                {#each fillerTimeLength as filler}
                    <div class="basis-1/3">
                        <ScheduleSlot {...filler} isFiller={true}></ScheduleSlot>
                    </div>
                {/each}
            </div>
            <!-- Room schedule -->
            <div class="font-mono">M: GK302A</div>
            <div class="row-span-2">buttons</div>
        </Card.Content>
    </Card.Root>
</div>
