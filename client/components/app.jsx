import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hello: true
    };

  }

  render() {
    return(
      <div>Hello world</div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("app"));