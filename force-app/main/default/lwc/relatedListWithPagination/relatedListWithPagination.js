import { api, track, wire, LightningElement, unwrap } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class RelatedListWithPagination extends LightningElement {

    DEFAULT_PAGE_SIZE = 2;

    @api recordId;
    @track records = [];
    
    nextPageToken;
    pageSize = 2;

    @wire(getRelatedListRecords, { parentRecordId: '$recordId', relatedListId: 'Contacts', fields: ['Contact.Name', 'Contact.Title', 'Contact.Email', 'Contact.Phone'], pageSize: '$pageSize' })
    callback({data, error}) {
        if (data) {
            this.records = [];
            this.records = data.records;
            this.nextPageToken = data.nextPageToken;
        } else if (error) {
            this.error = error;
        }
    }

    hasRecords() {
        return this.records && this.records.length;
    }
    
    get hasMore() {
        return this.nextPageToken !== null;
    }

    showMore() {
        console.log(this.nextPageToken);
        console.log(this.pageSize);
        this.pageSize += 2;
    }
}