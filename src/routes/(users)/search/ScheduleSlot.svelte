<script lang="ts">
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import Time from "./Time.svelte";

    type Days = "M" | "T" | "W" | "H" | "F" | "S";

    export let timeStart: Date;
    export let timeEnd: Date;
    export let days: Days[] = [];
    export let isFiller: boolean = false;
    export let room: string;
    const dayArray = ["M", "T", "W", "H", "F", "S"] as Days[]; // for TS

    if (!isFiller && room == "ROOM") room = "ONLINE";
</script>

<!-- Days Header -->
<div class="flex justify-center gap-2">
    {#each dayArray as day}
        <span class:text-white={days.includes(day)} class:text-slate-600={!days.includes(day)}>
            {day}
        </span>
    {/each}
</div>
<!-- Time -->
<div class="flex flex-col place-items-center">
    <Time {isFiller} time={timeStart}></Time>
    <div class="flex place-items-center gap-3">
        <Separator class="w-6"></Separator>
        <p class:text-white={!isFiller} class:text-slate-600={isFiller}>to</p>
        <Separator class="w-6"></Separator>
    </div>
    <Time {isFiller} time={timeEnd}></Time>
    <p class="font-geistMono" class:text-white={!isFiller} class:text-slate-600={!isFiller}>
        {room}
    </p>
</div>
