<!--src/components/Pagination.astro-->
<script>
    import Layout from "$lib/components/Layout.svelte"
    import Ad from "$lib/components/Ad.svelte"
    let { data } = $props()
</script>

<Layout {data}>
<Ad />
<section class="Home region2">
    <div class="container">
        {#each data.posts as post}
            <div class="wrapper">
                <a href={`/post/${post.id}`}>
                    <img src={post.thumb} alt=""/>
                    {#if post.videos.length}
                    <img class="play-icon" src="/images/play.png" alt=""/>
                    {/if}
                </a>
                <div class="date">{(new Date(post.date)).toLocaleDateString('it-IT')}</div>
                <a class="title" href={`/post/${post.id}`}>
                    <div >{post.title}</div>
                </a>
            </div>
        {/each}
    </div>
    <div class="pagination">
        <span>ទំព័រ </span>
        <select onchange={(event)=>{document.location = `/front/${event.target.value}`}}>
            {#each [...Array(data.lastPage).keys()] as pageNumber}
                {#if pageNumber+1 == data.currentPage}
                <option selected>{pageNumber+1}</option>
                {:else}
                <option>{pageNumber+1}</option>
                {/if}
            {/each}
        </select>
        <span> នៃ {data.lastPage}</span>
    </div>
</section>
</Layout>

<style>
.Home .container{
    display: grid;
    grid-template-columns: repeat(4, calc(100% / 4 - 11.25px));
    grid-gap: 30px 15px;
    padding: 15px 0 30px;
}
.Home .container .wrapper a{
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    width: 100%;
    display: block;
}
.Home .container .wrapper a img{
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
}
.Home .container .wrapper a .play-icon{
    width: auto;
    min-height: auto;
    width: 15%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
.Home .container .wrapper .title{
    padding-top: 0;
    color: var(--background-light);
}
.Home .pagination{
    display: block;
    text-align: center;
    padding-bottom: 30px;
}
@media only screen and (max-width:600px){
    .Home .container{
        grid-template-columns: 100%;
        padding: 30px 10px;
    }
}
</style>