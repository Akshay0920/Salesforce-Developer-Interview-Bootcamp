import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getEligibleJobs
    from '@salesforce/apex/EligibleJobsController.getEligibleJobs';

import submitApplication
    from '@salesforce/apex/ApplicationController.submitApplication';

export default class EligibleJobs extends LightningElement {

    @api recordId;

    jobs = [];
    error;
    isSubmitting = false;

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

async handleApply(event) {

    console.log('APPLY BUTTON CLICKED');

    if (this.isSubmitting) {
        console.log('Already submitting');
        return;
    }

    const jobId = event.target.dataset.jobId;

    console.log('Student Id:', this.recordId);
    console.log('Job Id:', jobId);

    this.isSubmitting = true;

    try {

        const applicationId = await submitApplication({
            studentId: this.recordId,
            jobId: jobId
        });

        console.log('SUCCESS - Application Id:', applicationId);

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Application submitted successfully.',
                variant: 'success'
            })
        );

    } catch (error) {

        console.error(
            'APPLICATION ERROR:',
            JSON.stringify(error)
        );

        const message =
            error?.body?.message ||
            'Unable to submit application.';

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Application Failed',
                message: message,
                variant: 'error'
            })
        );

    } finally {

        this.isSubmitting = false;

        console.log('Submission finished');
    }
}
}
