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
import ManageOrder from './components/manageOrder/manageOrder.component';
import Order from './components/order/order.component';
import GiftCardFeedbackYape from './components/orderFeedback/giftCardFeedbackYape.component';
import DisplayGiftCard from './components/displayGiftCard/displayGiftCard.component';

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
  // normal photobox order bought with tarjeta
  {
    path: "/gracias",
    element: <OrderFeedbackCard />,
  },
  // normal photobox order bought with yape
  {
    path: "/yape",
    element: <OrderFeedbackYape />
  },
  // gift card bought with card
  {
    path: "/giftcard",
    element: <DisplayGiftCard />
  },
  // gift card bought with yape
  {
    path: "/yape/giftcard",
    element: <GiftCardFeedbackYape />
  },
  {
    path: "/pedido",
    element: <Order />
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
