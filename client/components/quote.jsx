import React from "react";

import { fixLineBreaks, separateDashes } from "../utils.js";

const Quote = ({quote}) => {
  let text = fixLineBreaks(quote.content);
  text = separateDashes(text);
  return(
    <div className="quote-panel">
      <div className="quote-section">{text}</div>
      <div className="quote-section">{quote.author}</div>
      <div className="quote-section"><em>{quote.publication}</em></div>
    </div>
  );
}

export default Quote;