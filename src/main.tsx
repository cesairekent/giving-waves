import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import DonationList from "./app/donation/components/DonationList.tsx";
import DonationForm from "./app/donation/components/DonationForm.tsx";
import DonationCelebrate from "./app/donation/components/DonationCelebrate.tsx";
import store from "./app/store.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,

    }, {
      path: "/donation",
      element: <DonationList />,
    },
    {
      path: "/donation-form",
      element: <DonationForm />,
    },
    {
      path: "/donation-celebrate",
      element: <DonationCelebrate />,
    },
  ]);

  const rootElement = document.getElementById("root");
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </React.StrictMode>
    );
  }
