({
    afterScriptsLoaded : function(component, event, helper) {
        var ctx = document.getElementById("piechart").getContext('2d');
        var response ;
        var tagCountArray = [];
        var labels = [];
        var stackDataService = component.find("stackAPICmp");
		// call the aura:method in the child component
        stackDataService.getTagInfo(function(result) {
            console.log("callback for aura:method was executed");
            response = JSON.parse(result);
            response.items.forEach(function(element) {
                tagCountArray.push(element.count);
                labels.push(element.name);
            });
            var data = {
                datasets: [{
                    data: tagCountArray,
                    backgroundColor: [
                        "Red",
                        "Green",
                        "Blue",
                        "Yellow"
                    ]
                }],
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: labels
            };
            var myPieChart = new Chart(ctx,{
                type: 'pie',
                data: data,
                options: {
                    title: {
                        display: true,
                        text: 'Questions Per Topic',
                        fontSize : 40,
                        fontFamily : 'verdana',
                        fontStyle : 'light'
                    }
                }
            });
        });
    }
})