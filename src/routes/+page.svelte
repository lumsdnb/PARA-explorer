<script lang="ts">
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import type { Workspace } from '../lib/types/types';
	import { onMount } from 'svelte';

	const folders: Writable<Workspace> = writable({
		inbox: { files: [] },
		projects: { files: [] },
		areas: { files: [] },
		resources: { files: [], lastChanged: '' },
		archive: { files: [], lastChanged: '' }
	});
	let systemMessage: string;

	// Fetch function to get data from the server.
	async function fetchParaData() {
		try {
			const response = await fetch('http://127.0.0.1:3000/getPARA');
			// Handle the fetched data here
			const data = await response.json();
			folders.set(data);
			// Display success message
			systemMessage = 'Data fetched successfully!';
		} catch (error) {
			// Display error message
			systemMessage = `Error fetching data: ${error}`;
		}
	}

	// Fetch data when the component is created.
	//or load from existing store, if it exists (mobile/desktop/web dependant)
	onMount(async () => {
		await fetchParaData();
	});
</script>

<main>
	<h1>springboard</h1>
	<section>
		<h2>jump in</h2>
		<ul>
			<li>some bullet point</li>
		</ul>
	</section>
	<section>
		<h2>jump in</h2>
		<ul>
			<li>some bullet point</li>
		</ul>
	</section>
</main>

<!-- <div class="kindle">
	<InboxViewer inboxFiles={$folders.inbox} />
</div> -->

<!-- <style>
	.kindle {
		width: 600px;
		height: 800px;
		overflow-x: hidden;
		overflow-y: hidden;
	}
</style> -->
