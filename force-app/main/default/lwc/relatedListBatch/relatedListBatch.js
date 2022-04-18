import { api, track, wire, LightningElement, unwrap } from 'lwc';
import { getRelatedListRecordsBatch } from 'lightning/uiRelatedListApi';

export default class RelatedListBatch extends LightningElement {

    @api recordId;
    @track results;
    
    @wire(getRelatedListRecordsBatch, {
        parentRecordId: '$recordId',
        relatedListParameters: [
            {
                relatedListId: 'Contacts',
                fields: ['Contact.Name','Contact.Id']
            }, {
                relatedListId: 'Opportunities',
                fields: ['Opportunity.Name', 'Opportunity.Amount']
            }
        ]
    })
    callback({data, error}) {
        if (data) {
            this.results = data.results;
        } else if (error) {
            this.error = error;
        }
    }
    

    hasData() {
        return this.results && Array.isArray(this.results) && this.results.length > 0;
    }
}