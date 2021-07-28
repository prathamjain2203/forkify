import { view } from './view';

class Searchresults extends view {
  _parentElement = document.querySelector('.search');
  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }

  addSearchHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  clear() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new Searchresults();
