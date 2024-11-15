<script>
    import jq from "jquery"
    let { data } = $props()

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
        let latestWorldMovies = parseVideos(data.postsByCategory[4])

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
        let player;
        let initialVideoId = 'cdwal5Kw3Fc';

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

        $effect(() => {
            window.YT.ready(function() {
                if (window.YT) {
                    load()
                } else {
                    window.onYouTubeIframeAPIReady = load
                }
            })
        })
        
</script>

<section class="latest">
    <script src="https://www.youtube.com/iframe_api"></script>
    <div class="feature-post">
        <div class="random-video">
            <div id="container">
                <div id="monitor">
                    <div id="monitorscreen">
                            <div id="youtube-player"></div>
                            <div class="latest-video">វីដេអូ​ចុង​ក្រោយ</div>
                            <div class="channel-logo">
                                <img src="/images/siteLogo.png" alt=''/>
                            </div>
                            <div class="play-all">
                                <span onclick={()=>{changeCategory(latestVideos, 'វីដេអូ​ចុងក្រោយ')}}>លេង​វីដេអូ​ចុង​ក្រោយ</span>
                            </div>
                    </div>
                    <div class="channel">
                        <a onclick={()=>{changeCategory(latestKhmerMovies, 'ឯកសារ​​​​ចុង​ក្រោយ')}}>
                            <img src={data.postsByCategory[0][0].thumb} alt=''/>
                            <p class="news-label">ឯសារ</p>
                        </a>
                        <a onclick={()=>{changeCategory(latestThaiMovies, 'កីឡា​​​ចុង​ក្រោយ')}} >
                            <img src={data.postsByCategory[1][0].thumb} alt=''/>
                            <p class="news-label">កីឡា</p>
                        </a>
                        <a onclick={()=>{changeCategory(latestChineseMovies, 'ភាពយន្ត​ចុង​ក្រោយ')}} >
                            <img src={data.postsByCategory[2][0].thumb} alt='' />
                            <p class="news-label">ភាពយន្ត</p>
                        </a>
                        <a onclick={()=>{changeCategory(latestKoreanMovies, '​​ដើរ​លេង​ចុង​ក្រោយ')}} >
                            <img src={data.postsByCategory[3][0].thumb} alt=''/>
                            <p class="news-label">ដើរ​លេង</p>
                        </a>
                        <a onclick={()=>{changeCategory(latestWorldMovies, 'ពិភព​និម្មិត​ចុង​ក្រោយ')}}>
                            <img src={data.postsByCategory[4][0].thumb} alt='' />
                            <p class="news-label">ពិភពនិម្មិត</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="navigation" style="text-align:center;padding: 20px;">
        <span>ទំព័រ</span> 
        <select onchange={()=>{document.location='/front/'+event.target.value}}>
            {#each [...Array(data.pageNumber).keys()] as page}
                <option>{page+1}</option>
            {/each}
        </select>
        <span>នៃ {data.pageNumber}</span>
    </div>
</section>

<style>
.latest #container {
    max-width: 1024px;
    margin: auto;
}
  
.latest #monitor {
    background: #000; 
    position: relative;
    border-top: 3px solid #888; 
    margin: 5% 0 2%;
    padding: 2% 2% 4% 2%; 
    border-radius: 10px; 
    border-bottom-left-radius: 50% 2%; 
    border-bottom-right-radius: 50% 2%; 
    transition: margin-right 1s;
}
.latest #monitor:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 3%;
    left: 36%;
    height: .5%; 
    width: 28%;
    background: #ddd; 
    border-radius: 50%; 
    box-shadow: 0 0 3px 0 white; 
}
.latest #monitor .channel{
    display: grid;
    grid-template-columns: repeat(5, calc(100% / 5 - 3.2px));
    grid-gap: 4px;
    border-top: 4px black solid;
}
.latest #monitor .channel img{
    width: 100%;
    min-width: 100%;
}
.latest #monitorscreen {
    position: relative;
    padding-top: 56.25%; 
    overflow: hidden;
    background-color: #777;
    background-size: cover; 
    background-position: top center;
    height: 0; 
}
.latest #monitorscreen #youtube-player{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.latest .latest-video{
    position: absolute;
    top: 5px;
    left: 10px;
    color: orange;
}
.latest #monitorscreen .channel-logo img{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 6%;
}
.latest #monitorscreen .play-all{
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
    visibility: hidden;
}
.latest #monitorscreen .play-all span{
    color: orange;
}
.latest #monitorscreen .play-all:hover{
    cursor: pointer;
}
.latest #monitorscreen:hover .play-all{
    visibility: visible;
}
.latest a{
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 56.25%;
    overflow: hidden;
}
.latest a:hover{
    cursor: pointer;
    opacity: .7;
}
.latest a img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
}
.latest a p{
    position: absolute;
    bottom: 0;
    left: 0;
    background: #06442f;
    color: white;
    text-align: center;
    font-family: Nokora;
    padding: 2px 5px;
}
.latest .navigation{
    text-align: center !important;
    padding: 20px;
}
.latest .navigation span{
    padding: 0;
}

@media only screen and (max-width: 600px){
    .latest #container {
        margin-left: 10px;
        margin-right: 10px;
    }
}
@media all and (min-width: 960px) {
    #monitor {
        -webkit-animation: tvflicker .2s infinite alternate; 
        -moz-animation:    tvflicker .5s infinite alternate; 
        -o-animation:      tvflicker .5s infinite alternate; 
        animation:         tvflicker .5s infinite alternate; 
    }

    @-webkit-keyframes tvflicker {
      0%   { box-shadow: 0 0 100px 0 rgba(200,235,255,0.4); }
      100% { box-shadow: 0 0 95px 0 rgba(200,230,255,0.45); }
    }
    @-moz-keyframes tvflicker {
      0%   { box-shadow: 0 0 100px 0 rgba(225,235,255,0.4); }
      100% { box-shadow: 0 0 60px 0 rgba(200,220,255,0.6); }
    }
    @-o-keyframes tvflicker {
      0%   { box-shadow: 0 0 100px 0 rgba(225,235,255,0.4); }
      100% { box-shadow: 0 0 60px 0 rgba(200,220,255,0.6); }
    }
    @keyframes tvflicker {
      0%   { box-shadow: 0 0 100px 0 rgba(225,235,255,0.4); }
      100% { box-shadow: 0 0 60px 0 rgba(200,220,255,0.6); }
    }
}
</style>