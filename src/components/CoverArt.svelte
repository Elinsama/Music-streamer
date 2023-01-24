<script>
    export let song;
    let src;
    let details;

    $: {
        src = "http://localhost:3000/music/cover/" + song;
        details = fetchDetails();
    }

    async function fetchDetails() {
        const res = await fetch("http://localhost:3000/music/info/" + song);
        const tag = await res.json();

        if (res.ok) {
            return tag;
        } else {
            throw new Error(tag);
        }
    }
</script>

<div class="relative">
    <img
        {src}
        class="object-cove max-w-full h-auto"
        style="min-width: 600px;"
        alt={song}
        on:error={(e) => (e.target.src = "http://localhost:3000/empty.png")}
    />

    <div
        class="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white"
    >
        {#await details then tags}
            {#if tags.artist}
                <h3 class="font-bold">{tags.artist}</h3>
                <span class="opacity-70">{tags.title}</span>
            {:else}
                <h3 class="font-bold">{song}</h3>
            {/if}
        {/await}
    </div>
</div>
