<script>
    export let data
    const posts = data.postsByCategory
</script>

{#if posts.length >= 5}
<section class="Category region">
    <div class="wrapper">
        <a href="/Khmer/1"><img src={ posts[0].thumb } alt='' /><span>Khmer</span></a>
        <a href="/Thai/1"><img src={ posts[1].thumb } alt='' /><span>Thai</span></a>
        <a href="/Chinese/1"><img src={ posts[2].thumb } alt='' /><span>Chinese</span></a>
        <a href="/Korean/1"><img src={ posts[3].thumb } alt='' /><span>Korean</span></a>
        <a href="/travel/1"><img src={ posts[4].thumb } alt='' /><span>Travel</span></a>
    </div>
</section>  
{/if}

<style>
    .Category .wrapper{
        display: grid;
        grid-template-columns: repeat(5, calc(100% / 5 - 8px));
        grid-gap: 10px;
        padding: 10px 0;
    }
    .Category .wrapper a{
        position: relative;
        padding-top: 56.25%;
        overflow: hidden;
    }
    .Category .wrapper a img{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }
    .Category .wrapper a span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 30px;
        color: white;
        text-shadow: 2px 2px 4px #000000;
    }

    @media only screen and (max-width:600px){
        .Category .wrapper{
            grid-template-columns: 100%;
            padding: 10px;
        }
    }
</style>