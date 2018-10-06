@isTest
public class StackAPIServiceTest {

    public static testMethod void testsearchStackexchangeAPI(){
        SingleRequestMock searchAPIResponse = new SingleRequestMock(200,
                                                 'Complete',
                                                 generateSearchResponse(),
                                                 null);
		Test.setMock(HttpCalloutMock.class, searchAPIResponse);
        Test.startTest();
        String apiResponse = StackQuestionsController.searchStackexchangeAPI('Lightning API Error');
        Test.stopTest();
        System.assertEquals(apiResponse,generateSearchResponse(),'Search API Method is not working as expected');
    }

    public static testMethod void testgetTagReportingData(){
        SingleRequestMock searchAPIResponse = new SingleRequestMock(200,
                                                 'Complete',
                                                 getTagReportingAPIResponse(),
                                                 null);
		Test.setMock(HttpCalloutMock.class, searchAPIResponse);
        Test.startTest();
        String apiResponse = StackQuestionsController.getTagReportingData();
        Test.stopTest();
        System.assertEquals(apiResponse,getTagReportingAPIResponse(),'Tag API Method is not working as expected');
    }

    public static testMethod void testgetQuestionAnswers(){
        SingleRequestMock searchAPIResponse = new SingleRequestMock(200,
                                                 'Complete',
                                                 generateAnswerResponse(),
                                                 null);
		Test.setMock(HttpCalloutMock.class, searchAPIResponse);
        Test.startTest();
        String apiResponse = StackAPIService.getQuestionAnswers('233475');
        Test.stopTest();
        System.assertEquals(apiResponse,generateAnswerResponse(),'Answer API Method is not working as expected');
    }

    public static testMethod void testpostStackLink(){
        Account acc = new Account();
        acc.Name = 'Test';
        insert acc;
        Contact con = new Contact();
        con.LastName = 'Test';
        con.FirstName = 'Test';
        con.Email = 'con@gmail.com';
        con.AccountId = acc.Id;
        insert con;
        Case caseRec = new Case();
        caseRec.ContactId = con.Id;
        caseRec.AccountId = acc.Id;
        caseRec.Subject = 'Retrieve elements created with Aura:Iteration';
        insert caseRec;
        Test.startTest();
        StackQuestionsController.postStackLink(caseRec.Id,caseRec.Subject,'https://salesforce.stackexchange.com/questions/204727/retrieve-elements-created-with-auraiteration');
        Test.stopTest();
        List<FeedItem> lstFeedItem = [Select Id ,Body,LinkUrl FROM FeedItem WHERE ParentId=:caseRec.Id];
        System.assertEquals(lstFeedItem.size(),1,'Feed Item Record Created');
        System.assertEquals(lstFeedItem[0].Body,caseRec.Subject,'Subject not populated');
        System.assertEquals(lstFeedItem[0].LinkUrl,'https://salesforce.stackexchange.com/questions/204727/retrieve-elements-created-with-auraiteration','Link URL is not populated');
    }

    public static String generateAnswerResponse(){
        String json =		'{'+
		'	"items": [{'+
		'		"owner": {'+
		'			"reputation": 228834,'+
		'			"user_id": 2984,'+
		'			"user_type": "registered",'+
		'			"accept_rate": 60,'+
		'			"profile_image": "https://i.stack.imgur.com/Qvgta.png?s=128&g=1",'+
		'			"display_name": "sfdcfox",'+
		'			"link": "https://salesforce.stackexchange.com/users/2984/sfdcfox"'+
		'		},'+
		'		"is_accepted": false,'+
		'		"score": 0,'+
		'		"last_activity_date": 1537567449,'+
		'		"creation_date": 1537567449,'+
		'		"answer_id": 233476,'+
		'		"question_id": 233475,'+
		'		"body": "<p><code>init</code> always occurs first"'+
		'	}],'+
		'	"has_more": false,'+
		'	"quota_max": 300,'+
		'	"quota_remaining": 293'+
		'}';
        return json;
    }

    public static String getTagReportingAPIResponse(){
        String json=		'{'+
		'	"items": [{'+
		'		"has_synonyms": false,'+
		'		"is_moderator_only": false,'+
		'		"is_required": false,'+
		'		"count": 5718,'+
		'		"name": "lightning-components"'+
		'	}, {'+
		'		"has_synonyms": true,'+
		'		"is_moderator_only": false,'+
		'		"is_required": false,'+
		'		"count": 14475,'+
		'		"name": "visualforce"'+
		'	}, {'+
		'		"has_synonyms": true,'+
		'		"is_moderator_only": false,'+
		'		"is_required": false,'+
		'		"count": 24028,'+
		'		"name": "apex"'+
		'	}, {'+
		'		"has_synonyms": true,'+
		'		"is_moderator_only": false,'+
		'		"is_required": false,'+
		'		"count": 5495,'+
		'		"name": "trigger"'+
		'	}],'+
		'	"has_more": false,'+
		'	"quota_max": 300,'+
		'	"quota_remaining": 295'+
		'}';
        return json;
    }

    public static String generateSearchResponse(){
        String json=		'{'+
		'	"items": [{'+
		'		"tags": ["lightning-components"],'+
		'		"owner": {'+
		'			"reputation": 1,'+
		'			"user_id": 57811,'+
		'			"user_type": "registered",'+
		'			"profile_image": "https://lh4.googleusercontent.com/-8Xvq8DkZSwk/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2XO01PNhrlvircZvEPeXV-EcmLyQ/mo/photo.jpg?sz=128",'+
		'			"display_name": "Somnath Paul",'+
		'			"link": "https://salesforce.stackexchange.com/users/57811/somnath-paul"'+
		'		},'+
		'		"is_answered": false,'+
		'		"view_count": 15,'+
		'		"answer_count": 1,'+
		'		"score": 0,'+
		'		"last_activity_date": 1537567449,'+
		'		"creation_date": 1537566645,'+
		'		"last_edit_date": 1537567219,'+
		'		"question_id": 233475,'+
		'		"link": "https://salesforce.stackexchange.com/questions/233475/navigating-from-one-lightning-record-page-to-another-record-page",'+
		'		"title": "Navigating from one lightning record page to another record page",'+
		'		"body": "I am trying to achieve the below requirement in lightning."'+
		'	}, {'+
		'		"owner": {'+
		'			"reputation": 73,'+
		'			"user_id": 58657,'+
		'			"user_type": "registered",'+
		'			"profile_image": "https://lh4.googleusercontent.com/-ZYxyYA3EXQc/AAAAAAAAAAI/AAAAAAAAABk/y-U-1pG4T_k/photo.jpg?sz=128",'+
		'			"display_name": "Homerlex",'+
		'			"link": "https://salesforce.stackexchange.com/users/58657/homerlex"'+
		'		},'+
		'		"is_answered": false,'+
		'		"view_count": 37,'+
		'		"answer_count": 1,'+
		'		"score": 0,'+
		'		"last_activity_date": 1533239002,'+
		'		"creation_date": 1533237290,'+
		'		"question_id": 227586,'+
		'		"link": "https://salesforce.stackexchange.com/questions/227586/lightning-record-page-only-for-overriding-default-record-page",'+
		'		"title": "Lightning Record Page: Only for overriding default record page?",'+
		'		"body": "and throw some custom components on it"'+
		'	}],'+
		'	"has_more": false,'+
		'	"quota_max": 300,'+
		'	"quota_remaining": 299'+
		'}';
        return json;
    }


    
}