<script>
    import { onMount } from 'svelte'
    export let searchList
    let items = []

    const categories = {
            'រឿងខ្មែរ': 'Khmer',
            'រឿងថៃ': 'Thai',
            'រឿងចិន': 'Chinese',
            'រឿងកូរ៉េ': 'Korean',
            'ដើរ​​លេង': 'Travel',
            'ព័ត៌មាន': 'News'
        }
</script>

<section class="Ad region">
    <img src="/images/ad.jpg" alt=''/>
    <img src="/images/ad.jpg" alt=''/>
</section>

<section class="Category region">
    <div class="container">
        {#each items as item}
            <div class="wrapper">
                {#if item.data.categories.includes("News")}
                <a href="/news/{item.slug}">
                    <img src={item.data.thumb} />
                    <img class="play-icon" src="/images/play.png" />
                </a>
                {:else}
                <a href="/post/{item.slug}">
                    <img src={item.data.thumb} />
                    <img class="play-icon" src="/images/play.png" />
                </a>
                {/if}
                <div class="date">{item.data.pudate.toLocaleDateString("it-IT")}</div>
                {#if item.data.categories.includes("News")}
                <a class="title" href="/news/{item.slug}">
                    <div >{item.data.title}</div>
                </a>
                {:else}
                <a class="title" href="/post/{item.slug}">
                    <div >{item.data.title}</div>
                </a>
                {/if}
            </div>
        {/each}
    </div>
</section>

<style>
.Ad{
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 10px;
    padding-top: 0;
}
.Ad img{
    width: 100%;
}
.Category .container{
    display: grid;
    grid-template-columns: repeat(4, calc(100% / 4 - 11.25px));
    grid-gap: 30px 15px;
    padding: 30px 0;
}
.Category .container .wrapper a{
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    width: 100%;
    display: block;
}
.Category .container .wrapper a img{
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
}
.Category .container .wrapper a .play-icon{
    width: auto;
    min-height: auto;
    width: 15%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
.Category .container .wrapper .title{
    padding-top: 0;
}
.Category .container .wrapper .title div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media only screen and (max-width:600px){
    .Ad{
        grid-template-columns: 100%;
        padding: 0 10px;
    }
    .Category .container{
        grid-template-columns: 100%;
        padding: 30px 10px;
    }
}
</style>
