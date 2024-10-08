const tag = document.createElement('script')
tag.src = 'https://www.youtube.com/player_api'
const firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
        videoId: 'An6LvWQuj_8',
        autoplay: true,
        loop: true,
        controls: false,
    })
}
