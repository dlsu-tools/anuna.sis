<script lang="ts">
    import SectionInfo from "./SectionInfo.svelte";

    import type { PageData } from "./$types";
    export let data: PageData;

    const newData = [{ courseInfo: data.courseInfo, schedule: data.schedule }];
</script>

<!-- Parent div -->
<!-- <div class="w-screen grid grid-cols-8"> -->
{#each newData as section}
    <SectionInfo {...section}></SectionInfo>
{/each}
<!-- </div> -->
