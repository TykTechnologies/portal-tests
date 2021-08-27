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
 * @param {into} rowNumber row number, 1-based counting. Row 0 is a header
  */
  deleteRow(rowNumber) {
    this.openMenuAtRow(rowNumber);
    this.getRowElement(rowNumber).$('a*=Delete').click();
    this.OK_BUTTON.click();
  }

  /**
 * deleting row from table
 * @function
 * @param {into} rowNumber row number, 0-based counting
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
}

module.exports = Raava_table_object;