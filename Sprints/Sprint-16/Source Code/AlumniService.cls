public class AlumniService {

    public static void processAcceptedOffers(List<Application__c> applications) {

        for(Application__c app : applications){

            if(app.Status__c == 'Offer Accepted'){

                System.debug('Alumni Office notified for Student: ' + app.Student__c);

            }

        }

    }

}
