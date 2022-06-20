export function CollapsibleSections({triggerElements, collapsibleID}) {
  triggerElements.forEach((el, i) => {
    el.addEventListener('click', () => {
      $(`${collapsibleID}-${i}`).on('show.bs.collapse', () => {
        const arrowUp = document.querySelectorAll('.arrow-up')[i];
        const arrowDown = document.querySelectorAll('.arrow-down')[i];
      
        arrowDown?.classList.replace('d-none', 'd-inline');
        arrowUp?.classList.replace('d-inline', 'd-none');
      });

      $(`${collapsibleID}-${i}`).on('hide.bs.collapse', () => {
        const arrowUp = document.querySelectorAll('.arrow-up')[i];
        const arrowDown = document.querySelectorAll('.arrow-down')[i];
      
        arrowDown?.classList.replace('d-inline', 'd-none');
        arrowUp?.classList.replace('d-none', 'd-inline');
      });
    });
  });
}