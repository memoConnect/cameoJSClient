/**
 * Created by reimerei on 15.04.14.
 */

this.cmLoadPage = function (url, ptor) {

    ptor.get(url);

    ptor.wait(function () {

        return ptor.executeScript('return window != undefined && window._route != undefined').then(function (boolean) {

            console.log("Page loaded: " + boolean)

            if (boolean) {
                return ptor.executeScript('return window._route.status').then(function (status) {
                    return status == "success"
                })
            }
        })


    }, 5000, "timeout")

}