import { pageUp } from './svg';

document.addEventListener('DOMContentLoaded', () => {
  const page = <HTMLElement>document.querySelector('.book');
  const up = document.querySelector<HTMLDivElement>('.up');

  function scrollFunction() {
    if (
      page.scrollTop > 600 && up
    ) {
      up.style.display = 'block';
    } else if (up) {
      up.style.display = 'none';
    }
  }
  if (up) {
    up.addEventListener('click', () => {
      page.scrollTop = 0;
    });
  }

  window.onscroll = () => {
    scrollFunction();
  };
});
