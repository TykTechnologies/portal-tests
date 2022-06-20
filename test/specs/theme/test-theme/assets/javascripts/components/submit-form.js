export function onProductFormSubmit(elements) {
  const handleSubmit = () => {
    let cartForm = document.getElementById(elements.formId);

    if(!document.getElementById(elements.addBtn).dataset.singleCatalogue) {
      let productID = cartForm.querySelector(elements.catalogueBtn)?.dataset?.productId;
      cartForm.querySelector(elements.productBtn).value = productID;
    }

    cartForm.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch(e.target.action, {
          method: 'POST',
          body: new URLSearchParams(new FormData(e.target))
      }).then((resp) => {
        if(resp.status === 200) {
          let successMsg = document.querySelector('.alert-success');
          successMsg.classList.replace('d-none', 'd-flex')
        }
      }).catch((error) => {
        console.error(error)
      }).finally(() => {
        /* Hide the modal */
        const modal = document.getElementById('addFromCatalogue');
        if(modal) {
          const modalBackdrops = document.getElementsByClassName('modal-backdrop');

          modal.classList.remove('show');
          modal.setAttribute('aria-hidden', 'true');
          modal.setAttribute('style', 'display: none');
          document.querySelector('body').classList.remove('modal-open');
          document.querySelector('body').style = '';
          document.querySelector('nav').style = '';
          if(modalBackdrops) {
            document.body.removeChild(modalBackdrops[0]);
          }
  
          /* Clear radio button state */
          let modalRadioButtons = modal.querySelectorAll('.catalogue-input-radio');
  
          modalRadioButtons.forEach(rb => {
            rb.checked = false;
          })
        }
      });
    });
  }

  const init = () => {
    document.addEventListener('DOMContentLoaded', () => { 
      document.getElementById(elements.addBtn)?.addEventListener('click', handleSubmit);
    });
  };

  init();
}

export function onAppFormSubmit(formId) {
  let appForm = document.getElementById(formId);

  const removeIrrelevantModes = (data) => {
    let submitData = [];
    let submitMode = document.activeElement.dataset.submitMode;

    for (let v of data.entries()) {
      if(v[0] === 'mode' && v[1] !== submitMode) {
        v = null;
      }
      if(v) {
        submitData.push(v);
      }
    }
    return submitData.reduce((acc,[k,v])=>(acc[k]=v,acc),{})
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = removeIrrelevantModes(new FormData(appForm));

    fetch(e.target.action, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((resp) => {
        window.location.reload(false);
      }).catch((error) => {
        console.error(error)
      });
  }

  const init = () => {
    appForm?.addEventListener('submit', handleFormSubmit)
  };

  init();
}