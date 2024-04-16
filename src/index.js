import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import routes from "./router.js"
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </Provider>
);