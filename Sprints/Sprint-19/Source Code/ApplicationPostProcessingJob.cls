public class ApplicationPostProcessingJob implements Queueable {

    private Id applicationId;

    public ApplicationPostProcessingJob(Id applicationId) {

        this.applicationId = applicationId;

    }

    public void execute(QueueableContext context) {

        Application__c app = [
            SELECT Id,
                   Student__c,
                   Job__c,
                   Status__c
            FROM Application__c
            WHERE Id = :applicationId
            LIMIT 1
        ];

        System.debug('Background Processing Started');

        System.debug('Application Id : ' + app.Id);

        System.debug('Preparing Notification...');

        System.debug('Preparing Analytics...');

        System.debug('External Synchronization Completed');

    }

}
