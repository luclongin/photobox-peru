import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AdminPage from './components/adminPage/adminPage.component';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ErrorPage from './errorPage';
import store from './store/store';
import { Provider } from 'react-redux';
import OrderFeedbackCard from './components/orderFeedback/orderFeedbackCard.component';
import OrderFeedbackYape from './components/orderFeedback/orderFeedbackYape.component';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/kat",
    element: <AdminPage />,
  },
  {
    path: "/gracias",
    element: <OrderFeedbackCard />,
  },
  {
    path: "/yape",
    element: <OrderFeedbackYape />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
