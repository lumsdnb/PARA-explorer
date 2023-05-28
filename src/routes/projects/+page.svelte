<script>
	import ProjectCardMedium from '../../components/ProjectCardMedium.svelte';
</script>

<h1>projects</h1>
Your current projects with their associated tasks. This should only contain the active projects to reduce
clutter.

<div class="task-list">
	<ProjectCardMedium />
	<div class="spacer" />
	<ProjectCardMedium />
	<div class="spacer" />
	<ProjectCardMedium />
	<div class="spacer" />
	<ProjectCardMedium />
	<div class="spacer" />
</div>

<style>
	.spacer {
		height: 5px;
	}
</style>
