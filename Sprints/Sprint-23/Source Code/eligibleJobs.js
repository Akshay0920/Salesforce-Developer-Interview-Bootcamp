import { LightningElement, api, wire } from 'lwc';

import getEligibleJobs from '@salesforce/apex/EligibleJobsController.getEligibleJobs';

export default class EligibleJobs extends LightningElement {

    @api recordId;

    jobs = [];
    error;

    @wire(getEligibleJobs, { studentId: '$recordId' })
    wiredJobs({ data, error }) {

        if (data) {

            this.jobs = data;
            this.error = undefined;

        } else if (error) {

            this.jobs = [];
            this.error = error;

        }
    }
}
