public class ApplicationService {

    public static void validateApplications(List<Application__c> applications){

        for(Application__c app : applications){

            if(app.Application_Date__c == null){
                app.Application_Date__c = Date.today();
            }

        }

    }

}
