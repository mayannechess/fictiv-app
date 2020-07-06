import React from "react";
import axios from "axios";
import $ from "jquery";

import { fixLineBreaks, separateDashes } from "../utils.js";

class CenterQuote extends React.Component {
  constructor(props) {
    super(props);

  }

  onFocus(event) {
    $(event.target).css("color", "#0d4b75");
    $(event.target).animate({top: "-5%", left: "-5%", fontSize: "1.1em"});
  }

  onUnfocus(event) {
    $(event.target).css("color", "#106EAC");
    $(event.target).animate({top: "0", left: "0", fontSize: "1em"});
  }

  onClick(event) {
    let focus = event.target.innerHTML.replace(/\?|\,|\.|\;|\:|\!/g, "").toLowerCase();
    this.props.search(focus);
  }

  linkOut() {
    let pub = this.props.quote.publication.split(" ").join("+");
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${pub}`)
      .then(({data}) => {
        let link = `http://books.google.com/books?id=${data.items[0].id}`;
        window.open(link, "bookWindowName");
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  render() {
    let text = fixLineBreaks(this.props.quote.content);
    text = separateDashes(text);
    let words = text.split(" ");

    return(
      <div className="center-panel">
        <div className="center-content">{
          words.map((word, idx) => {
            return <div key={idx}>{word}
              <span
                onMouseOver={this.onFocus.bind(this)}
                onClick={this.onClick.bind(this)}
                onMouseLeave={this.onUnfocus.bind(this)}
              >
                {word}
              </span>
            </div>
          })
        }</div>
        <div className="center-section">{this.props.quote.author}</div>
        {this.props.quote.publication
          ? <div className="center-section" onClick={this.linkOut.bind(this)}><em>{this.props.quote.publication}</em></div>
          : null}
      </div>
    );
  }

}

export default CenterQuote;