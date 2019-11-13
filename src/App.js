import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import Home from './Home';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books});
    });
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getAllBooks();
  }

  shouldComponentUpdate(newProps, newState) {
    return true;
  }

  changeShelf = (book, shelf) => {
    /* First update books in database */
    BooksAPI.update(book, shelf).then(() => {
      /* now update in local book list, or add to it */
      const tempCopy = [...this.state.books];
      const index = tempCopy.findIndex((b) => b.id === book.id);
      if (index === -1) {
        /* book not found, add to books array */
        book.shelf = shelf;
        tempCopy.push(book);
      }
      else {  /* already in books, change shelf and move to end */
        tempCopy[index].shelf = shelf;
        tempCopy.push(tempCopy.splice(index, 1)[0]);
      }
      /* update books list */
      this.setState({books: tempCopy});
    });
  }

  render() {
    return (
      <BrowserRouter>
      <div className="app">
        <Route exact={true} path="/" 
          render={() => 
            <Home 
              books={this.state.books} 
              changeShelf={this.changeShelf}/>
          }/>
        <Route path="/search" 
          render={() => 
            <Search  
              books={this.state.books}
              changeShelf={this.changeShelf}/>
          }/>
      </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
