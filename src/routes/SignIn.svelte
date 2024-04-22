<script lang="ts">
    import { supabase } from "$lib/supabaseClient";

    function signIn() {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: { queryParams: { access_type: "offline" } },
        });
    }
</script>

<!-- TODO: design -->
<button class="bg-white" on:click={signIn}>Sign in!</button>
