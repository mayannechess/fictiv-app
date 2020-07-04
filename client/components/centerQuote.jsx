import React from "react";
import $ from "jquery";

import { fixLineBreaks, separateDashes } from "../utils.js";

class CenterQuote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: "",
    }
  }

  onFocus(event) {
    let focus = event.target.innerHTML.replace(/\?|\,|\.|\;|\:|\!/g, "").toLowerCase();
    $(event.target).css("color", "#0d4b75");
    $(event.target).animate({top: "-5%", left: "-5%", fontSize: "1.1em"});
    this.setState({
      focus: focus
    });
  }

  onUnfocus(event) {
    $(event.target).css("color", "#106EAC");
    $(event.target).animate({top: "0", left: "0", fontSize: "1em"});
    this.setState({
      focus: ""
    });
  }

  onClick() {
    this.props.search(this.state.focus);
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
                key={idx}>{word}
              </span>
            </div>
          })
        }</div>
        <div className="center-section">{this.props.quote.author}</div>
        <div className="center-section"><em>{this.props.quote.publication}</em></div>
      </div>
    );
  }

}

export default CenterQuote;