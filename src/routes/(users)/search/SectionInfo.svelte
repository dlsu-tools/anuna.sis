<script lang="ts">
    import type { PageData } from "./$types";

    export let courseInfo: PageData["courseInfo"];
    export let schedule: PageData["schedule"];

    const timeTable: {
        timeStart: Date;
        timeEnd: Date;
        days: ("M" | "T" | "W" | "H" | "F" | "S")[];
        room: string;
    }[] = [];

    for (const { start_time, end_time, day, room } of schedule) {
        const convertTime = (time: string) => {
            const [hour, minute] = time.split(":").map(Number);
            return new Date(0, 0, 0, hour, minute);
        };
        const compareTime = (a: Date, b: Date) => a.getTime() == b.getTime();

        const timeIndex = timeTable.findIndex(
            (time) =>
                compareTime(time.timeStart, convertTime(start_time!)) &&
                compareTime(time.timeEnd, convertTime(end_time!)) &&
                room == time.room,
        );

        if (timeIndex == -1) {
            timeTable.push({
                timeStart: convertTime(start_time!),
                timeEnd: convertTime(end_time!),
                days: [day as "M" | "T" | "W" | "H" | "F" | "S"],
                room: room ?? "ROOM",
            });
        } else {
            timeTable[timeIndex].days.push(day as "M" | "T" | "W" | "H" | "F" | "S");
        }
    }

    const fillerTimeLength = Array(Math.max(3 - timeTable.length, 0));

    import * as Card from "$lib/components/ui/card";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import ScheduleSlot from "./ScheduleSlot.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
</script>

<!-- Component -->
<Card.Root class="col-span-4 col-start-3 w-[54rem] m-auto">
    <Card.Header class="flex flex-row gap-2">
        <Card.Title><span class="text-lg">{courseInfo.courseCode}</span></Card.Title>
        <Badge>Predominantly in Person</Badge>
        <!-- TODO: add badges -->
    </Card.Header>
    <Card.Content class="grid grid-cols-1 gap-2">
        <div class="flex gap-3">
            <!-- Class Info -->
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
            <div class="flex-grow flex">
                {#each timeTable as slot}
                    <div class="basis-1/3">
                        <ScheduleSlot {...slot}></ScheduleSlot>
                    </div>
                {/each}
                {#each fillerTimeLength as filler}
                    <div class="basis-1/3">
                        <ScheduleSlot {...filler} isFiller={true}></ScheduleSlot>
                    </div>
                {/each}
            </div>
            <!-- user interaction -->
            <div class="basis-1/6">B</div>
        </div>
    </Card.Content>
    <Card.Footer class="grid grid-cols-1 bg-slate-900 rounded-b-xl px-4 pt-4">
        <!-- professor -->
        <div class="flex bg-slate-900 gap-2">
            <div class="col-span-2 flex-grow">
                <p class="text-lg font-bold">{courseInfo.faculty}</p>
                <p class="text-sm">professor</p>
            </div>
            <div class="flex gap-2">
                <!-- enrollment / cap -->
                <div class="flex flex-col text-right">
                    <p class="font-bold text-lg">{courseInfo.enrolled}</p>
                    <p class="text-sm">enrolled</p>
                </div>
                <span>/</span>
                <div class="flex flex-col">
                    <p class="text-lg">{courseInfo.capacity}</p>
                    <p class="text-sm">capacity</p>
                </div>
            </div>
            <div class="col-span-2 text-center basis-[27%]">
                <!-- remarks -->
                <!-- <p class="font-semibold text-lg">{courseInfo.remarks}</p> -->
                <p class="font-semibold text-lg">SWIMMI</p>
                <!-- TODO: process courseInfo to remove -->
                <p class="text-sm">remarks</p>
            </div>
            <div class="basis-2/12">aa</div>
        </div>
    </Card.Footer>
</Card.Root>
