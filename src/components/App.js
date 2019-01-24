import React, { Component } from "react";
import Header from "../containers/Header";
import MainSection from "../containers/MainSection";

class App extends Component {
  componentWillMount() {
    this.props.fetchTodos();
  }
  render() {
    return (
      <div>
        <Header />
        <MainSection />
      </div>
    );
  }
}

export default App;
