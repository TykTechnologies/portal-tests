function InfoCard({element, onChange, index}) {
  let $editBtn = element.querySelector('[data-action="edit"]');
  let $cancelBtn = element.querySelector('[data-action="cancel"]');
  let $editModeBtns = element.querySelector('.disable-editing');
  let $staticDataWrapper = element.querySelector('.card-footer__static-data');
  let $dynamicDataWrapper = element.querySelector('.card-footer__dynamic-data');

  const showEditMode = () => {
    $editBtn?.classList.replace('d-block', 'd-none');
    $editModeBtns?.classList.replace('d-none', 'd-block');
    $staticDataWrapper?.classList.replace('d-block', 'd-none');
    $dynamicDataWrapper?.classList.replace('d-none', 'd-block');
    onChange({index, state: true});
  };

  const hideEditMode = () => {
    $editModeBtns?.classList.replace('d-block', 'd-none');
    $editBtn?.classList.replace('d-none', 'd-block');
    $staticDataWrapper?.classList.replace('d-none', 'd-block');
    $dynamicDataWrapper?.classList.replace('d-block', 'd-none');
    onChange({index, state: false});
  }

  const bindEvents = () => {
    $editBtn?.addEventListener('click', showEditMode);
    $cancelBtn?.addEventListener('click', hideEditMode);
  };

  bindEvents();

  return {
    showEditMode,
    hideEditMode
  };
};

 function Toggle({element, onChange, index, contentWrapper }) {
  let stepsCollection = element.querySelectorAll('.step-wrapper .step');
  let contentCollection = contentWrapper[index].querySelectorAll('.content-wrapper__content');

  function handleContent(i, stepsCollection, contentCollection) {
    onChange({ stepIndex: i, stepsCollection, contentCollection});
  }

  const bindEvents = () => {
    stepsCollection.forEach((s, i) => {
      s.addEventListener('click', handleContent.bind(null, i, stepsCollection, contentCollection), false);
    })
  };

   const init = () => {
    bindEvents();
  };

  init();
 }


export function Interactive({cardSelector, stepsSelector, contentsSelector}) {

  let infoCardsCollection = document.querySelectorAll(cardSelector);
  let stepsWrapper = document.querySelectorAll(stepsSelector);
  let contentWrapper = document.querySelectorAll(contentsSelector);

  const onCardToggles = ({index}) => {
    if(stepsWrapper) {
      stepsWrapper.forEach((instance, i) => {
        if(index !== i) {
          instance.hideEditMode();
        };
      });
    }
  };

  const toggleSections = ({ stepIndex, stepsCollection, contentCollection}) => {
    contentCollection?.forEach(c => {
      c.classList.replace('d-block', 'd-none');
      contentCollection[stepIndex].classList.replace('d-none', 'd-block');
    });

    stepsCollection?.forEach(s => {
      s.classList.remove('active');
      stepsCollection[stepIndex].classList.add('active');
    });
    
  };

  const init = () => {
    infoCardsCollection.forEach((el, index) => InfoCard({element: el, onChange: onCardToggles, index}));
    stepsWrapper.forEach((el, index) => Toggle({element: el, onChange: toggleSections, index, contentWrapper}));
  };

  init();
}

