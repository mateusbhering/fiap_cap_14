import "./styles.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { routerDef } from "./router"
import { AuthProvider } from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routerDef} />
    </AuthProvider>
  </React.StrictMode>
)
