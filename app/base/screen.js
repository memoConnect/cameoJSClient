function initScreenWidth(){
    var html = document.getElementsByTagName('html')[0]

    html.style.fontSize = (window.innerWidth/30) +'px'
}

initScreenWidth()
window.onresize = initScreenWidth