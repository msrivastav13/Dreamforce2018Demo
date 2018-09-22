({
    onInit: function(component, event){
        var stackDataService = component.find("stackAPICmp");
        // call the aura:method in the child component
        var searchTerm = component.get("v.simpleRecord.subject");
        console.log(component.get("v.simpleRecord"));
        console.log(component.get("v.recordId"));
        stackDataService.searchStackExchange(searchTerm,'',function(result) {
            console.log("callback for aura:method was executed");
            var response = JSON.parse(result);
            component.set("v.responseMap",response);
            component.find('enter-search').set("v.value",searchTerm);
        });
    },
    
    handleKeyUp: function (component, event) {
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            var searchTerm = component.find('enter-search').get('v.value');
			var stackDataService = component.find("stackAPICmp");
			// call the aura:method in the child component
			stackDataService.searchStackExchange(searchTerm,'',function(result) {
				console.log("callback for aura:method was executed");
                var response = JSON.parse(result);
                component.set("v.responseMap",response);
        	});
        }
    },
    
    handleMenuSelect : function (component, event,helper) {
        console.log(event.getParams());
        var selectedMenuItemValue = event.getParam("value").split('@@');
        var questionLink = selectedMenuItemValue[0];
        var label = selectedMenuItemValue[1];
        var title = selectedMenuItemValue[2];
        switch(label) {
            case 'view':
               window.open(questionLink,'_blank');
                break;
            case 'PostToChatter':
                console.log('Post To Chatter');
                helper.postToChatterLink(component,event,questionLink,title);
                break;
		}
    }
})