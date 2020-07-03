import React from "react";

class Quote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      reader: false
    }
  }

  render() {
    return(
      <div className="quote-panel">
        <div className="quote-section">{this.props.quote.content}</div>
        <div className="quote-section">{this.props.quote.author}</div>
        <div className="quote-section"><em>{this.props.quote.publication}</em></div>
      </div>
    );
  }

}

export default Quote;