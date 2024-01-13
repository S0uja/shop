import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import store from "./store/store.js";
import MainPage from './pages/Main.page.jsx'


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
)
