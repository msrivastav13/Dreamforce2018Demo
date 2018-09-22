({
	search : function(component,event) {
		var params = event.getParam('arguments');
		var callback;
		var searchString ;
		var searchTag ;
        if (params) {
			callback = params.callback;
			searchString = params.searchString;
			searchTag = params.searchTag;
        }

		var action = component.get("c.searchStackexchangeAPI");
		var param = {  
			searchStr : searchString ,
			tags : searchTag
		}
		action.setParams(param);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if (callback) callback(response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                          errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },

    getTagDetails : function (component,event){
        var params = event.getParam('arguments');
        var callback ;
        if(params){
            callback = params.callback;
        }
        var action = component.get("c.getTagReportingData");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if (callback) callback(response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                          errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    }
})