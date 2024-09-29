<script>
    import jq from 'jquery'
    let { data, player, initialVideoId = 'cdwal5Kw3Fc' } = $props()

    function parseVideos(posts){
        let videos = []
        for(let post of posts){
            videos.push(JSON.parse(post.videos))
        }
        return videos
    }

    let latestVideos = parseVideos(data.latestPosts)
    let latestKhmerMovies = parseVideos(data.postsByCategory[0])
    let latestThaiMovies = parseVideos(data.postsByCategory[1])
    let latestChineseMovies = parseVideos(data.postsByCategory[2])
    let latestKoreanMovies = parseVideos(data.postsByCategory[3])
    let latestTravelVideos = parseVideos(data.postsByCategory[4])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            [array[i], array[j]] = [array[j], array[i]]
        }
    }

    function loadVideo(playlist){
        if(playlist[0][0].type === "YouTubePlaylist"){
           player.loadPlaylist({list:playlist[0][0].id,listType:'playlist',index:0})
        }else{
            player.loadVideoById(playlist[0][0].id)
        }
    }

    function onPlayerReady(event) {
        player.part = 0
        player.playlist = latestVideos 
        loadVideo(latestVideos )
    }

    function onPlayerStateChange(event) {       
        if(event.data === YT.PlayerState.ENDED){
            player.part += 1
            if(player.part === player.playlist.length){
                player.part = 0
            }

            if(player.playlist[player.part][0].type === "YouTubePlaylist"){
                player.loadVideoById(initialVideoId)
                player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
            }else{
                player.loadVideoById(player.playlist[player.part][0].id)
            }
        }
    }

    function onPlayerError(event){
        player.part += 1
        if(player.part === player.playlist.length){
            player.part = 0
        }

        if(player.playlist[player.part][0].type === "YouTubePlaylist"){
            player.loadVideoById(initialVideoId)
            player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
        }else{
            player.loadVideoById(player.playlist[player.part][0].id)
        }
    }

    function changeCategory(playlist, label) {
        player.part = 0
        player.playlist = playlist
        if(playlist[player.part][0].type === "YouTubePlaylist"){
            player.loadVideoById(initialVideoId)
            player.loadPlaylist({list:playlist[0][0].id,listType:'playlist',index:0})
            jq('.latest-video').html(label)
        }else{
            player.loadVideoById(playlist[0][0].id)
            jq('.latest-video').html(label)
        }
    }

    const ytPlayerId = 'youtube-player'
    
    $effect(()=>{
        /*
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        */

        function load() {
            player = new YT.Player(ytPlayerId, {
                height: '390',
                width: '640',
                videoId: initialVideoId,
                playerVars: {
                    'playsinline': 1,
                    "enablejsapi": 1,
                    "mute": 1,
                    "autoplay": 1,
                    "rel": 0,
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }
            })
        }

        window.YT.ready(function() {
            if (window.YT) {
                load();
            } else {
                window.onYouTubeIframeAPIReady = load;
            }
        })
    })
</script>

<svelte:head>
    <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<section class="main region">

    <div class="feature-post">
        <div class="random-video">
            <span>
                <img alt='' on:click={()=>changeCategory(latestKhmerMovies, '​ភាពយន្ត​ខ្មែរ​ចុង​ក្រោយ')} src={data.postsByCategory[0][0].thumb} />
                <p class="news-label">ភាពយន្ត​​ខ្មែរ</p>
            </span>
            <span>
                <img alt='' on:click={()=>changeCategory(latestThaiMovies, 'ភាពយន្តថៃ​​ចុង​ក្រោយ')} src={data.postsByCategory[1][0].thumb} />
                <p class="movies-label">ភាពយន្ត​ថៃ</p>
            </span>
            <span>
                <img alt='' on:click={()=>changeCategory(latestTravelVideos, 'ភាពយន្ត​បរទេសចុង​ក្រោយ')} src={data.postsByCategory[4][0].thumb} />
                <p class="movies-label world-movie">ភាពយន្ត​បរទេស</p>
            </span>
            <span>
                <img alt='' on:click={()=>changeCategory(latestKoreanMovies, 'ភាពយន្តកូរ៉េ​​ចុង​ក្រោយ')} src={data.postsByCategory[3][0].thumb} />
                <p class="movies-label">ភាពយន្ត​​កូរ៉េ</p>
            </span>
            <span>
                <img alt='' on:click={()=>changeCategory(latestChineseMovies, 'ភាពយន្តចិន​​ចុង​ក្រោយ')} src={data.postsByCategory[2][0].thumb} />
                <p class="movies-label">ភាពយន្ត​​ចិន</p>
            </span>
            <div class="wrapper">
                <div id={ytPlayerId}></div>
                <div class="latest-video">វីដេអូ​ចុង​ក្រោយ</div>
                <div class="channel-logo">
                    <img src="/images/siteLogo.png" alt=''/>
                </div>
            </div>
            <div class="play-all">
                <a on:click={()=>changeCategory(latestVideos, 'វីដេអូ​ចុងក្រោយ')}>លេង​វីដេអូ​ចុង​ក្រោយ</a>
            </div>
        </div>
    </div>
    <div class="ad">
        <img src="/images/ad.jpg" alt='' />
        <img src="/images/ad.jpg" alt='' />
    </div>
</section>
<style>
.feature-post span img{
    width: 100%;
    float: left;
}
.random-video{
    display: grid;
    grid-template-columns: calc(33.33% - 6.66px) calc(33.33% - 6.66px) calc(33.33% - 6.66px);
    grid-gap: 10px;
    padding: 10px 0;
}
.random-video .wrapper{
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
    position: relative;
    padding-top: 53.4%;
}
.random-video span{
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 53.4%;
}
.random-video span:hover{
    cursor: pointer;
}
.random-video span img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.random-video span p{
    position: absolute;
    top: 0;
    left: 0;
    background: var(--background-dark);
    color: white;
    text-align: center;
    padding: 5px;
    width: 90px;
}
.random-video span .world-movie{
    width: auto;
}
.random-video .latest-video{
    position: absolute;
    top: 5px;
    left: 10px;
    color: orange;
}
.random-video .channel-logo img{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 6%;
}
.random-video .play-all{
    position: relative;
    bottom: 10px;
    text-align: center;
    visibility: hidden;
}
.random-video .play-all a{
    color: orange;
}
.random-video .play-all:hover{
    cursor: pointer;
}
.random-video .wrapper:hover .play-all{
    visibility: visible;
}
.random-video .wrapper #youtube-player{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.feature-post .ad{
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
}
.feature-post .ad img{
    width: 100%;
}

@media only screen and (max-width: 600px){
    .random-video{
        grid-template-columns: 100%;
        padding: 15px;
    }
    .random-video .wrapper{
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;
    }
}
    
</style>