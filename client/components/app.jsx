import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Quote from "./quote.jsx";
import CenterQuote from "./centerQuote.jsx"

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
      suggestion: "",
      quotes: [],
      leftIndex: -1,
      centerIndex: 0,
      rightIndex: 1,
      hidden: false,
      init: true
    };

  }

  pageRight() {
    this.setState({
      hidden: true
    });
    setTimeout(() => {
      let newLeft = this.state.leftIndex + 1 >= this.state.quotes.length ? 0 : this.state.leftIndex + 1;
      let newCenter = this.state.centerIndex + 1 >= this.state.quotes.length ? 0 : this.state.centerIndex + 1;
      let newRight = this.state.rightIndex + 1 >= this.state.quotes.length ? 0 : this.state.rightIndex + 1;
      this.setState({
        leftIndex: newLeft,
        centerIndex: newCenter,
        rightIndex: newRight,
        hidden: false
      });
    }, 500);
  }

  pageLeft() {
    this.setState({
      hidden: true
    });

    setTimeout(() => {
      let newLeft = this.state.leftIndex - 1 < 0 ? this.state.quotes.length - 1 : this.state.leftIndex - 1;
      let newCenter = this.state.centerIndex - 1 < 0 ? this.state.quotes.length - 1 : this.state.centerIndex - 1;
      let newRight = this.state.rightIndex - 1 < 0 ? this.state.quotes.length - 1 : this.state.rightIndex - 1;
      this.setState({
        leftIndex: newLeft,
        centerIndex: newCenter,
        rightIndex: newRight,
        hidden: false
      });
    }, 500);
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  search(term) {
    this.setState({
      hidden: true
    });

    setTimeout(() => {
      axios.get(`/quotes/${term}`)
        .then(({data}) => {
          let len = data.length;
          this.setState({
            term: term,
            quotes: data,
            leftIndex: len - 1 || -1,
            centerIndex: 0,
            rightIndex: 1,
            hidden: false,
            init: false
          });
        })
        .catch((err) => {
          console.log("ERROR:", err);
        });
    }, 500);
  }

  suggest() {
    axios.post("/suggest", {
      author: this.state.suggestion
    })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      suggestion: "Thanks!"
    });
  }

  clickIn(event) {
    this.setState({
      [event.target.name]: ""
    });
  }

  render() {
    return(
      <div>
        <div id="suggest">
          Suggest an author: <input
          type="text"
          name="suggestion"
          value={this.state.suggestion}
          onClick={this.clickIn.bind(this)}
          onChange={this.handleInput.bind(this)} />
          <img src="./assets/submit.png" alt="submit" id="submit-icon" onClick={this.suggest.bind(this)} />
        </div>
        <h1>Fictiv</h1>
        <input
          type="text"
          name="term"
          value={this.state.term}
          placeholder="search"
          onClick={this.clickIn.bind(this)}
          onChange={this.handleInput.bind(this)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.search.bind(this)(this.state.term);
            }
          }} />
        <img src="./assets/search-icon.svg" alt="search" id="search-icon" onClick={() => this.search.bind(this)(this.state.term)} />
        <div className="mask-left"></div>
        <div className="mask-right"></div>
        {this.state.init
          ? <div id="quotes-marquee" className={this.state.hidden ? "hidden" : null}>
            <CenterQuote quote={defaultQuote} search={this.search.bind(this)} />
          </div>
          : this.state.quotes.length > 0
            ? <div id="quotes-marquee" className={this.state.hidden ? "hidden" : null}>
              {this.state.quotes.length > 1 ? <img src="./assets/back.svg" className="arrow" onClick={this.pageLeft.bind(this)} /> : null}
              {this.state.quotes[this.state.leftIndex] ? <Quote quote={this.state.quotes[this.state.leftIndex]} /> : null}
              <CenterQuote quote={this.state.quotes[this.state.centerIndex]} search={this.search.bind(this)} />
              {this.state.quotes[this.state.rightIndex] ? <Quote quote={this.state.quotes[this.state.rightIndex]} />: null}
              {this.state.quotes.length > 1 ? <img src="./assets/forward.svg" className="arrow" onClick={this.pageRight.bind(this)} /> : null}
            </div>
            : <div id="quotes-marquee" className={this.state.hidden ? "hidden" : null}>
              <h3>No results found.</h3>
            </div>}
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("app"));