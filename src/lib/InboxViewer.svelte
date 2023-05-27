<script lang="ts">
  import type { FolderDataStructure, FolderDataWrapper } from '../types/types';
  export let inboxFiles: FolderDataStructure;
  console.log('folder', inboxFiles);
</script>

<h2>inbox</h2>
{#each inboxFiles.files as item}
  <li>{item}</li>
{/each}
