<!-- //an input element for text
//a button that lets you add the item
//a creative way to show how to expand on the thing you are adding, without cluttering the interface but keeping it easy to read
//the button submits the creation of a file by sending post request to api of server 
//the input is cleared when it was added -->

<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { get, writable } from 'svelte/store';

	let newTitle = '';
	let statusMessage = '';
	let recentAdditions = writable([] as string[]);
	let array = get(recentAdditions);
	const addItem = async () => {
		if (newTitle.trim() !== '') {
			console.log(JSON.stringify({ item: newTitle }));
			const response = await fetch(`http://127.0.0.1:3000/addItemToInbox?title=${newTitle}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ item: newTitle })
			});

			if (response.ok) {
				statusMessage = 'Item created successfully!';
				recentAdditions.update((additions) => [...additions, newTitle]);
				newTitle = '';
				setTimeout(() => {
					statusMessage = ''; // Clear the status message after a few seconds
				}, 3000); // Adjust the time delay (in milliseconds) as needed
			} else {
				const responseData = await response.json();
				statusMessage = responseData.error || 'Failed to create item.';
			}
		}
	};
</script>

<div class="container">
	<div class=" searchbox fxr">
		<input
			class="input-field"
			type="text"
			placeholder="add an idea or task..."
			bind:value={newTitle}
		/>
		{#if newTitle}
			<button class="add-button" on:click={addItem}> Add </button>
		{/if}
		{#if statusMessage && statusMessage}
			<p class="message">{statusMessage}</p>
		{/if}
	</div>

	<ul>
		{#if recentAdditions}
			{#each $recentAdditions as recentFile}
				<li>{recentFile}</li>
			{/each}
		{/if}
	</ul>
</div>

<style>
	.searchbox {
		position: relative;
		width: 100%;
		height: 7vh;
	}

	.container {
		width: 100%;
		height: fit-content;
		background-color: #f4f4f4;
		box-sizing: border-box;
	}

	.fxr {
		display: flex;
		flex-direction: row;
	}

	.input-field {
		width: 100%;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
		text-align: center;
	}

	.add-button {
		position: absolute;
		right: 0;
		padding: 8px 16px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 4px;
		font-size: 14px;
		cursor: pointer;
		height: 100%;
	}

	.message {
		position: absolute;
		top: 40px;
		margin-top: 10px;
		font-size: 14px;
		color: #007bff;
	}
</style>
