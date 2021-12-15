const Page = require('./Page');
const Table_object = require('../wrappers/raava_table_wrapper');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Portal_provisioning_request_card_object = require('../wrappers/portal_provisioning_request_card_object');

class Portal_apps_page extends Page {
    get APPS_TABLE() { return new Table_object('.table'); }
    get POPUP_ROTATE_BUTTON() {return new Button_object('button*=rotate credentials');}
    get POPUP_REVOKE_BUTTON() {return new Button_object('button*=revoke credentials');}

    get pendingSectionID() { return "pending-requests";}
    get approvedSectionID() { return "approved-requests";}

    checkIfPageIsOpened() { wdioExpect(this.APPS_TABLE).toBeDisplayed(); }

    getAllPendingRequests() {
        return this.getAllRequestsCardsInSection(this.pending);
    };

    getAllApprovedRequests() {
        return this.getAllRequestsCardsInSection(this.approvedSectionID);
    };

    getAllRequestsCardsInSection(sectionID) {
        let requestCardsList = [];
        for (let cardNumber = 1; cardNumber <= $$(`#${sectionID} .card`).length; cardNumber++) {
            requestCardsList.push(
                new Portal_provisioning_request_card_object(`//div[@id="${sectionID}"]/div[@class="card mb-4"][${cardNumber}]`)
                );
        }
        console.log(">>> Number of requests found: " + requestCardsList.length);
        return requestCardsList;
    };

    expectCountOfPendingRequests(expectedCount) {
        this.expectCountOfCardsInSection(expectedCount, this.pendingSectionID);
    };

    expectCountOfApprovedRequests(expectedCount) {
        this.expectCountOfCardsInSection(expectedCount, this.approvedSectionID);
    };

    expectCountOfCardsInSection(expectedCount, sectionID) {
        wdioExpect($$(`//div[@id="${sectionID}"]/div[@class="card mb-4"]`)).toBeElementsArrayOfSize(expectedCount);
    };
}
export const portal_apps_page = new Portal_apps_page();