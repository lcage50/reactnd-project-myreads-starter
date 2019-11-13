import React, { Component } from 'react';
import { Link } from "react-router-dom";
import debounce from 'lodash/debounce';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import Book from './Book';

class Search extends Component {

  state = {
    searchBooks: [],
    query: ''
  }

  componentWillUnmount() {
    this.setState({
      searchBooks: [], 
      query: ''
    });
  }

  searchHdlr = 
    debounce((query) => {  
      if (query) {
        BooksAPI.search(query).then((books) => {
          /* Look in my book list for current shelf since search didn't
             return it to me. */
          if (books.length > 0) {
            books.forEach((book, index) => {
              const bookInMyList = this.props.books.find((b) => b.id === book.id);
              book.shelf = bookInMyList ? bookInMyList.shelf : 'none';
              books[index] = book;
            });
            this.setState({ 
              searchBooks: books, 
              query: query 
            });
          }
          else {  /* no search results for this query */
             this.setState({ 
               searchBooks: [], 
               query: query 
            });
          }
        })
      }
      else {  /* null query */
        this.setState ({ 
          searchBooks: [], 
          query: ''
        });
      }
    }
    , 500);

  removeHdlr = (book) => {
    let tempCopy = this.state.searchBooks.filter(b => b.id !== book.id);
    this.setState({
      searchBooks: tempCopy});
  }

  render () {
    console.log(this.state.searchBooks);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
             onChange={(event)=>{this.searchHdlr(event.target.value)}}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.searchBooks.length > 0 ? 
                this.state.searchBooks.map((b) => 
                  { return <Book book={b} key={b.id} 
                            changeHdlr={this.props.changeShelf}
                            removeHdlr={this.removeHdlr}/> })
                : this.state.query ? <p>No search results found</p> : null
            }
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  changeShelf: PropTypes.func.isRequired,
}

export default Search;