public class ApplicationTriggerHandler {

    public static void afterUpdate(
        List<Application__c> newApplications,
        Map<Id, Application__c> oldMap
    ) {

        Set<Id> studentIds = new Set<Id>();
        Set<Id> jobIds = new Set<Id>();

        for(Application__c app : newApplications){

            Application__c oldApp = oldMap.get(app.Id);

            if(oldApp.Status__c != 'Selected'
                && app.Status__c == 'Selected'){

                studentIds.add(app.Student__c);
                jobIds.add(app.Job__c);

            }

        }

        if(studentIds.isEmpty())
            return;

        Map<Id,Student__c> students = new Map<Id,Student__c>([
            SELECT Id,
                   Placement_Status__c,
                   Company__c
            FROM Student__c
            WHERE Id IN :studentIds
        ]);

        Map<Id,Job__c> jobs = new Map<Id,Job__c>([
            SELECT Id,
                   Company__c
            FROM Job__c
            WHERE Id IN :jobIds
        ]);

        List<Student__c> studentsToUpdate = new List<Student__c>();

        for(Application__c app : newApplications){

            Application__c oldApp = oldMap.get(app.Id);

            if(oldApp.Status__c != 'Selected'
                && app.Status__c == 'Selected'){

                Student__c stu = students.get(app.Student__c);
                Job__c job = jobs.get(app.Job__c);

                if(stu != null && job != null){

                    stu.Placement_Status__c = 'Placed';
                    stu.Company__c = job.Company__c;

                    studentsToUpdate.add(stu);

                }

            }

        }

        if(!studentsToUpdate.isEmpty()){

            update studentsToUpdate;

        }

    }

}
