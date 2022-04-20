import { LightningElement, api, wire } from 'lwc';
import { getRelatedListInfoBatch } from 'lightning/uiRelatedListApi';

export default class RelatedListInfoBatch extends LightningElement {

    @api recordId;
    
    results = [];
    error;
    
    @wire(getRelatedListInfoBatch, {
        parentObjectApiName: 'Account',
        relatedListNames: ['Contacts', 'Opportunities']
    })listInfo({ error, data }) {
        if (data) {
            this.results = data.results;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.results = undefined;
        }
    }
}