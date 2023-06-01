<script lang="ts">
  import { writable } from 'svelte/store'
  import type { Writable } from 'svelte/store'
  import {
    type Folder,
    type FolderGroup,
    type File,
    FolderType,
  } from '../backend/src/types/types'
  import ParaGrid from './lib/PARAGrid.svelte'
  import { onMount } from 'svelte'
  import InboxAdder from './lib/InboxAdder.svelte'
  import InboxViewer from './lib/InboxViewer.svelte'

  const folders: Writable<FolderGroup> = writable({
    inbox: createFolder(FolderType.Project),
    projects: createFolder(FolderType.Project),
    areas: createFolder(FolderType.Area),
    resources: createFolder(FolderType.Resource),
    archive: createFolder(FolderType.Archive),
  })
  // helper

  function createFolder(id: FolderType, lastChanged?: string): Folder {
    return { id, files: [] }
  }

  // Fetch function to get data from the server.
  async function fetchParaData() {
    const response = await fetch('http://127.0.0.1:3000/getPARA')
    const data = await response.json()
    folders.set(data)
  }

  // Fetch data when the component is created.
  onMount(fetchParaData)
</script>

<main>
  <h1>welcome to your second brain!</h1>
  <InboxAdder />
  <!-- <ParaGrid folders={$folders} /> -->
</main>

<div class="kindle">
  <InboxViewer inboxFiles={$folders.inbox} />
</div>

<style>
  .kindle {
    width: 600px;
    height: 800px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>
