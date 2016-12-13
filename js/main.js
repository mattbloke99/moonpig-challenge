'use strict'

import getBooks from './GoogleApi';
import { truncate, isEmpty } from  './utils/utils';
import styles from '../css/styles.css'

let list = document.querySelector ('.js-book-list');

// Set up formatting callback function for map call below
let format = ( book ) => {
  return (
    `<li>
      <div class="inner">
  		  <div class="li-img">
  			  <img src="${book.thumbnail}" alt="${book.title} thumnail image" />
  			</div>
  			<div class="li-text">
  			  <h4 class="li-title">${book.title}</h4>
          <p class="li-authors">${isEmpty(book.authors) ? '' : book.authors}</p>
  				<p class="li-desc">${truncate(book.description, 200)}</p>
  			</div>
  		</div>
  	</li>`);
};

// Get books and format response
getBooks('javascript').then((books) => {
  list.innerHTML = books.map( format ).join('');
});
