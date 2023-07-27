const URL_PARAMS = new URLSearchParams(window.location.search);
const USER = URL_PARAMS.get('token');

// Show an element
const show = (selector) => {
  document.querySelector(selector).style.display = 'block';
};

// Hide an element
const hide = (selector) => {
  document.querySelector(selector).style.display = 'none';
};

if (USER) {
  hide('.content.unauthorized');
  show('.content.authorized');
}




