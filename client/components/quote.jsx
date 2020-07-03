import React from "react";

const Quote = ({quote}) => {
  return(
    <div className="quote-panel">
      <div className="quote-section">{quote.content}</div>
      <div className="quote-section">{quote.author}</div>
      <div className="quote-section"><em>{quote.publication}</em></div>
    </div>
  );
}

export default Quote;