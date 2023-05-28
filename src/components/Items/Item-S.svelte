<script lang="ts">
	import { afterUpdate } from 'svelte';
	import DraggerIcon from './DraggerIcon.svelte';

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

	{#if isEditMode}
		<input class="edit-input" type="text" bind:value={editText} on:blur={exitEditMode} />
	{:else}
		<div class="text {isChecked ? 'checked' : ''}" on:click={enterEditMode}>
			{text}
		</div>
	{/if}

	<DraggerIcon />
</div>

<style>
	.item {
		display: flex;
		align-items: center;
		padding: 10px;
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
		background-color: #949494;
		border-color: #252525;
	}

	.text,
	.edit-input {
		flex: 1;
		color: #333;
		text-decoration: none;
	}

	.text.checked {
		color: #999;
		text-decoration: line-through;
	}

	.edit-input {
		margin: 0;
		background: none;
		border: none;
	}
</style>
