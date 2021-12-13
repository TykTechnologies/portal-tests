const Page = require('./Page');
const Table_object = require('../wrappers/raava_table_wrapper');
const Portal_catalogue_card_object = require('../wrappers/portal_catalogue_card_object');

class Portal_apps_page extends Page {
    get APPS_TABLE() { return new Table_object('.table'); }

    get pendingSectionID() { return "pending-requests";}
    get approvedSectionID() { return "approved-requests";}

    checkIfPageIsOpened() { wdioExpect(this.APPS_TABLE).toBeDisplayed(); }

    getAllPendingRequests() {
        this.getAllRequestsCardsInSection(this.pending);
    };

    getAllRequestsCardsInSection(sectionID) {
        let requestCardsList = [];
        for (let cardNumber = 1; cardNumber <= $$(`#${sectionID} .card`).length; cardNumber++) {
            requestCardsList.push(
                new Portal_catalogue_card_object(`//div[@id="${sectionID}"]/div[@class="card mb-4"][${cardNumber}]`));
        }
        return requestCardsList;
    };

    expectCountOfPendingRequests(expectedCount) {
        this.expectCountOfCardsInSection(expectedCount, this.pendingSectionID);
    };

    expectCountOfCardsInSection(expectedCount, sectionID) {
        wdioExpect($$(`//div[@id="${sectionID}"]/div[@class="card mb-4"]`)).toBeElementsArrayOfSize(expectedCount);
    };
}
export const portal_apps_page = new Portal_apps_page();