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

    // LOAD ELIGIBLE JOBS

    @wire(getEligibleJobs, { studentId: '$recordId' })
    wiredJobs({ data, error }) {

        console.log('Student Record Id:', this.recordId);

        if (data) {

            console.log('Eligible Jobs:', data);

            this.jobs = data.map(job => ({
                ...job,

                // Sprint 25 UI states
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

    // APPLY

    async handleApply(event) {

        // Get Job ID from child component
        const jobId = event.detail.jobId;


        // DEBUG INFORMATION

        console.log(
            'Student Id:',
            this.recordId
        );

        console.log(
            'Selected Job Id:',
            jobId
        );


        // VALIDATE IDs BEFORE APEX

        if (!this.recordId || !jobId) {

            console.error(
                'Missing Student ID or Job ID'
            );

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Application Failed',
                    message: 'Student and Job are required.',
                    variant: 'error'
                })
            );

            return;
        }


        // STATE 2 — SUBMITTING

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

            // CALL APEX

            const applicationId = await submitApplication({

                studentId: this.recordId,

                jobId: jobId

            });


            console.log(
                'Application Id:',
                applicationId
            );

            // STATE 3 — SUCCESS

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

            // SUCCESS TOAST

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Application Submitted',

                    message:
                        'Your application was submitted successfully.',

                    variant: 'success'
                })
            );


        } catch (error) {

            // ERROR LOGGING

            console.error(
                'FULL APPLICATION ERROR:',
                JSON.stringify(error)
            );


            console.error(
                'SERVER MESSAGE:',
                error?.body?.message
            );


            // GET USEFUL ERROR MESSAGE

            const message =
                error?.body?.message ||
                'We could not submit your application. Please try again or contact the Placement Office.';


            // STATE 4 — FAILURE

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


            // ERROR TOAST

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Application Failed',

                    message: message,

                    variant: 'error'
                })
            );
        }
    }
}
