public class NotificationService {

    public static void sendNotification(List<Application__c> applications) {

        for(Application__c app : applications){

            if(app.Status__c == 'Interview Scheduled'){

                System.debug('Notification: Interview Scheduled');

            }

            else if(app.Status__c == 'Selected'){

                System.debug('Notification: Student Selected');

            }

            else if(app.Status__c == 'Rejected'){

                System.debug('Notification: Application Rejected');

            }

            else if(app.Status__c == 'Offer Accepted'){

                System.debug('Notification: Offer Accepted');

            }

        }

    }

}
