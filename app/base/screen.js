function initScreenWidth(){
    var html    = document.getElementsByTagName('html')[0],
        app     = document.getElementById('cm-app'),
        height  = window.innerHeight,
        width   = html.innerWidth,
        effectiveWidth = Math.min(height, width)

    html.style.fontSize = (effectiveWidth/32) +'px'
    app.style.maxWidth = effectiveWidth+'px'

}

initScreenWidth()
window.onresize = initScreenWidth