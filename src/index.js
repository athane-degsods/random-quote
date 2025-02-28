import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';



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
      <div>
        <h1>Hello</h1>
        <div className="container" id="quote-box">
          <div className="quote" id="text">{this.state.quote}</div>
          <div className="author" id="author">{this.state.author}</div>
          <div className="buttons">
          <a href={this.getXPostUrl()}><button id="tweet-quote" target="top">Twitter</button></a>
          <button id="tumblr">Tumblr</button>
          <button id="new-quote" onClick={this.handleClick} >New Quote</button>
          </div>
          <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
        </div>
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