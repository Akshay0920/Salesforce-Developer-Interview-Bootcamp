public class ExpiredJobBatch
implements Database.Batchable<SObject>{

    public Database.QueryLocator start(
        Database.BatchableContext bc
    ){

        return Database.getQueryLocator([

            SELECT Id,
                   Status__c,
                   Closing_Date__c

            FROM Job__c

            WHERE Closing_Date__c < TODAY
            AND Status__c='Open'

        ]);

    }

    public void execute(
        Database.BatchableContext bc,
        List<Job__c> scope
    ){

        for(Job__c job : scope){

            job.Status__c='Closed';

        }

        update scope;

    }

    public void finish(
        Database.BatchableContext bc
    ){

        System.debug('Expired Job Batch Completed');

    }

}
