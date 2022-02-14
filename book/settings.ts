export function addModal() {
  const modal = document.querySelector<HTMLDivElement>('.modal');
  const modalContent = document.querySelector<HTMLDivElement>('.modal-content');
  const settingsBtn = document.querySelector<HTMLButtonElement>('.settings');
  
  const closeBtn = document.querySelector<HTMLButtonElement>('.close-button');

  const saveBtn = document.querySelector<HTMLButtonElement>('.save');

  function toggleModal(): void {
    modal?.classList.add('show-modal');
  }
  function removeModal(): void {
    modal?.classList.remove('show-modal');
  }
  
  settingsBtn?.addEventListener('click', toggleModal);
  closeBtn?.addEventListener('click', removeModal);
  // document.addEventListener('click', (e) => {
  //   e.stopPropagation();
  //   if (modalContent) {
  //     if (e.target !== modalContent) { removeModal(); }
  //   }
  // });
  saveBtn?.addEventListener('click', removeModal);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      removeModal();
    }
  });
}
export function removeBold(str: string) {
  const value = '<b>';
  const value1 = '</b>';
  const index = str.indexOf(value);
  const index1 = str.indexOf(value1);
  if (index === -1) {
    return str;
  }
  const boldText = str.slice(index + 3, index1).toUpperCase();
  return str.slice(0, index) + boldText + str.slice(index1 + 1 + value.length);
}

export function removeItalic(str: string) {
  const value = '<i>';
  const value1 = '</i>';
  const index = str.indexOf(value);
  const index1 = str.indexOf(value1);
  if (index === -1) {
    return str;
  }
  const italicText = str.slice(index + 3, index1).toUpperCase();
  return str.slice(0, index) + italicText + str.slice(index1 + 1 + value.length);
}

export function toggleTranslate(): void {
  const translateMeaning = document.querySelectorAll('.textMeaningTranslate');
  const translateWord = document.querySelectorAll('.translate');
  const translateExample = document.querySelectorAll('.textExampleTranslate');

  // let isTranslate = false;
  translateMeaning.forEach((element) => {
    element.classList.toggle('hide');
  });
  translateWord.forEach((element) => {
    element.classList.toggle('hide');
  });
  translateExample.forEach((element) => {
    element.classList.toggle('hide');
  });

  const showTranslation = document.querySelectorAll('.show-translation');
  if (showTranslation) {
    showTranslation.forEach((translate) => {
      translate.addEventListener('click', () => {
        toggleTranslate();
      });
    });
  }
}

export function toggleButtons():void {
  const showButtons = document.querySelectorAll('.show-buttons');
  const deleteBtns = document.querySelectorAll('.delete');
  const difficultBtns = document.querySelectorAll('.difficult');
  const correctBtns = document.querySelectorAll('.correct');
  const incorrectBtns = document.querySelectorAll('.incorrect');
  let isShowButtons = false;

  function removeButtons() {
    deleteBtns.forEach((element) => {
      element.classList.add('hide');
    });
    difficultBtns.forEach((element) => {
      element.classList.add('hide');
    });
    correctBtns.forEach((element) => {
      element.classList.add('hide');
    });
    incorrectBtns.forEach((element) => {
      element.classList.add('hide');
    });
  }

  // removeButtons();
  function addButtons() {
    deleteBtns.forEach((element) => {
      element.classList.remove('hide');
    });
    difficultBtns.forEach((element) => {
      element.classList.remove('hide');
    });
    correctBtns.forEach((element) => {
      element.classList.remove('hide');
    });
    incorrectBtns.forEach((element) => {
      element.classList.remove('hide');
    });
  }
  // addButtons();

  // if (!isShowButtons) {
  //   removeButtons();
  //   isShowButtons = true;
  // } else if (isShowButtons) {
  //   addButtons();
  //   isShowButtons = false;
  // }

  if (showButtons) {
    showButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (!isShowButtons) {
          removeButtons();
          isShowButtons = true;
        } else if (isShowButtons) {
          addButtons();
          isShowButtons = false;
        }
        toggleButtons();
      });
    });
  }
}
