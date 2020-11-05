import imageTemplate from './templates/imageTemplate.hbs';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const TOKEN = '18971194-a8d2923dd41b567bba7e5ae77';
const inputRef = document.querySelector('input');
const formRef = document.querySelector('.search-form');
const cards = document.querySelector('.gallery');
const button = document.querySelector('.btn');

let page = 1;

const imageSearch = function () {
  fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputRef.value}&page=${page}&per_page=12&key=${TOKEN}`,
  )
    .then(data => data.json())
    .then(({ hits }) => {
      const cardImg = imageTemplate(hits);
      cards.insertAdjacentHTML('beforeend', cardImg);
    });

  setTimeout(() => {
    page > 1
      ? window.scrollTo({
          top: window.pageYOffset + window.innerHeight - 70,
          behavior: 'smooth',
        })
      : '';
  }, 1000);
  page += 1;
};

formRef.addEventListener('submit', e => {
  e.preventDefault();
  cards.innerHTML = '';
  page = 1;
  imageSearch();
});

cards.addEventListener('click', e => {
  e.path.forEach(el => {
    if (el.className === 'gallery-list') {
      const instance = basicLightbox.create(`
          <img src="${el.dataset.path}"/>
      `);

      instance.show();
    }
  });
});
button.addEventListener('click', imageSearch);

window.addEventListener('scroll', () => {
  document.documentElement.scrollHeight > 1000 &&
  document.documentElement.clientHeight + document.documentElement.scrollTop >=
    document.documentElement.scrollHeight - 50
    ? button.classList.remove('is-hidden')
    : button.classList.add('is-hidden');
});

export { imageSearch };
