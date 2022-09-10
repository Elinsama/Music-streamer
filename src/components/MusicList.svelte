<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let music;

    function play(song) {
        dispatch("play", {
            song,
        });
    }
</script>

<table class="table-auto">
    <thead>
        <tr>
            <th>Song</th>
        </tr>
    </thead>
    <tbody>
        {#each music as song}
            <tr>
                <td on:click={play(song)} class="underline hover:cursor-pointer">{song}</td>
            </tr>
        {/each}
    </tbody>
</table>
