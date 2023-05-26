<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import type { FolderDataWrapper } from './types/types';
  import ParaGrid from './lib/PARAGrid.svelte';
  import { onMount } from 'svelte';
  import InboxAdder from './lib/InboxAdder.svelte';
  import InboxViewer from './lib/InboxViewer.svelte';

  const folders: Writable<FolderDataWrapper> = writable({
    inbox: { files: [] },
    projects: { files: [] },
    areas: { files: [] },
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

<main>
  <h1>welcome to your second brain!</h1>
  <InboxAdder />
  <InboxViewer folder={$folders.inbox} />
  <ParaGrid folders={$folders} />
</main>
