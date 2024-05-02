<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    const { colleges } = data;
</script>

<form action="" method="post">
    <!-- TODO: design -->
    <label for="id"> id number </label>
    <input type="text" name="id" id="id" />
    <label for="colleges"> home college </label>
    <select name="colleges" id="colleges">
        {#each colleges ?? [] as { acronym, id, name }}
            <option value={id}>{name} ({acronym})</option>
        {/each}
    </select>
    <button>submit</button>
</form>
