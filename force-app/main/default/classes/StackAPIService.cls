public with sharing class StackAPIService {

    public static final String API_AUTH = 'callout:Salesforce_Stackexchange/2.2/';

    public static final String SEARCH_API = 'search/advanced';

    public static final String Site = 'salesforce';

    public static final String QUESTION_ANSWER_API = 'questions/';

    public static final String TAGS_API ='tags/';

    public static final String TAGS_LIST = 'apex;visualforce;lightning-components;trigger';

    /**
	 * Search All the Records From the Salesforce Stackexchange API
	 * @param  searchStr Search String to query Salesforce Stackexchange API
	 * @param  tags  SemiColon delimited list of Tags
	 */

    public static String searchStackAPI(String searchStr){
        String endPoint = API_AUTH + SEARCH_API + '?order=desc&sort=activity&site='+Site;
        endPoint = endPoint + '&q=' + EncodingUtil.urlEncode(searchStr, 'UTF-8') + '&filter=withbody';
        HTTPResponse res = apiService(endPoint,'GET',null,null);
        return res.getBody();
    }

    /**
	 * Search All the Records From the Salesforce Stackexchange API
	 * @param  searchStr Search String to query Salesforce Stackexchange API
	 * @param  tags  SemiColon delimited list of Tags
	 */

    public static String getQuestionAnswers(String questionId){
        String endPoint = API_AUTH + QUESTION_ANSWER_API + questionId + '/answers?order=desc&sort=activity&site='+Site + '&filter=withbody';
        HTTPResponse res = apiService(endPoint,'GET',null,null);
        return res.getBody();
    }

    /**
    * Generic HttpRequest callout method used when contacting
    * the TypeForm APIs.
    * @param path String for the  API path
    * @param method GET/POST method
    * @param bodyContent JSON body of the request
    * @param headers Map<String, String> provide a map for the request and response
    * @return HttpResponse response object that consists of the HTTP response for the API callout
    */

    public static HttpResponse apiService(String endPointURL, String method, String bodyContent, Map<String, String> headers) {
        
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endPointURL);
        request.setMethod(method);//set method
        if (bodyContent != null) {
            request.setBody(bodyContent);
        }
        if (headers != null && !headers.isEmpty()) {
            for (String key : headers.keySet()) {
                request.setHeader(key, headers.get(key));
            }
        }

        system.debug(endPointURL);
        HttpResponse httpRes = new Http().send(request);
        System.debug('SERVER RESPONSE STATUS CODE ' + httpRes.getStatusCode());
        return httpRes;
    }

    public static String getTagReportingData(){
        String endPoint = API_AUTH + TAGS_API + EncodingUtil.urlEncode(TAGS_LIST, 'UTF-8') + '/info?order=desc&sort=activity&site='+Site;
        HTTPResponse res = apiService(endPoint,'GET',null,null);
        return res.getBody();
    }

}