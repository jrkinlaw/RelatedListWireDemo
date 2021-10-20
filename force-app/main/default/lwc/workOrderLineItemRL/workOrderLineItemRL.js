import { api, track, wire, LightningElement } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class WorkOrderLineItemRL extends LightningElement {
    @api recordId;
    
    @track workOrderLineItems;

    get hasWorkOrderLineItems() {
        return this.workOrderLineItems && this.workOrderLineItems.length > 0;
    }

    get workOrderTitle() {
        return "Work Order ID: " + this.recordId;
    }

    @wire(getRelatedListRecords, { parentRecordId: '$recordId', relatedListId: 'WorkOrderLineItems', fields: ['WorkOrderLineItem.LineItemNumber', 'WorkOrderLineItem.Asset.Name'] })
    callback({data, error}) {
        if (data) {
            this.workOrderLineItems = data.records;
        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }

    handleClose() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}