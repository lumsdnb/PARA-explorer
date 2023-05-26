<script lang="ts">
    import type { FolderDataWrapper } from '../types/types';
  
    export let folders: FolderDataWrapper;
</script>
  
<section>
  <h2>Projects</h2>
  <ul>
    {#each folders.projects.files as file}
      <li>{file}</li>
    {/each}
  </ul>
</section>
  
<section>
  <h2>Areas</h2>
  <ul>
    {#each folders.areas.files as file}
      <li>{file}</li>
    {/each}
  </ul>
</section>
  
<section>
  <h2>Resources</h2>
  <ul>
    {#each folders.resources.files as file}
      <li>{file}</li>
    {/each}
  </ul>
</section>
  
<section>
  <h2>Archive</h2>
  <ul>
    {#each folders.archive.files as file}
      <li>{file}</li>
    {/each}
  </ul>
</section>
