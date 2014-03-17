function initScreenWidth(){
    var html = document.getElementsByTagName('html')[0]

    html.style.fontSize = (window.innerWidth/32) +'px'
}

initScreenWidth()
window.onresize = initScreenWidth