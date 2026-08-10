import { LightningElement, api } from 'lwc';

export default class StudentProfile extends LightningElement {

    @api recordId;

    successMessage = '';
    errorMessage = '';

    handleSuccess() {
        this.successMessage = 'Profile updated successfully.';
        this.errorMessage = '';

        setTimeout(() => {
            this.successMessage = '';
        }, 3000);
    }

    handleError(event) {
        this.errorMessage = 'Unable to update profile. Please check the entered values.';
        this.successMessage = '';

        console.error(event.detail);
    }
}
