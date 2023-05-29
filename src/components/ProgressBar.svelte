<script>
	export let value = 0;
	import '../components/theme.css';
</script>

<progress max="100" {value} />

<style>
	progress {
		height: 16px;
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	progress[value] {
		background-color: #fff;
	}

	/* Reset default styles */
	progress {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		border: none;
		border: 1px solid #000;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 15px;
		background-color: #fff;
	}

	/* Styling for the progress bar */
	progress::-webkit-progress-bar {
		background-color: white;
	}

	progress::-webkit-progress-value {
		background-color: var(--accent-color);
	}

	progress::-moz-progress-bar {
		background-color: var(--accent-color);
	}

	/* Customize the progress indicator */
	progress::-webkit-progress-value {
		background-image: linear-gradient(45deg, #f00 50%, transparent 50%);
		background-size: 8px 8px;
	}

	/* Optional animation for the progress indicator */
	progress::-webkit-progress-value {
		transition: width 0.5s ease;
	}

	progress::-moz-progress-bar {
		transition: width 0.5s ease;
	}
</style>
