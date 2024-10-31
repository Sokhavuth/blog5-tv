<script>    
    import Layout from "$lib/components/Layout.svelte"
    import Ad from "$lib/components/Ad.svelte"
    let { data } = $props()
    let page = data.page
</script>

<Layout {data}>
<Ad />
<section class="Post region2">
    <div class="main">
        <h3 class="title">{page.title}</h3>
        <div class="content">
            {@html page.content}
        </div>
    </div>
    <div class="sidebar">
        {#each data.randomPosts as post}
            <a  href={`/post/${post._id.$oid}`}>
                <img src={post.thumb} alt=''/>
                {#if post.videos.length}
                <img class="play-icon" src="/images/play.png" alt=''/>
                {/if}
                <div class="title">{post.title}</div>
            </a>
        {/each}
    </div>

</section>
</Layout>

<style>
.Post{
    margin-top: 15px;
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: 70% auto;
    grid-gap: 15px;
}
.Post .main{
    background-color: var(--background-light);
    color: rgb(22, 22, 22);
    padding: 15px;
}
.Post .main .title{
    font: 18px/1.5 Oswald, Koulen;
    margin-bottom: 20px;
}
.Post .sidebar a{
    display: block;
    color: white;
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    margin-bottom: 15px;
}
.Post .sidebar a:last-child{
    margin-bottom: 0;
}
.Post .sidebar a img{
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
}
.Post .sidebar a .play-icon{
    width: auto;
    min-height: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 15%;
}
.Post .sidebar a .title{
    position: absolute;
    bottom: 0;
    padding: 5px 10px;
    font: 16px/1.5 Oswald, Bayon;
    text-shadow: 2px 2px 4px #000000;
    background: -webkit-linear-gradient(bottom, black,transparent);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media only screen and (max-width:600px){
    .Post{
        grid-template-columns: 100%;
    }
    .Post .sidebar{
        padding: 0 15px;
    }
}
</style>