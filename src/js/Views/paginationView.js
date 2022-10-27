import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addhandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generataMarkupButton(curPage, 'next');
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return this._generataMarkupButton(curPage, 'prev');
    }
    //Other pages
    if (curPage < numPages) {
      return [
        this._generataMarkupButton(curPage, 'prev'),
        this._generataMarkupButton(curPage, 'next'),
      ].join('');
    }

    //Page 1 and there are NO other pages
    return ``;
  }
  _generataMarkupButton(curPage, direction) {
    return `
          <button data-goto="${
            direction == 'next' ? curPage + 1 : curPage - 1
          }" class="btn--inline pagination__btn--${
      direction == 'next' ? 'next' : 'prev'
    }">
            <span>Page ${direction == 'next' ? curPage + 1 : curPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      direction == 'next' ? 'right' : 'left'
    }"></use>
            </svg>
          </button>`;
  }
}

export default new PaginationView();
