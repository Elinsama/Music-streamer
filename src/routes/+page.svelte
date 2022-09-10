<script>
    import { onMount } from "svelte";
    import Player from "../components/Player.svelte";
    import MusicList from "../components/MusicList.svelte";
    import CoverArt from "../components/CoverArt.svelte";

    let music = [];
    let src;

    onMount(async () => {
        const res = await fetch("http://localhost:3000/music/!");
        music = await res.json();
    });

    function play({ detail: { song } }) {
        src = song;
    }
</script>

<CoverArt song={src} />
<Player {src} />
<MusicList {music} on:play={play} />
