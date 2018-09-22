public with sharing class StackQuestionsController {

    @AuraEnabled
    public static string searchStackexchangeAPI(String searchStr,String tags){
        try{
            return StackAPIService.searchStackAPI(searchStr,tags);
        }catch(Exception e ){
            throw new AuraHandledException('Search API Failure'+e.getMessage());
        }
    }

    @AuraEnabled
    public static string getTagReportingData(){
        try{
            return StackAPIService.getTagReportingData();
        }catch(Exception e ){
            throw new AuraHandledException('Tag API Failure'+e.getMessage());
        }
    }

    @AuraEnabled
    public static string postStackLink(String caseId,String title,String link){
        try{
            FeedItem post = new FeedItem();
            post.ParentId = caseId; //eg. Opportunity id, custom object id..
            post.Body = title;
            post.LinkUrl = link;
            insert post;
            return post.Id;
        }catch(Exception e){
            throw new AuraHandledException('Post To Chatter Failed'+e.getMessage());
        }
    }

}