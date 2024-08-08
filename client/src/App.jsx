
import './App.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.jsx'
import ProductCollections from './pages/ProductCollection/ProductCollections';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import CheckOut from './pages/CheckOut/CheckOut';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Wishlist from './pages/Wishlist/Wishlist';
import Contact from './pages/Contact/Contact';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }, {
      path: "/products",
      element: <ProductCollections />
    }, {
      path: "/products/:productId",
      element: <Product />
    },
    {
      path: "/cart",
      element: <Cart />
    },
    {
      path: "/checkout",
      element: <CheckOut />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/wishlist",
      element: <Wishlist />
    },
    {
      path: "/contact",
      element: <Contact />
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
