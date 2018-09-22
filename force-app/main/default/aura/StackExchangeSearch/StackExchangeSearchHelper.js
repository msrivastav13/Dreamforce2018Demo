({
	postToChatterLink : function(component,event,questionLink,title) {
		var action = component.get("c.postStackLink");
		var param = {  
			caseId : component.get("v.recordId") ,
			title : title,
			link : questionLink
		}
		action.setParams(param);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
				console.log('success');
				$A.get('e.force:refreshView').fire();
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