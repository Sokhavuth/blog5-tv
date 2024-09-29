<script>
	import Header from "$lib/components/admin/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"
	let { data, editor, items } = $props()
</script>

<section class="Admin">
	<Header {data} />
	<main class="region">
		<div class="wrapper">
			<aside>
				<div class='inner'>
				<a href="/amin/post"><img src="/images/movie.png" alt='' /></a>
					<span><a href="/admin/post">ការផ្សាយ</a></span>
					<a href="/amin/category"><img src="/images/category.png" alt='' /></a>
					<span><a href="/admin/category">ជំពូក</a></span>
					<a href="/amin/page"><img src="/images/page.png" alt=''/></a>
					<span><a href="/admin/page">ទំព័រ​ស្តាទិក</a></span>
					<a href='/admin/upload'><img src="/images/upload.png" alt='' /></a>
					<span><a href="/admin/upload">Upload</a></span>
					<a href="/amin/user"><img src="/images/users.png" alt='' /></a>
					<span><a href="/admin/user">អ្នក​និពន្ធ</a></span>
					<a href="/amin/setting"><img src="/images/setting.png" alt='' /></a>
					<span><a href="/admin/setting">Setting</a></span>
				</div>
			</aside>
			<div>
				{@render editor()}
			</div>
		</div>
		{#if items && data?.items}
			{@render items(data)}
		{/if}
	</main>
	<Footer />
</section>

<style>
	.Admin main{
		margin-top: 10px;
	}
	.Admin main .wrapper{
		display: grid;
		grid-template-columns: 25% auto;
		grid-gap: 10px;
	}
	.Admin main .wrapper aside, 
	.Admin main .wrapper aside .inner{
		background-color: var(--background);
	}
	.Admin main .wrapper aside .inner{
		display: grid;
		grid-template-columns: 50px auto;
		align-items: center;
		grid-gap: 20px 10px;
		padding: 15px;
	}
	.Admin main .wrapper aside img{
		width: 100%;
		float: left;
	}
	.Admin main .wrapper aside a{
		font: 18px/1.5 Oswald, Bayon;
		color: white;
	}

	@media only screen and (max-width: 600px){
		.Admin{
			padding: 10px;
		}
		.Admin main .wrapper{
			grid-template-columns: 100%;
		}
	}
</style>