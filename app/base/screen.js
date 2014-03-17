function initScreenWidth(){
    var body = document.getElementsByTagName('body')[0]

    body.style.fontSize = (window.innerWidth/30) +'px'
}

initScreenWidth()
window.onresize = initScreenWidth