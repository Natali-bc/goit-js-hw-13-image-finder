import imageTemplate from './templates/imageTemplate.hbs';

const TOKEN = '18971194-a8d2923dd41b567bba7e5ae77';
const inputRef = document.querySelector('input');
const formRef = document.querySelector('.search-form');
const cards = document.querySelector('.gallery');
const button = document.querySelector('.btn');

let page = 1;

const imageSearch = function (e) {
  e.preventDefault();
  const form = e.currentTarget;
  page += 1;
  fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputRef.value}&page=${page}&per_page=12&key=${TOKEN}`,
  )
    .then(data => data.json())
    .then(({ hits }) => {
      const cardImg = imageTemplate(hits);
      cards.insertAdjacentHTML('beforeend', cardImg);
    })
    .catch(error => console.log(error));
  form.reset();
};

formRef.addEventListener('submit', imageSearch);
button.addEventListener('click', imageSearch);

// window.scrollTo({
//   top: 100,
//   left: 100,
//   behavior: 'smooth',
// });
export { imageSearch };
