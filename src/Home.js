import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';
import './App.css'

const Home = ({ books, changeShelf }) => {
  
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
		        <BookShelf books={books} shelf="currentlyReading" changeHdlr={changeShelf}/>
		        <BookShelf books={books} shelf="wantToRead" changeHdlr={changeShelf} />
		        <BookShelf books={books} shelf="read" changeHdlr={changeShelf}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
}

Home.propTypes= {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default Home;