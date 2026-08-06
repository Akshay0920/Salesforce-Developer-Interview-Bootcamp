public class ApplicationPostProcessingJob implements Queueable {

    private Id applicationId;

    public ApplicationPostProcessingJob(Id applicationId){

        this.applicationId = applicationId;

    }

    public void execute(QueueableContext context){

        Application__c app = [

            SELECT Id,
                   Student__c,
                   Job__c,
                   Status__c

            FROM Application__c

            WHERE Id = :applicationId

            LIMIT 1

        ];

        System.debug('External Synchronization Started');

        System.debug('Synchronizing Application: ' + app.Id);

        System.debug('External Synchronization Completed');

        // Queue next job

        System.enqueueJob(

            new PlacementNotificationJob(applicationId)

        );

    }

}
