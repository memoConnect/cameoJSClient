function initScreenWidth(){
    var html    = document.getElementsByTagName('html')[0],
        app     = document.getElementById('cm-app')
        width   = window.innerWidth,
        height  = window.innerHeight,
        effectiveWidth = Math.min(height, width)

    html.style.fontSize = (effectiveWidth/32) +'px'
    app.style.width = effectiveWidth+'px'

}

initScreenWidth()
window.onresize = initScreenWidth