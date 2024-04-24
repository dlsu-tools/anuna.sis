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
<form method="POST">
    <button class="bg-white" name="provider" value="dlsu">Sign in!</button>
</form>
