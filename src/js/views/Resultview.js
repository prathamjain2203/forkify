import { view } from './view';
import icons from 'url:../../img/icons.svg';
import Previewview from './Previewview';

class resultsView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = "We couldn't find your query! Please try again.";

  _generateMarkup() {
    return this._data
      .map(result => Previewview.render(result, false))
      .join(' ');
  }
}

export default new resultsView();
