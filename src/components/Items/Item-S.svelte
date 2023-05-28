<!-- simple text checkbox item
still has some issues, like focus area not being styled and long lines not being truncated -->

<script lang="ts">
	import { afterUpdate } from 'svelte';
	import DraggerIcon from './DraggerIcon.svelte';
	import '../../components/theme.css';

	export let text = '';
	export let isChecked = false;

	let isEditMode = false;
	let editText = text;

	function enterEditMode() {
		isEditMode = true;
		editText = text;
	}

	function exitEditMode() {
		isEditMode = false;
		if (editText.trim() !== '') {
			text = editText;
		}
	}

	afterUpdate(() => {
		if (isEditMode) {
			const input = document.querySelector('.edit-input') as HTMLInputElement;
			input?.focus();
		}
	});
</script>

<div class="item">
	<div class="toggle {isChecked ? 'checked' : ''}" on:click={() => (isChecked = !isChecked)}>
		{isChecked ? '✓' : ''}
	</div>
	<div class="pad10">
		{#if isEditMode}
			<input class="edit-input" type="text" bind:value={editText} on:blur={exitEditMode} />
		{:else}
			<div class="text {isChecked ? 'checked' : ''}" on:click={enterEditMode}>
				{text}
			</div>
		{/if}
	</div>

	<DraggerIcon />
</div>

<style>
	.item {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
	}

	.toggle {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		margin-right: 10px;
		border: 1px solid #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.toggle.checked {
		border-color: #000000;
	}

	.text,
	.edit-input {
		flex: 1;
		color: #333;
		text-decoration: none;
		height: 100%;
	}

	.text.checked {
		color: #999;
		text-decoration: line-through;
	}
	.pad10 {
		padding: 10px;
	}

	.edit-input {
		margin: 0;
		background: none;
		border: none;
	}
</style>
