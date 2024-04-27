<script lang="ts">
    import SignedIn from "./SignedIn.svelte";

    import PhotoCopyright from "./PhotoCopyright.svelte";
    import SignIn from "./SignIn.svelte";

    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<div class="relative h-screen" id="herobg">
    <div class="flex h-full">
        <h1 class="flex flex-grow flex-col items-center justify-center font-fugazOne">
            <span class="text-4xl text-white">Welcome to an</span>
            <span class="px-10 py-3 text-5xl text-black" id="tagline">
                Easier Enlistment Experience
            </span>
        </h1>
        <div class="flex basis-2/6 flex-col items-center justify-center">
            <div class="flex w-[90%] flex-col place-items-center rounded-md p-10">
                {#if data.hasSession}
                    <!-- TODO: fix detection-->
                    <SignedIn></SignedIn>
                {:else}
                    <SignIn></SignIn>
                {/if}
            </div>
        </div>
    </div>
    <PhotoCopyright></PhotoCopyright>
</div>

<style lang="postcss">
    #herobg {
        background-image: linear-gradient(
                20deg,
                hsl(152 100% 22%) 10%,
                rgba(0, 0, 0, 0.25),
                hsl(152 100% 22%) 90%
            ),
            url("https://upload.wikimedia.org/wikipedia/commons/5/5f/De_La_Salle_University_%28DLSU%29_Campus%3B_Rizal_Memorial_Sports_Complex%3B_Harrison_Plaza_-_Aerial_Shot_%28Taft_Avenue%2C_Malate%2C_Manila%3B_2015-06-25%29.jpg");
        background-size: cover;
        background-position: center 60%;
        /* filter: brightness(75%); */
    }

    #tagline {
        background: linear-gradient(
            110deg,
            transparent 5%,
            hsl(152 100% 22%) 5%,
            hsl(152 100% 22%) 95%,
            transparent 95%
        );
    }
</style>
