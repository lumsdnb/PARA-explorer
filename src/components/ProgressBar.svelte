<script>
	export let value = 0;
</script>

<div class="progress-bar">
	<div class="progress-line" style="width: {value}%" />
</div>

<style>
	.progress-bar {
		height: 16px;
		width: 100%;
		position: relative;
		border: 2px solid #000;
		overflow: hidden;
	}

	.progress-line {
		height: 100%;
		background-color: #42b983;
		width: 0%;
		transition: width 0.5s ease-in-out;
	}
</style>
