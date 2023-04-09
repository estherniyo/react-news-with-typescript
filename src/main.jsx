import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { publishersSlice } from "./features/publisherSlice";
import { articlesSlice } from "./features/newsSlice";
import News from "./components/NewsApp";

const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
    publishers: publishersSlice.reducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <News />
    </Provider>
  </React.StrictMode>
);
