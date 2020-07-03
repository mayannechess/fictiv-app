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
      quotes: [],
      leftIndex: -1,
      centerIndex: 0,
      rightIndex: 1,
      hidden: false
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
        <img src="search-icon.svg" alt="search" id="search-icon" onClick={this.search.bind(this)} />
        <div className="mask-left"></div>
        <div className="mask-right"></div>
        {this.state.quotes.length > 0
          ? <div id="quotes-marquee" className={this.state.hidden ? "hidden" : null}>
            {this.state.quotes.length > 1 ? <img src="back.svg" className="arrow" onClick={this.pageLeft.bind(this)} /> : null}
            {this.state.quotes[this.state.leftIndex] ? <Quote quote={this.state.quotes[this.state.leftIndex]} /> : null}
            <CenterQuote quote={this.state.quotes[this.state.centerIndex]} />
            {this.state.quotes[this.state.rightIndex] ? <Quote quote={this.state.quotes[this.state.rightIndex]} />: null}
            {this.state.quotes.length > 1 ? <img src="forward.svg" className="arrow" onClick={this.pageRight.bind(this)} /> : null}
          </div>
          : <div id="quotes-marquee" className={this.state.hidden ? "hidden" : null}>
            <CenterQuote quote={defaultQuote} />
          </div>}
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("app"));