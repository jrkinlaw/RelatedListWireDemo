import { api, track, wire, LightningElement } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class RelatedListWithPagination extends LightningElement {

    @api recordId;
    @track records;
    @track pageT;

    nextPage;
    prevPage;

    @wire(getRelatedListRecords, { parentRecordId: '$recordId', relatedListId: 'Contacts', fields: ['Contact.Name', 'Contact.Title', 'Contact.Email', 'Contact.Phone'], pageSize: 2, pageToken: '$pageT' })
    callback({data, error}) {
        if (data) {
            this.records = data.records;
            this.nextPage = data.nextPageToken;
            this.prevPage = data.previousPageToken;
        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }

    get hasRecords() {
        return this.records && this.records.length > 0;
    }
    
    get hasNextPage() {
        return this.nextPage && this.nextPage !== '0';
    }

    get hasPrevPage() {
        return this.prevPage && this.prevPage !== '0';
    }

    goToNextPage() {
        this.pageT = this.nextPage;
    }

    goToPrevPage() {
        this.pageT = this.prevPage;
    }
}