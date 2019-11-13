import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShelfChanger extends Component {
  
  changeShelf = (event) => {
    this.props.changeHdlr(this.props.book, event.target.value);
    /*
    if (this.props.removeHdlr) {
      this.props.removeHdlr(this.props.book);
    }
    */
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={this.changeShelf} value={this.props.book.shelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none" default>None</option>
        </select>
      </div>
    )
  }
}

ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  changeHdlr: PropTypes.func.isRequired,
  removeHdlr: PropTypes.func
}

export default ShelfChanger;