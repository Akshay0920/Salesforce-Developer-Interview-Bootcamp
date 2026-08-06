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
        }

        // Retrieve Students in one query
        Map<Id, Student__c> studentsById = new Map<Id, Student__c>([
            SELECT Id,
                   CGPA__c,
                   Active_Backlogs__c,
                   Branch__c
            FROM Student__c
            WHERE Id IN :studentIds
        ]);

        // Retrieve Jobs in one query
        Map<Id, Job__c> jobsById = new Map<Id, Job__c>([
            SELECT Id,
                   Minimum_CGPA__c,
                   Allowed_Backlogs__c,
                   Eligible_Branches__c
            FROM Job__c
            WHERE Id IN :jobIds
        ]);

        // Validate in memory
        for (Application__c app : applications) {

            Student__c student = studentsById.get(app.Student__c);
            Job__c job = jobsById.get(app.Job__c);

            if (student == null || job == null) {
                continue;
            }

            if (student.CGPA__c < job.Minimum_CGPA__c) {
                app.addError('Student CGPA is below the minimum requirement.');
            }

            if (student.Active_Backlogs__c > job.Allowed_Backlogs__c) {
                app.addError('Student has more backlogs than allowed.');
            }

            if (job.Eligible_Branches__c != null &&
                !job.Eligible_Branches__c.contains(student.Branch__c)) {

                app.addError('Student branch is not eligible for this job.');
            }

            if (app.Application_Date__c == null) {
                app.Application_Date__c = Date.today();
            }
        }
    }

}
