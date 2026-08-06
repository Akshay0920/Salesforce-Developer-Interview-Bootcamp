public class ApplicationService {

    public static void validateApplications(List<Application__c> applications) {

        // Collect Student and Job Ids
        Set<Id> studentIds = new Set<Id>();
        Set<Id> jobIds = new Set<Id>();

        for (Application__c app : applications) {

            if (app.Student__c != null) {
                studentIds.add(app.Student__c);
            }

            if (app.Job__c != null) {
                jobIds.add(app.Job__c);
            }

            if (app.Application_Date__c == null) {
                app.Application_Date__c = Date.today();
            }
        }

        // Retrieve Students
        Map<Id, Student__c> students = new Map<Id, Student__c>([
            SELECT Id,
                   CGPA__c,
                   Backlogs__c,
                   Branch__c
            FROM Student__c
            WHERE Id IN :studentIds
        ]);

        // Retrieve Jobs
        Map<Id, Job__c> jobs = new Map<Id, Job__c>([
            SELECT Id,
                   Minimum_CGPA__c,
                   Allowed_Backlogs__c,
                   Allowed_Branch__c
            FROM Job__c
            WHERE Id IN :jobIds
        ]);

        // Validate each Application
        for (Application__c app : applications) {

            Student__c stu = students.get(app.Student__c);
            Job__c job = jobs.get(app.Job__c);

            if (stu == null || job == null) {
                continue;
            }

            // CGPA Validation
            if (stu.CGPA__c < job.Minimum_CGPA__c) {
                app.addError('Student CGPA is below the minimum requirement.');
            }

            // Backlog Validation
            if (stu.Backlogs__c > job.Allowed_Backlogs__c) {
                app.addError('Student has more backlogs than allowed.');
            }

            // Branch Validation
            if (job.Allowed_Branch__c != null &&
                stu.Branch__c != job.Allowed_Branch__c) {

                app.addError('Student branch is not eligible for this job.');
            }
        }
    }
}
