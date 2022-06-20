import { SortBy } from './components/sorting.js';
import { Interactive } from './components/interactive.js';
import { onProductFormSubmit, onAppFormSubmit } from './components/submit-form.js';
import { fromSearch, fromButton } from './components/set-element-value.js';
import { decoratePasswordReveal } from './components/decorate-password-reveal.js';
import { copyToClipboard } from './components/copy-to-clipboard.js';
import { ActivePageNumber } from './components/set-active-pagination-number.js';
import { CollapsibleSections} from './components/collapsible-sections.js'

/* Cards listing */
let defaultSortingElements = {
	mainWrapper: '.catalog-apis-container .card-container',
	elementWrapper: '.catalog-apis-container .card-container .card',
	elementTitle: '.catalog-apis-container .card-container .card .card-body .card-title',
	elementContent: '.catalog-apis-container .card-container .card .card-body',
	elementImage: '.catalog-apis-container .card-container .card img',
	elementCtaContainer: '.catalog-apis-container .card-container .card .card-cta',
	elementCTA: '.catalog-apis-container .card-container .card .card-cta .learn-more-cta',
}

let catalogueSorting = SortBy(defaultSortingElements);

/* Search - Catalogue & MyApps */
let defaultSearchElements = {
  elementsID: ['status', 'search', 'catalogue']
};
fromSearch(defaultSearchElements);

/* Cart form submission */
let elements = {
  formId: 'add-to-cart-form',
  productBtn: '.product-input-radio',
  catalogueBtn: '.catalogue-input-radio',
  addBtn: 'add-to-cart-btn'
}
onProductFormSubmit(elements);
onAppFormSubmit('app-form');
onAppFormSubmit('user-form');

/* Interactive */
Interactive({
  cardSelector: '.profile-wrapper__card-section'
});

Interactive({
  cardSelector: '.apps-wrapper__card-section'
});

Interactive({
  stepsSelector: '.step-wrapper',
  contentsSelector: '.content-wrapper',
});

/* Password decoration */
let allContentFields = document.querySelectorAll('.content-field');
allContentFields.forEach(decoratePasswordReveal);

let copyElems = document.querySelectorAll('.tykon-copy');
copyElems.forEach(copyToClipboard);

/* Enable Bootstrap tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

ActivePageNumber({
  searchParam: 'page',
  paginationLink: '.pagination .page-item'
});

/* Collapsible cards using Bootstrap's collapse.
   The module adds the ability to switch the arrow (if any)
*/
const collapsibleTogglers = document.querySelectorAll('.toggle-collapsible');

CollapsibleSections({ 
  triggerElements: collapsibleTogglers,
  collapsibleID: '#type-details'
});

/* Handle DCR content visibility withing portal_checkout.tmpl */
const dcrTriggers = document.querySelectorAll('.dcr-visibility');
dcrTriggers.forEach(t => {
  t.addEventListener('click', () => {
    const templateContent = document.querySelector('.dcr-templates');
    const shouldShow = t.value === 'create' ?? 'existing';
    templateContent?.classList?.replace(`${shouldShow ? 'd-none' : 'd-block'}`, `${shouldShow ? 'd-block' : 'd-none'}`);
  })
})
