<script lang="ts">
  import type { Folder, FolderGroup } from '../../backend/src/types/types'
  export let inboxFiles: Folder
  console.log('folder', inboxFiles.files)
</script>

<h2>inbox</h2>
{#each inboxFiles.files as item}
  <li>{item}</li>
{/each}
