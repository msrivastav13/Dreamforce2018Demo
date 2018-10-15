describe("StackExchangeSearchAppTest", function(){ 

   var responseObject ;

   afterEach(function () {
        $T.clearRenderedTestComponents();
    });

   beforeEach(function (){
        responseObject = {
            "items": [{
                "tags": ["apex", "opportunity", "custom-field", "compile-error"],
                "owner": {
                    "reputation": 5,
                    "user_id": 41839,
                    "user_type": "registered",
                    "accept_rate": 33,
                    "profile_image": "https://www.gravatar.com/avatar/0bc0ed8296de54b67e4650139d34b493?s=128&d=identicon&r=PG&f=1",
                    "display_name": "user3585019",
                    "link": "https://salesforce.stackexchange.com/users/41839/user3585019"
                },
                "is_answered": false,
                "view_count": 1329,
                "answer_count": 2,
                "score": 0,
                "last_activity_date": 1537747206,
                "creation_date": 1493991034,
                "last_edit_date": 1493992404,
                "question_id": 173130,
                "link": "https://salesforce.stackexchange.com/questions/173130/how-to-update-existing-opportunity-field-value",
                "title": "How to update existing opportunity field value",
                "body": "<p>I am trying to replace opportunity field value using apex class,</p>\n\n<pre><code>public class update_system {\n    public static String saveData(){\n        for (Opportunity opp : [SELECT Id,system__c FROM Opportunity where system__c = 'Test (A)' and StageName Not in ('Closed','Closed Won','Closed Lost') limit 10\n]){\n               if (opp.system__c == 'Test (A)' ){ \n                   opp.update_system__c = 'Test';\n                   update opp;\n\n               }    \n        }\n     }\n}\n</code></pre>\n\n<p>but i am getting below error</p>\n\n<blockquote>\n  <p>Error Error: Compile Error: Invalid field update_system__c for SObject Opportunity at line 6 column 20    </p>\n</blockquote>\n"
            }, {
                "tags": ["batch"],
                "owner": {
                    "reputation": 79,
                    "user_id": 5292,
                    "user_type": "registered",
                    "accept_rate": 67,
                    "profile_image": "https://www.gravatar.com/avatar/c536cfec1489b1cd118f58a15d891bdb?s=128&d=identicon&r=PG&f=1",
                    "display_name": "Pracha Yang",
                    "link": "https://salesforce.stackexchange.com/users/5292/pracha-yang"
                },
                "is_answered": false,
                "view_count": 960,
                "answer_count": 3,
                "score": 2,
                "last_activity_date": 1537736448,
                "creation_date": 1398192932,
                "last_edit_date": 1488430453,
                "question_id": 33381,
                "link": "https://salesforce.stackexchange.com/questions/33381/unable-to-get-any-results-from-query-using-database-querylocator",
                "title": "Unable to get any results from query using database.queryLocator",
                "body": "<p>Below is the query string I used for an apex batch job and when it gets query through the Database.QuaryLocator start() method, it doesn't return any results when I execute anonymous. I have test data in my sandbox and I've tested the query and it does return some rows of data, but I can't get anything when I'm testing it against the batch class. </p>\n\n<blockquote>\n  <p>Batch class</p>\n</blockquote>\n\n<pre><code>global class InformationTracking_BatchJobs implements Database.Batchable&lt;Sobject&gt;{\n\n    global String query = 'SELECT Id, Name, Loaner_Item_Status__c, Loaner_Vendor_Need_to_Ship__c, Loaner_Vendor_Ship__c, '+\n                          'Loaner_Customer_Receive__c, Loaner_Customer_Ship__c, Loaner_Vendor_Receive__c, '+\n                          'Repair_Item_Status__c, Repair_Customer_Need_to_Ship__c, Repair_Customer_Ship__c, '+\n                          'Repair_Vendor_Receive__c, Repair_Vendor_Ship__c, Repair_Customer_Receive__c, Opportunity__c, '+\n                          'Repair_Vendor_Evaluated__c, Repair_Customer_Made_Decision__c, Track_Loaner__c, '+\n                          'Repair_Item_Vendor__r.Name, Repair_Item__r.Name, Repair_Item_PN__c, Repair_Item_SN__c, '+\n                          'Loaner_Item_Vendor__r.Name, Loaner_Item__r.Name, Loaner_Item_PN__c, Loaner_Item_SN__c '+\n                          'FROM Information_Tracking__c ';\n\n    global Database.QueryLocator start(Database.BatchableContext context){\n        return Database.getQueryLocator(query);\n    }\n}\n</code></pre>\n"
            }],
            "has_more": true,
            "quota_max": 300,
            "quota_remaining": 291
        }
   });

    describe("A suite that tests youtube search component functionality", function() {
        describe('c:StackAPIService', function () {
            //Tests for the server Response
            it('verify that server api for the search StackExchange is working', function (done) {
                $T.createComponent('c:StackAPIService',{}, true)
                    .then(function(component) {
                        var mockResponse = { 
                            getState: function () { 
                                return "SUCCESS";
                            }, 
                            getReturnValue: function () { 
                                return JSON.stringify(responseObject); 
                            } 
                        };
                        spyOn($A, "enqueueAction").and.callFake(function (action) {
                            var cb = action.getCallback("SUCCESS");
                            cb.fn.apply(cb.s, [mockResponse]);
                        });
                        var callback;
                        component.searchStackExchange('lightning component',function(result) {
                            var response = JSON.parse(result);
                            console.log(response);
                            expect(response).toEqual(responseObject);
                        });
                        done();
                    }).catch(function (e) {
                        done.fail(e);
                    });
            });
        });
    });
    
});