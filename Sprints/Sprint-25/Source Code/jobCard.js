import { LightningElement, api } from 'lwc';

export default class JobCard extends LightningElement {

    @api job;


    // =========================================
    // Sprint 25 UI STATE
    // =========================================

    @api submitting = false;

    @api success = false;

    @api failed = false;

    @api errorMessage = '';


    // =========================================
    // STATE 1: READY
    // =========================================

    get showReadyState() {

        return !this.submitting &&
               !this.success &&
               !this.failed;
    }


    // =========================================
    // STATE 2: SUBMITTING
    // =========================================

    get showSubmittingState() {

        return this.submitting;
    }


    // =========================================
    // STATE 3: SUCCESS
    // =========================================

    get showSuccessState() {

        return this.success;
    }


    // =========================================
    // STATE 4: FAILURE
    // =========================================

    get showFailureState() {

        return this.failed;
    }


    // =========================================
    // APPLY BUTTON
    // =========================================

    handleApply() {

        /*
         * Prevent another Apply action while
         * the current request is processing.
         */
        if (this.submitting) {
            return;
        }


        /*
         * Do not allow another application after
         * successful submission.
         */
        if (this.success) {
            return;
        }


        /*
         * Tell the parent that the user
         * wants to apply.
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
