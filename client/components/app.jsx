import React from "react";
import ReactDOM from "react-dom";

import Quote from "./quote.jsx";

const defaultQuote = {
  author: "G.K. Chesterson",
  publication: null,
  content: "Literature is a luxury; fiction is a necessity."
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      quotes: [],
      leftIndex: 0,
      centerIndex: 0,
      rightIndex: 0,
      hidden: false
    };

  }

  handleTerm(event) {
    this.setState({
      term: event.target.value
    });
  }

  render() {
    return(
      <div>
        <h1>Fictiv</h1>
        <input type="text" value={this.state.term} placeholder="search" onChange={this.handleTerm} />
        <button onClick={this.search}>Go</button>
        <div id="quotes-marquee">
          {this.state.quotes.length > 0
            ? <>
              <Quote className="quote-component" quote={this.state.quotes[leftIndex]} />
              <Quote className="quote-component" quote={this.state.quotes[centerIndex]} />
              <Quote className="quote-component" quote={this.state.quotes[rightIndex]} />
            </>
            : <Quote className="quote-component" quote={defaultQuote} />}
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("app"));