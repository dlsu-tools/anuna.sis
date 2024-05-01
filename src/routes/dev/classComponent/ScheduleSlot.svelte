<script lang="ts">
    import Time from "./Time.svelte";

    type Days = "M" | "T" | "W" | "H" | "F" | "S";

    export let timeStart: Date;
    export let timeEnd: Date;
    export let days: Days[] = [];
    export let isFiller: boolean = false;
    const dayArray = ["M", "T", "W", "H", "F", "S"] as Days[]; // for TS
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
    <p class:text-white={!isFiller} class:text-slate-600={isFiller}>to</p>
    <Time {isFiller} time={timeEnd}></Time>
</div>
