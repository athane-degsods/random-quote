import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';




class WebComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: ' ',
      author: ' '
    }
    this.hasFetch = false;
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (!this.hasFetch) {
      this.fetchQuote();
      this.hasFetch = true;
    }
  }

  fetchQuote() {
    fetch("https://api.breakingbadquotes.xyz/v1/quotes")
      .then((res) => res.json())
      .then((data) => 
      {
        this.setState({
          quote: data[0].quote,
          author: data[0].author
        }) 
      })
      .catch((error) => console.error("Error fetching quote:", error));
  }

  getXPostUrl() {
    const { quote, author } = this.state;
    const text = `"${quote}" - ${author}`;  // Format the tweet
    const postUrl = `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
    return postUrl;
  }
  

  handleClick() {
    this.fetchQuote();
  }

  render() {
    return(
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg"  id="quote-box">
        <h1 className="text-center">Hello</h1>
          <blockquote  className="container" >
            <p className="mb-3" id="text">{this.state.quote}</p>
            <footer className="blockquote-footer"  id="author">{this.state.author}</footer>
          </blockquote >
            <div className="buttons">
            <a href={this.getXPostUrl()} target="_blank"><button id="tweet-quote" className="btn btn-primary">Twitter</button></a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://github.com/athane-degsods/random-quote.git")}&quote=${encodeURIComponent(this.state.quote + " - " + this.state.author)}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
            <button id="facebook" className="btn btn-primary">Facebook</button>
            </a>
            <button id="new-quote" className="btn btn-primary" onClick={this.handleClick} >New Quote</button>
            </div>
        </div>
      <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebComponent />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();