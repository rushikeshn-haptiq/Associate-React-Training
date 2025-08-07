import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Mainlayout from '../Layouts/Mainlayout'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Help from '../Pages/Help'
import Contact from '../Pages/Contact'
import Login from '../Features/Login'
import Sign from '../Features/Sign'
import Category from '../Pages/Category'
import Laptop from '../Pages/Products/Laptop'
import Clothes from '../Pages/Products/Clothes'
import Shoes from '../Pages/Products/Shoes'
import Watches from '../Pages/Products/Watches'
import Bags from '../Pages/Products/Bags'
import ProductDetails from '../Features/ProductDetails'
import ProtectedRoute from '../Features/ProdectedRoute'
import Dashboard from '../Pages/Dashboard'
import WishlistPage from '../Pages/WIshlistPage'

const Router = () => {
     const Router = createBrowserRouter([
    {
      path:"/",
      element:<Mainlayout/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
            path:"/about",
            element:<About/>
        },
        {
            path:"/help",
            element:<Help/>
        },
        {
            path:"/contact",
            element:<Contact/>
        },
        {
            path:"/sign",
            element:<Sign/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/categories",
            element:<Category/>
        },
        {
          path:"/laptop",
        element:<Laptop/>
        },
        {
          path:"/clothes",
        element:<Clothes/>
        },
        {
          path:"/shoes",
        element:<Shoes/>
        },
        {
          path:"/watches",
        element:<Watches/>
        },
        {
          path:"/bags",
        element:<Bags/>
        },
        {
          path:"/product/:id",
        element:<ProductDetails/>
        },
        {
          path:"/wishlist",
        element:<WishlistPage/>
        },
           {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          ),
        },
      ]
    },
    
   
  ])
  return (
      <RouterProvider router={Router}/>
  )
}

export default Router