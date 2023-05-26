<script lang="ts">
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import type { FolderDataWrapper } from './types/types';
	import ParaGrid from './lib/PARAGrid.svelte';
  import { onMount } from 'svelte';
  
	const folders: Writable<FolderDataWrapper> = writable({
	  projects: { files: [], lastChanged: '' },
	  areas: { files: [], lastChanged: '' },
	  resources: { files: [], lastChanged: '' },
	  archive: { files: [], lastChanged: '' },
	});
  
	// Fetch function to get data from the server.
	async function fetchParaData() {
	  const response = await fetch('http://127.0.0.1:3000/getPARA');
	  const data = await response.json();
	  folders.set(data);
	}
  
	// Fetch data when the component is created.
	onMount(fetchParaData);
	
</script>
  
<style>
	/* Add your own styles here */
</style>
  
<main>
	<ParaGrid folders={$folders}/>
</main>
