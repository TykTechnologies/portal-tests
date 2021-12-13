const Table_object = require('ui_test_automation/wrappers/Table_object');
const Button_object = require('ui_test_automation/wrappers/Button_object');

/**
 * Representing Raava table object
 * @class
 */
class Raava_table_object extends Table_object {
  constructor(selector) {
    super(selector);
  }

  //CONFIRM BUTTON
  get OK_BUTTON() {return new Button_object('button*=ok');}

/**
 * opening menu on row
 * @function
 * @param {into} rowNumber row number, 0-based counting
  */
  openMenuAtRow(rowNumber) {
    this.getRowElement(rowNumber).$('button').click();    
  }

/**
 * returning web element of whole row 'tr'
 * @function
 * @param {into} rowNumber row number, 0-based counting.
  */
  getRowElement(rowNumber) {
    return $(this.selector).$('tbody').$$('tr')[rowNumber];
  }

/**
 * returning cell webelement. Cell is searched by row number and header name
 * @function
 * @param {into} rowNumber row number, 0-based counting
 * @param {into} headerName header name, string equal to data-heading cell attribute
  */
 getCellElement(rowNumber, headerName) {
  const cellElement = this.getRowElement(rowNumber)?.$(`td[data-heading="${headerName}"] div`);
  if (!cellElement) {
    console.warn(`Cell was not found! Row: ${rowNumber}, header: ${headerName}`);
  }
  return cellElement;
}

/**
 * deleting row from table
 * @function
 * @param {int} rowNumber row number, 1-based counting. Row 0 is a header
  */
  deleteRow(rowNumber) {
    this.clickActionOnRow(rowNumber, 'Delete');
    this.OK_BUTTON.click();
  }

  /**
 * synchronize row from table
 * @function
 * @param {int} rowNumber row number, 1-based counting. Row 0 is a header
  */
   synchronizeRow(rowNumber) {
    this.clickActionOnRow(rowNumber, 'Synchronize');
    this.OK_BUTTON.click();
  }

  /**
 * click action on row
 * @function
 * @param {int} rowNumber row number, 1-based counting. Row 0 is a header
 * @param {String} actionName like delete, synchronize, approve
  */
   clickActionOnRow(rowNumber, actionName) {
    this.openMenuAtRow(rowNumber);
    this.getRowElement(rowNumber).$(`a*=${actionName}`).click();
  }

  /**
 * deleting row from table
 * @function
 * @param {string} cellvalue value of the cell
  */
   getRowNumberOfCellWithValue(cellvalue) {
    for (let rowNumber = 0; rowNumber < this.getRowCount(); rowNumber++) {
      console.log(this.getRowValues(rowNumber));
      if (this.getRowValues(rowNumber).includes(cellvalue)) {
        return rowNumber;
      }
    }
    console.warn(`Row with value ${cellvalue} was not found!`);
    return null;
  }

/**
 * getting cell using header name and row number
 * @function
 * @param {string} columnName row number, 0-based counting
 * @param {int} rowNumber row number, 0-based counting
  */
 getCellElementByColumnNameAndRowNumber(columnName, rowNumber) {
  const cellElement = $(this.selector).$(`//tbody//tr[position()=${rowNumber+1}]//td[@data-heading="${columnName}"]`);
  cellElement.waitForExist();
  return cellElement;
  }
}

module.exports = Raava_table_object;