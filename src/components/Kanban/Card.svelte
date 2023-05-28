<script lang="ts">
  type Card = {
    id: string;
    title: string;
    columnIndex: number;
  };
  export let card: Card;
</script>

<div>{card.title}</div>

<style>
  div {
    background-color: #fff;
    border: 1px solid #eee;
    padding: 1em;
    margin: 1em;
  }
</style>
