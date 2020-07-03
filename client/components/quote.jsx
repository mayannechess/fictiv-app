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
        <div>{this.props.quote.content}</div>
        <div>{this.props.quote.author}</div>
        <div>{this.props.quote.publication}</div>
      </div>
    );
  }

}

export default Quote;