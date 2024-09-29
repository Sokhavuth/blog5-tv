<script>
	import Layout from "$lib/components/admin/Layout.svelte"
	let { data } = $props()
</script>

<Layout {data} >
	{#snippet editor()}
	<div class="editor">
		{#each data.posts as post}
		<div class="item">
			<a class="thumb" href={`/post/${post.id}`}>
				<img src={post.thumb} alt=""/>
				{#if post.videos?.length}
				<img class="play-icon" src="/images/play.png" alt=""/>
				{/if}
			</a>
			<div class="title">
				<a href={`/post/${post.id}`}>{post.title}</a>
				<div class="date">{(new Date(post.date)).toLocaleDateString("it-IT")}</div>
			</div>
		</div>
		{/each }
	</div>
	{/snippet}
</Layout>

<style>
	.editor{
		display: grid;
		grid-template-columns: calc(50% - 5px) calc(50% - 5px);
		grid-gap: 10px;
	}
	.editor .item{
		background: var(--background);
		display: grid;
		grid-template-columns: 100px auto;
		align-items: center;
		grid-gap: 10px;
		padding-right: 10px;
	}
	.editor .item .thumb{
		display: block;
		position: relative;
		padding-top: 56.25%;
		overflow: hidden;
	}
	.editor .item a img{
		width: 100%;
		min-height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.editor .item a .play-icon{
		position: absolute;
		min-height: auto;
		width: 25%;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.editor .item .title{
		white-space: nowrap;
        overflow: hidden;
    	text-overflow: ellipsis;
		color: lightgrey;
	}
	.editor .item .title a{
		color: white;
	}

	@media only screen and (max-width: 600px){
		.editor{
			grid-template-columns: 100%;
		}
	}
</style>