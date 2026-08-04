public class StatisticsService {

    public static void updatePlacementStatistics(List<Application__c> applications) {

        for(Application__c app : applications){

            if(app.Status__c == 'Selected'){

                System.debug('Placement statistics updated for Application: ' + app.Id);

            }

        }

    }

}
