import {
    LightningElement,
    api
} from 'lwc';

export default class StudentPortal
    extends LightningElement {


    @api recordId;


    // =========================================
    // PROFILE SAVED
    // =========================================

    handleProfileSaved(event) {

        console.log(
            'Profile saved:',
            event.detail.studentId
        );


        // Find Eligible Jobs child

        const eligibleJobs =
            this.template.querySelector(
                'c-eligible-jobs'
            );


        // Refresh Eligible Jobs

        if (eligibleJobs) {

            eligibleJobs.refreshJobs();

        }

    }

}
