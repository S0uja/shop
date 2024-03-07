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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  // {
  //   path: '*',
  //   element: <Navigate to="/" replace />,
  // }
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
