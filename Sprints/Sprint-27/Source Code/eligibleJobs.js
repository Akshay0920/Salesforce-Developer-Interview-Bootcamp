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


    // =========================================
    // RETRIEVE JOBS
    // =========================================

    @wire(getEligibleJobs, { studentId: '$recordId' })
    wiredJobs({ data, error }) {

        console.log('Student Record Id:', this.recordId);

        if (data) {

            console.log('Eligible Jobs:', data);

            this.jobs = data.map(job => ({
                ...job,

                // UI state belongs to the parent
                isSubmitting: false,
                isSuccess: false,
                isFailed: false,
                errorMessage: ''
            }));

            this.error = undefined;

        } else if (error) {

            console.error(
                'Eligible Jobs Error:',
                JSON.stringify(error)
            );

            this.jobs = [];
            this.error = error;
        }
    }


    // =========================================
    // CHILD → PARENT EVENT
    // =========================================

    async handleApply(event) {

        const jobId = event.detail.jobId;

        console.log('Student Id:', this.recordId);
        console.log('Selected Job Id:', jobId);


        // =========================================
        // VALIDATION
        // =========================================

        if (!this.recordId || !jobId) {

            this.showError(
                'Student and Job are required.'
            );

            return;
        }


        // =========================================
        // SUBMITTING STATE
        // =========================================

        this.jobs = this.jobs.map(job => {

            if (job.Id === jobId) {

                return {
                    ...job,
                    isSubmitting: true,
                    isSuccess: false,
                    isFailed: false,
                    errorMessage: ''
                };
            }

            return job;
        });


        try {

            // =====================================
            // BUSINESS ACTION
            // =====================================

            const applicationId =
                await submitApplication({

                    studentId: this.recordId,

                    jobId: jobId
                });


            console.log(
                'Application Id:',
                applicationId
            );


            // =========================================
            // SUCCESS STATE
            // =========================================

            this.jobs = this.jobs.map(job => {

                if (job.Id === jobId) {

                    return {
                        ...job,

                        isSubmitting: false,
                        isSuccess: true,
                        isFailed: false,
                        errorMessage: ''
                    };
                }

                return job;
            });


            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Application Submitted',
                    message:
                        'Your application was submitted successfully.',
                    variant: 'success'
                })
            );


        } catch (error) {

            console.error(
                'Application Error:',
                JSON.stringify(error)
            );


            const message =
                error?.body?.message ||
                'We could not submit your application. Please try again or contact the Placement Office.';


            // =========================================
            // FAILURE STATE
            // =========================================

            this.jobs = this.jobs.map(job => {

                if (job.Id === jobId) {

                    return {
                        ...job,

                        isSubmitting: false,
                        isSuccess: false,
                        isFailed: true,

                        errorMessage: message
                    };
                }

                return job;
            });


            this.showError(message);
        }
    }


    // =========================================
    // ERROR HANDLER
    // =========================================

    showError(message) {

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Application Failed',
                message: message,
                variant: 'error'
            })
        );
    }

    handleViewDetails(event) {

    const jobId = event.detail.jobId;

    console.log('View Details Job Id:', jobId);
}

}
