<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Items/Card.svelte';

	type Card = {
		id: string;
		title: string;
		columnIndex: number;
	};

	interface Column {
		title: string;
		cards: Card[];
	}

	export let columns: Column[] = [
		{ title: 'Column 1', cards: [] },
		{ title: 'Column 2', cards: [] },
		{ title: 'Column 3', cards: [] },
		{ title: 'Column 4', cards: [] }
	];

	onMount(() => {
		makeCardsDraggable();
	});

	function makeCardsDraggable() {
		const cards = Array.from(document.getElementsByClassName('card')) as HTMLElement[];
		cards.forEach((card) => {
			card.draggable = true;
			card.addEventListener('dragstart', handleDragStart);
			card.addEventListener('dragover', handleDragOver);
			card.addEventListener('drop', handleDrop);
		});
	}

	function handleDragStart(event: DragEvent) {
		const target = event.target as HTMLElement;
		const cardId = target.dataset.cardId;
		event.dataTransfer!.setData('text/plain', cardId!);
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(event: DragEvent) {
		const target = event.target as HTMLElement;
		const cardId = event.dataTransfer!.getData('text/plain');
		const fromCardColumnIndex = parseInt(target.dataset.columnIndex!);
		const toCardColumnIndex = parseInt(target.parentElement!.dataset.columnIndex!);
		const fromCardIndex = columns[fromCardColumnIndex].cards.findIndex(
			(card) => card.id === cardId
		);
		const toCardIndex = Array.from(target.parentElement!.querySelectorAll('.card')).indexOf(target);

		if (fromCardIndex > -1) {
			const card = columns[fromCardColumnIndex].cards.splice(fromCardIndex, 1)[0];
			card.columnIndex = toCardColumnIndex;
			columns[toCardColumnIndex].cards.splice(toCardIndex, 0, card);
		}
	}
</script>

<div class="kanban-board">
	{#each columns as column, columnIndex}
		<div class="column" data-column-index={columnIndex}>
			<h2>{column.title}</h2>
			{#each column.cards as card}
				<div class="card" draggable="true" data-card-id={card.id} data-column-index={columnIndex}>
					<Card {card} />
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.kanban-board {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1em;
		background-color: #aaa;
		height: 40vh;
	}

	.column {
		background-color: #f2f2f2;
		padding: 1em;
		border-radius: 4px;
	}
</style>
