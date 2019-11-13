class NameForm extends React.Component {
  constructor() {
    super(props);
    this.state = {
      value: '',
      books: [
        { title: 'A war to end all peace',
          id: 5
        },
        { title: 'Two weddings and a funeral',
          id: 8
        },
        { title: 'Little Women',
          id: 9
        },
      ]
    }
  }        

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    console.log(this.state.books);
    var tempA = this.state.books.map((obj) => { obj.shelf = 'none' });
    console.log(tempA);
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);