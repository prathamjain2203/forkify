import { view } from './view';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _window = document.querySelector('.add-recipe-window');
  _message = 'Your Recipe is successfully added.'

  constructor() {
    super();
    this._showAddRecipeForm();
    this._hideAddRecipeForm();
  }

  addUploadHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');

    this._window.classList.toggle('hidden');
  }

  _showAddRecipeForm() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _hideAddRecipeForm() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new addRecipeView();
