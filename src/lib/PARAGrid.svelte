<script lang="ts">
    import type { FolderDataWrapper } from '../types/types';  
    export let folders: FolderDataWrapper;
</script>

 <section class="wrapper">    
     <section class="card">
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

</section>

<style>
  * {
    box-sizing: border-box;
  }
  
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    background-color: #2323;
    color: #EEE;
  }

  @media screen and (max-width: 600px) {
    .wrapper {
      grid-template-columns: 1fr;
    }
  }


  section {
    color: #232323;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }


  h2 {
    margin-top: 0;
    color: #EEE;
    font-size: 1.5em;
    padding-bottom: 10px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    list-style: none;
    padding: 0;
    margin: 20px 0 0 0;
  }

  li {
    background: #232323;
    color: #EEE;
    border-radius: 3px;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    overflow: auto;
    min-width: 0;
  }
</style>
