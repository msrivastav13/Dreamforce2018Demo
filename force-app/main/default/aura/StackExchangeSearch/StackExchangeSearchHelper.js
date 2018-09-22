({
	postToChatterLink : function(component,event,questionLink,title) {
		var action = component.get("c.postStackLink");
		var parameters = {  
			caseId : component.get("v.recordId") ,
			title : title,
			link : questionLink
        }
        // Get server action service
        var server = component.find('server');
        server.callServerPromise(
            action, // Server-side action
            parameters, // Action parameters
            false, // Disable cache
            false, // Disable built-in error notification
            false, // Disable background
            false // Not abortable
        ).then($A.getCallback(response => {
            // Handle response
            $A.get('e.force:refreshView').fire();
        }))
        .catch($A.getCallback(errors => {
            // Handle errors
        }));
    },
})