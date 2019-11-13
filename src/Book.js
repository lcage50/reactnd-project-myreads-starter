import React from 'react';
import ShelfChanger from './ShelfChanger.js';
import PropTypes from 'prop-types';
import './App.css'

const Book = ({ book, changeHdlr, removeHdlr }) => {

  const style = { width: 128, height: 193 };
  style.backgroundImage = (book.imageLinks && book.imageLinks.thumbnail) ? 
    `url(${book.imageLinks.thumbnail})` : "";
    
  return (
    <li>
       <div className="book">
         <div className="book-top">
           
             <div className="book-cover" style={style}></div>
             
           <ShelfChanger book={book} changeHdlr={changeHdlr} removeHdlr={removeHdlr}/>
        </div>
        <div className="book-title"> {book.title ? book.title : 'Title unavailable'} </div>
        <div className="book-authors"> {book.authors ? book.authors[0] : 'Author unavailable'} </div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeHdlr: PropTypes.func.isRequired,
  removeHdlr: PropTypes.func
}

export default Book;