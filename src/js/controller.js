import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import BookmarkView from './views/BookmarkView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeViews.js';
import Resultview from './views/Resultview.js';
import searchView from './views/Searchview.js';
import addRecipeView from './views/addRecipeView.js';
import { CLOSE_FORM_TIME } from './config.js';

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Loading Spinner
    recipeView.renderSpinner();

    // Updating Results View to the mark selected result
    Resultview.update(model.loadResultPerPage());

    // Updating Bookmark View to the mark selected result

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
    BookmarkView.update(model.state.bookmark);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    Resultview.renderSpinner();

    // 1. Get Search Query
    const query = searchView.getQuery();
    if (!query) return;
    searchView.clear();

    // 2. Load Search Query
    await model.loadSearchResults(query);

    // 3. Render Search Query
    Resultview.render(model.loadResultPerPage());

    paginationView.render(model.state.search);
  } catch (err) {}
};
const controlPagination = function (goToPage) {
  Resultview.render(model.loadResultPerPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.render(model.state.recipe);
  BookmarkView.render(model.state.bookmark);
};

const controlBookmark = function () {
  BookmarkView.render(model.state.bookmark);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    //Render Spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render Bookmark View
    BookmarkView.render(model.state.bookmark);

    // Change id in Url
    window.history.pushState(null, '', model.state.recipe.id);

    // Close Form Window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_FORM_TIME);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addClickHandler(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  BookmarkView.renderBookmarkHandler(controlBookmark);
  addRecipeView.addUploadHandler(controlUploadRecipe);
};
init();
