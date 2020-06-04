const btnSeacher = document.querySelector('.btn-searcher');
const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.btn-close');

btnSeacher.addEventListener('click', () => modal.classList.remove('hide'));
btnClose.addEventListener('click', () => modal.classList.add('hide'));