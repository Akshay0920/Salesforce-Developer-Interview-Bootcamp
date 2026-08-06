public class PlacementCategoryBatch
    implements Database.Batchable<SObject> {

    public Database.QueryLocator start(Database.BatchableContext bc) {

        return Database.getQueryLocator([

            SELECT Id,
                   Placement_Category__c,
                   Status__c

            FROM Application__c

            WHERE Placement_Category__c = NULL

        ]);

    }

    public void execute(
        Database.BatchableContext bc,
        List<Application__c> scope
    ) {

        for(Application__c app : scope){

            if(app.Status__c == 'Selected'){

                app.Placement_Category__c = 'Placed';

            }
            else{

                app.Placement_Category__c = 'Not Placed';

            }

        }

        update scope;

    }

    public void finish(Database.BatchableContext bc){

        System.debug('Placement Category Batch Completed');

    }

}
