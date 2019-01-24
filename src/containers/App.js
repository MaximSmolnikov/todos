import { connect } from "react-redux";
import App from "../components/App";
import { fetchTodos } from "../actions";

export default connect(
  null,
  { fetchTodos }
)(App);
