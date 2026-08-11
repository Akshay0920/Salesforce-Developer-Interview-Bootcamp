import {
    LightningElement,
    api
} from 'lwc';

export default class EmptyState extends LightningElement {

    @api title;

    @api message;

    @api actionLabel;


    handleAction() {

        this.dispatchEvent(
            new CustomEvent('action')
        );

    }

}
