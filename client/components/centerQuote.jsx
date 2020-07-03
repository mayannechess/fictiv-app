import React from "react";

class CenterQuote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      reader: false
    }
  }

  render() {
    return(
      <div className="center-panel">
        <div className="center-content">{this.props.quote.content}</div>
        <div className="center-section">{this.props.quote.author}</div>
        <div className="center-section"><em>{this.props.quote.publication}</em></div>
      </div>
    );
  }

}

export default CenterQuote;