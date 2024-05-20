<script lang="ts">
    import SectionInfo from "./SectionInfo.svelte";

    import type { PageData } from "./$types";
    export let data: PageData;

    const { parsed: sectionData } = data;
</script>

<!-- Parent div -->
<div class="flex flex-col gap-3">
    {#each sectionData as section}
        <SectionInfo {...section}></SectionInfo>
    {/each}
</div>
