import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {store} from './store/index.store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Admin from './Admin'

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Admin/>,
  },
  {
    path: "/",
    element: <App/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider
          router={router}
        />
      </Provider>
  </React.StrictMode>,
)
