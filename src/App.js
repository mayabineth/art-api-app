import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Painting from "./SinglePainting";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/paintings/:id" children={<Painting />} />
    </Switch>
  );
}
export default App;
