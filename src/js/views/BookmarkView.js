import { view } from './view';
import icons from 'url:../../img/icons.svg';
import Previewview from './Previewview';

class bookmarkview extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks Yet. Find a good recipe and bookmark it !';

  renderBookmarkHandler(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => Previewview.render(bookmark, false))
      .join(' ');
  }
}

export default new bookmarkview();
