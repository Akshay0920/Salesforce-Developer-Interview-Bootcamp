import { LightningElement, api } from 'lwc';

export default class JobCard extends LightningElement {

    // =========================================
    // DATA FROM PARENT
    // =========================================

    @api job;


    // =========================================
    // APPLICATION STATES
    // =========================================

    @api submitting = false;

    @api success = false;

    @api failed = false;

    @api errorMessage = '';


    // =========================================
    // READY STATE
    // =========================================

    get showReadyState() {

        return !this.submitting &&
               !this.success &&
               !this.failed;
    }


    // =========================================
    // SUBMITTING STATE
    // =========================================

    get showSubmittingState() {

        return this.submitting;
    }


    // =========================================
    // SUCCESS STATE
    // =========================================

    get showSuccessState() {

        return this.success;
    }


    // =========================================
    // FAILURE STATE
    // =========================================

    get showFailureState() {

        return this.failed;
    }


    // =========================================
    // USER INTERACTION
    // =========================================

    handleApply() {

        /*
         * Prevent repeated clicks while processing.
         */
        if (this.submitting) {
            return;
        }


        /*
         * Prevent another application after
         * successful submission.
         */
        if (this.success) {
            return;
        }


        /*
         * Notify the parent.
         *
         * The child does NOT call Apex.
         * The child does NOT decide eligibility.
         *
         * It only communicates what happened.
         */
        this.dispatchEvent(
            new CustomEvent('apply', {

                detail: {
                    jobId: this.job.Id
                }

            })
        );
    }
}
