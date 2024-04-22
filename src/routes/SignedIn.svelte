<script lang="ts">
    import { supabase } from "$lib/supabaseClient";

    function signOut() {
        supabase.auth.signOut();
    }
</script>

<div class="bg-white">
    <button on:click={signOut}>sign out</button>
    <a href="/dashboard">Go to dashboard</a>
</div>
