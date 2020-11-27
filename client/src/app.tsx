import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./app.scss";
import { MainPage } from "./page";

export const App = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainPage} />
    </Switch>
  </BrowserRouter>
);
