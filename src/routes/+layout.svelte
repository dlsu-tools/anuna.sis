<script lang="ts">
    import "../style.css";

    // From https://github.com/j4w8n/sveltekit-supabase-ssr
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";

    export let data;

    let { supabase, session } = data;
    $: ({ supabase, session } = data);

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate("supabase:auth");
            }
        });

        return () => subscription.unsubscribe();
    });
    // From https://github.com/j4w8n/sveltekit-supabase-ssr
</script>

<slot></slot>
