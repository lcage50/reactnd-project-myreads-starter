import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import './App.css';

const ShelfName = [
  {
    shelf: 'currentlyReading',
    header: "Currently Reading",
  },
  {
    shelf: 'wantToRead',
    header: "Want to Read",
  },
  {
    shelf: 'read',
    header: "Read"
  },
];

const BookShelf = ({ books, shelf, changeHdlr }) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {ShelfName.filter((s) => s.shelf === shelf)[0].header}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
	        { books.filter(b => 
            { return b.shelf === shelf })
            .map(b => 
              { return <Book book={b} key={b.id} changeHdlr={changeHdlr}/> })
          }
	      </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes= {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  changeHdlr: PropTypes.func.isRequired
}

export default BookShelf;
