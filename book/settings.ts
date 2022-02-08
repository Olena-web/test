export function addModal() {
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  const settingsBtn = document.querySelector('.settings');
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

  let isTranslate = false;

  translateMeaning.forEach((element) => {
    if (!isTranslate) {
      element.classList.add('hide');
      isTranslate = false;
    } else {
      element.classList.remove('hide');
      isTranslate = true;
    }
  });
  translateWord.forEach((element) => {
    if (!isTranslate) {
      element.classList.add('hide');
      isTranslate = false;
    } else {
      element.classList.remove('hide');
      isTranslate = true;
    }
  });
  translateExample.forEach((element) => {
    if (!isTranslate) {
      element.classList.add('hide');
      isTranslate = false;
    } else {
      element.classList.remove('hide');
      isTranslate = true;
    }
  });
  const showTranslation = document.querySelector<HTMLElement>('.show-translation');
  showTranslation?.addEventListener('click', () => {
    toggleTranslate();
  });
}
