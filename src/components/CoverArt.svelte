<script>
    export let song;
    let src;

    $: {
        if (song) {
            src = "http://localhost:3000/music/cover/" + song;
        }
    }
</script>

{#if song}
<div class="flex flex-wrap justify-center">
    <img {src} class="max-w-sm h-auto shadow-lg" alt={song} />
</div>
{/if}