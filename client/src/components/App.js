import React from "react";
import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
/*
export const PageOne = () => {
    return (<div>
        PageOne
        <Link to="/pageTwo"> Navigate to Page 2</Link>
        </div>);
}
export const PageTwo = () => {
    return (<div>
        PageTwo
        <Link to="/"> Navigate to Page 1</Link>
        </div>);
}*/
export default App;
