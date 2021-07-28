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
 * @param {into} rowNumber row number, 1-based counting. Row 0 is a header
  */
  openMenuAtRow(rowNumber) {
    this.getRowElement(rowNumber).$('.qor-table__actions').click();    
  }

/**
 * returning web element of whole row 'tr'
 * @function
 * @param {into} rowNumber row number, 1-based counting. Row 0 is a header
  */
  getRowElement(rowNumber) {
    return $(this.selector).$$('tr')[rowNumber];
  }

/**
 * returning web element of cell from provided column and row
 * @function
 * @param {string} columnName data-heading attribute from column 
 * @param {into} rowNumber row number, 1-based counting. Row 0 is a header
  */
 getCellElementByColumnNameAndRowNumber(columnName, rowNumber) {
  return this.getRowElement(rowNumber).$(`td[data-heading=${columnName}]`).$('div');
}

/**
 * deleting row from table
 * @function
 * @param {into} rowNumber row number, 1-based counting. Row 0 is a header
  */
  deleteRow(rowNumber) {
    this.openMenuAtRow(rowNumber);
    $(this.selector).$('a*=Delete').click();
    this.OK_BUTTON.click();
  }
}

module.exports = Raava_table_object;