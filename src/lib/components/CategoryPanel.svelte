<script>
    let { data } = $props()
</script>

<section class="category-panel">
    <div class="panel">
        <a class="category" href={`/doc/1`}>
            <img src={data.postsByCategory[0][0].thumb} alt='' />
            {#if data.postsByCategory[0][0].videos.length>0 }
            <img class="play-icon" src="/images/play.png" alt='' />
            {/if}
            <span>ឯកសារ</span>
        </a>
        <a class="category" href={`/sport/1`}>
            <img src={data.postsByCategory[1][0].thumb} alt='' />
            {#if data.postsByCategory[1][0].videos.length>0 }
            <img class="play-icon" src="/images/play.png" alt='' />
            {/if}
            <span>កីឡា</span>
        </a>
        <a class="category" href={`/movie/1`}>
            <img src={data.postsByCategory[2][0].thumb} alt='' />
            {#if data.postsByCategory[2][0].videos.length>0 }
            <img class="play-icon" src="/images/play.png" alt='' />
            {/if}
            <span>ភាពយន្ត</span>
        </a>
        <a class="category" href={`/travel/1`}>
            <img src={data.postsByCategory[3][0].thumb} alt='' />
            {#if data.postsByCategory[3][0].videos.length>0 }
            <img class="play-icon" src="/images/play.png" alt='' />
            {/if}
            <span>ដើរ​លេង</span>
        </a>
        <a class="category" href={`/game/1`}>
            <img src={data.postsByCategory[4][0].thumb} alt='' />
            {#if data.postsByCategory[4][0].videos.length>0 }
            <img class="play-icon" src="/images/play.png" alt='' />
            {/if}
            <span>ពិភព​និម្មិត</span>
        </a>
    </div>
</section>

<style>
.category-panel .panel{
    display: grid;
    grid-template-columns: repeat(5, calc(100% / 5 - 8px));
    grid-gap: 10px;
    padding: 10px 0;
}
.category-panel .panel > a{
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    width: 100%;
    display: block;
}
.category-panel .panel > a img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
}
.category-panel .panel > a .play-icon{
    width: auto;
    min-height: auto;
    width: 15%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
.category-panel .panel > a span{
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--background-dark);
    color: white;
    padding: 5px;
    font-family: Nokora;
}

@media only screen and (max-width:600px){
    .category-panel .panel{
        grid-template-columns: 100%;
        padding: 0 10px;
    }
}
</style>