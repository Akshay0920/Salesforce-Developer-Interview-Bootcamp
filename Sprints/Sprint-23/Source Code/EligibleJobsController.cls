public with sharing class EligibleJobsController {

    @AuraEnabled(cacheable=true)
    public static List<Job__c> getEligibleJobs(Id studentId) {

        if (studentId == null) {
            return new List<Job__c>();
        }

        return ApplicationService.getEligibleJobs(studentId);
    }
}
