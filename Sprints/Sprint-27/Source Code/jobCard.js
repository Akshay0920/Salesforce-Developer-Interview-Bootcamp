import { LightningElement, api } from 'lwc';

export default class JobCard extends LightningElement {

    @api job;

    @api submitting;
    @api success;
    @api failed;
    @api errorMessage;


    // =========================================
    // VIEW DETAILS
    // =========================================

    handleViewDetails() {

        console.log('JobCard Job:', this.job);
        console.log('JobCard Job Id:', this.job?.Id);

        this.dispatchEvent(
            new CustomEvent('viewdetails', {
                detail: {
                    jobId: this.job.Id
                }
            })
        );
    }


    // =========================================
    // APPLY
    // =========================================

    handleApply() {

        console.log('JobCard Apply Job Id:', this.job?.Id);

        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    jobId: this.job.Id
                }
            })
        );
    }
}
