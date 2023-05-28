<script>
	import ProgressBar from './ProgressBar.svelte';
	// import '../components/theme.css';
	import Clock from './Clock.svelte';
</script>

<div class="container fxc">
	<div class="fxr">
		<div class="project-text fxc asc">
			<h4 class="project-title">Project Title</h4>
			<span class="project-description">Short and to the point project description</span>
		</div>
		<div class="fxc asc">
			<div class="project-task fxc">
				<h3 class="project-title">Project Title</h3>
				<span class="task-time">5 mins</span>
			</div>
			<div class="project-task fxr">
				<h4 class="project-title">Project Title</h4>
				<div class="fxc fxcenter">
					<Clock time={15} scale={60} />
					<span class="task-time">15 mins</span>
				</div>
			</div>
		</div>
	</div>
	<div class="progress-bar-wrapper">
		<ProgressBar value={70} />
	</div>
</div>

<style>
	.container:first-child {
		justify-content: flex-end;
	}
	.progress-bar-wrapper {
		display: flex;
		justify-content: flex-end;

		margin-top: auto;
	}
	.fxcenter {
		align-items: center;
		justify-content: center;
	}

	.asc {
		align-self: center;
		justify-self: center;
	}

	* {
		box-sizing: border-box;
	}

	.fxc {
		display: flex;
		flex-direction: column;
	}

	.fxr {
		display: flex;
		flex-direction: row;
	}

	.project-title {
		font-size: 30px;
	}
	.container {
		padding: 0;
		background: rgba(255, 255, 255, 1);
		opacity: 1;
		position: relative;
		top: 0px;
		left: 0px;
		overflow: hidden;
		border: 2px solid black;
	}

	.project-task {
		width: 100%;
		height: 100%;
		border: 1px solid black;
		margin: 0.1rem;
		padding: 3px;
	}
</style>
