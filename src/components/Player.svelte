<script>
  import { onMount } from "svelte";
  import MusicList from "../components/MusicList.svelte";
  import CoverArt from "./CoverArt.svelte";

  let player;
  let song;
  let music = [];
  let src;
  let time = 50;

  $: {
    song = "http://localhost:3000/music/" + src;
    player = new Audio(song);
    player.onloadedmetadata = () => {
      console.log(player.duration);
   
      // totalTrackTime = song.duration;
      // updateTime();
    };
  }

  // afterUpdate(() => {
  //   player.load();
  //   player.play();
  // });

  onMount(async () => {
    const res = await fetch("http://localhost:3000/music/!");
    music = await res.json();
  });

  function play({ detail: { song } }) {
    src = song;
  }
</script>

<!-- <div>
  <audio bind:this={player} controls class="hidden">
    <source type="audio/mpeg" id="source" src={song} />
  </audio>
</div> -->
<!-- component -->
<div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
  <!-- <div class="relative max-w-xl w-full h-36 bg-white rounded-lg shadow-lg overflow-hidde mb-32">
      <div class="absolute inset-0 rounded-lg overflow-hidden bg-red-200">
        <img src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=200&q=80" alt="">
        <div class="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black">
          
        </div>
      </div>
      <div class="absolute flex space-x-6 transform translate-x-6 translate-y-8">
        <div class="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
          <img src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="">
        </div>
        <div class="text-white pt-12">
          <h3 class="font-bold">Album</h3>
          <div class="text-sm opacity-60">Super Interpret</div>
          <div class="mt-8 text-gray-400">
            <div class="flex items-center space-x-2 text-xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
              <span>Easy listening</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->

  <div class="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
    <CoverArt song={src} />
    <div>
      <div class="relative h-1 bg-gray-200">
        <div
          class="absolute h-full bg-green-500 flex items-center justify-end"
          style="width: {time}%;"
        >
          <div class="rounded-full w-3 h-3 bg-white shadow" />
        </div>
      </div>
    </div>
    <div
      class="flex justify-between text-xs font-semibold text-gray-500 px-4 py-2"
    >
      <div>1:50</div>
      <div class="flex space-x-3 p-2">
        <button class="focus:outline-none">
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><polygon points="19 20 9 12 19 4 19 20" /><line
              x1="5"
              y1="19"
              x2="5"
              y2="5"
            /></svg
          >
        </button>
        <button
          on:click={() => (player.paused ? player.play() : player.pause())}
          class="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-gray-100 focus:outline-none"
        >
          {#if player.paused}
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><polygon points="5 3 19 12 5 21 5 3" /></svg
            >
          {:else}
            <svg
              x="0px"
              y="0px"
              viewBox="0 0 122.88 122.88"
              style="enable-background:new 0 0 122.88 122.88"
              xml:space="preserve"
              ><g
                ><path
                  d="M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18 C29.11,6.88,44.47,0,61.44,0L61.44,0z M42.3,39.47h13.59v43.95l-13.59,0V39.47L42.3,39.47L42.3,39.47z M66.99,39.47h13.59v43.95 l-13.59,0V39.47L66.99,39.47L66.99,39.47z M97.42,25.46c-9.21-9.21-21.93-14.9-35.98-14.9c-14.05,0-26.78,5.7-35.98,14.9 c-9.21,9.21-14.9,21.93-14.9,35.98s5.7,26.78,14.9,35.98c9.21,9.21,21.93,14.9,35.98,14.9c14.05,0,26.78-5.7,35.98-14.9 c9.21-9.21,14.9-21.93,14.9-35.98S106.63,34.66,97.42,25.46L97.42,25.46z"
                /></g
              ></svg
            >
          {/if}
        </button>
        <button class="focus:outline-none">
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><polygon points="5 4 15 12 5 20 5 4" /><line
              x1="19"
              y1="5"
              x2="19"
              y2="19"
            /></svg
          >
        </button>
      </div>
      <div>3:00</div>
    </div>
    <MusicList {music} on:play={play} />
  </div>
</div>
