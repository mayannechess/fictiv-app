import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

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

    // this.setStateAsync = function(state) {
    //   return new Promise((resolve) => {
    //     this.setState(state, resolve);
    //   });
    // }

  }

  handleTerm(event) {
    this.setState({
      term: event.target.value
    });
  }

  search() {
    this.setState({
      hidden: true
    });

    setTimeout(() => {
      axios.get(`/quotes/${this.state.term}`)
        .then(({data}) => {
          let len = data.length;
          this.setState({
            term: "",
            quotes: data,
            leftIndex: len - 1,
            rightIndex: 1,
            hidden: false
          });
        })
        .catch((err) => {
          console.log("ERROR:", err);
        });
    }, 500);
  }

  render() {
    return(
      <div>
        <h1>Fictiv</h1>
        <input type="text" value={this.state.term} placeholder="search" onChange={this.handleTerm.bind(this)} />
        <button onClick={this.search.bind(this)}>Go</button>
        {this.state.quotes.length > 0
          ? <div id="quotes-marquee" className={this.state.hidden ? "hidden" : null}>
            {this.state.leftIndex !== 0 ? <Quote quote={this.state.quotes[this.state.leftIndex]} /> : null}
            <Quote quote={this.state.quotes[this.state.centerIndex]} />
            {this.state.quotes[this.state.rightIndex] ? <Quote quote={this.state.quotes[this.state.rightIndex]} />: null}
          </div>
          : <div id="quotes-marquee" className={this.state.hidden ? "hidden" : null}>
            <Quote quote={defaultQuote} />
          </div>}
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("app"));