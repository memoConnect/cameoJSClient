function cmContactBrief(){
    return {
        restrict : 'AE',
        templateUrl : 'comps/contacts/contact-brief.html',
        require: '^cmContactTag',
        scope : {
                    contact : "=cmData"
                }
    }
}