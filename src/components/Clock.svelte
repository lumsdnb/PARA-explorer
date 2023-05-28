<script>
	/** @type {number} */
	export let time = 0;
	export let scale = 5;

	// Determine the rotation of the hand based on the time
	/** @type {number} */
	let rotation = (time / 60) * 2 * Math.PI; // now in radians for the SVG arc path

	// Calculate end point of the slice
	/** @type {number} */
	let x = 50 + 45 * Math.sin(rotation);
	/** @type {number} */
	let y = 50 - 45 * Math.cos(rotation);

	// Determine if we need the large arc flag (used in SVG arc path command)
	/** @type {number} */
	let largeArc = time > 30 ? 1 : 0;
</script>

<div class="clock-container" style={`width: ${scale}px; height: ${scale}px;`}>
	<svg class="clock-svg" viewBox="0 0 100 100">
		<!-- Draw the clock outline -->
		<circle cx="50" cy="50" r="45" stroke="black" stroke-width="2" fill="transparent" />

		<!-- Draw the clock hands -->
		<line
			x1="50"
			y1="50"
			x2="50"
			y2="5"
			stroke="black"
			stroke-width="2"
			transform="rotate(0 50 50)"
		/>
		<line
			x1="50"
			y1="50"
			x2="50"
			y2="5"
			stroke="red"
			stroke-width="2"
			transform={`rotate(${(time / 60) * 360} 50 50)`}
		/>

		<!-- Draw the filled sector -->
		<path
			d={`M 50 50 L 50 5 A 45 45 0 ${time > 30 ? 1 : 0} 1 ${
				50 + 45 * Math.sin((time / 60) * 2 * Math.PI)
			} ${50 - 45 * Math.cos((time / 60) * 2 * Math.PI)} z`}
			fill="black"
		/>
	</svg>
</div>

<style>
	.clock-container {
		transform-origin: top left;
	}

	.clock-svg {
		width: 100%;
		height: 100%;
	}
</style>
