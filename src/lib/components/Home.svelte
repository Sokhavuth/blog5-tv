<!--src/components/Home.astro-->
<script>
    export let data
    const posts = data.posts
    const pageAmount = Math.ceil(data.count/data.settings.categoryPostLimit)
</script>

<section class="Home region">
    <div class="container">
        {#each posts as post}
            <div class="wrapper">
                <a href={`/post/${post.id}`}>
                    <img src={post.thumb} alt=''/>
                    {#if post.videos.length}
                    <img class="play-icon" src="/images/play.png" alt=''/>
                    {/if}
                </a>
                <div class="date">{(new Date(post.date)).toLocaleDateString('it-IT')}</div>
                    <a class="title" href={`/post/${post.id}`}>
                    <div >{post.title}</div>
                </a>
            </div>
        {/each}
    </div>
    <div class="navigation">
        <span>ទំព័រ </span>
        <select on:change={(event)=>{document.location = `/${event.target.value}`}}>
            {#each [...Array(pageAmount).keys()] as pageNumber}
                <option>{pageNumber+1}</option>
            {/each}
        </select>
        <span> នៃ {pageAmount}</span>
    </div>
</section>

<style>
.Home .container{
    display: grid;
    grid-template-columns: repeat(4, calc(100% / 4 - 11.25px));
    grid-gap: 30px 15px;
    padding: 30px 0;
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
}
.Home .container .wrapper .title div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.Home .navigation{
    text-align: center;
}
@media only screen and (max-width:600px){
    .Home .container{
        grid-template-columns: 100%;
        padding: 30px 10px;
    }
}
</style>