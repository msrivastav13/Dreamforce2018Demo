({
	search : function(component,event) {
		var params = event.getParam('arguments');
		var callback;
		var searchString ;
        if (params) {
			callback = params.callback;
			searchString = params.searchString;
        }
        // Get server action service
        var server = component.find('server');
		var action = component.get("c.searchStackexchangeAPI");
		var parameters = {  
			searchStr : searchString 
        }
        server.callServerPromise(
            action, // Server-side action
            parameters, // Action parameters
            false, // Disable cache
            false, // Disable built-in error notification
            false, // Disable background
            false // Not abortable
        ).then($A.getCallback(response => {
            // Handle response
            console.log(response);
            if (callback) callback(response);
        }))
        .catch($A.getCallback(errors => {
            // Handle errors
        }));
    },

    getTagDetails : function (component,event){
        var params = event.getParam('arguments');
        var callback ;
        if(params){
            callback = params.callback;
        }
        var server = component.find('server');
        var action = component.get("c.getTagReportingData");
        server.callServerPromise(
            action, // Server-side action
            null, // Action parameters
            false, // Disable cache
            false, // Disable built-in error notification
            false, // Disable background
            false // Not abortable
        ).then($A.getCallback(response => {
            // Handle response
            if (callback) callback(response);
        }))
        .catch($A.getCallback(errors => {
            // Handle errors
        }));
    }
})