import { render } from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";

import { App } from "./app";
import { theme } from "./theme";
import { store } from "./store";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  rootElement
);
