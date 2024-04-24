<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    const { hasOnBoarded, supabase } = data;
</script>

onboarded: {hasOnBoarded}
