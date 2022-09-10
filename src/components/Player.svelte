<script>
    export let src;

    let player;
    let song;

    $: {
        if (src) {
            song = "http://localhost:3000/music/" + src;
            player.load();
            player.play();
        }
    }
</script>

<div>
    <audio bind:this={player} controls>
        <source type="audio/mpeg" id="source" src={song} />
    </audio>
</div>
