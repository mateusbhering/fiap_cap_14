import React from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import App from "./App"
import Login from "./pages/Login"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import UsersList from "./pages/users/UsersList"
import UserForm from "./pages/users/UserForm"
import AccountsList from "./pages/accounts/AccountsList"
import AccountForm from "./pages/accounts/AccountForm"
import TransactionsList from "./pages/transactions/TransactionsList"
import TransactionForm from "./pages/transactions/TransactionForm"

function Private({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth()
  return isAuth ? (children as React.ReactElement) : <Navigate to="/login" replace />
}

export const routerDef = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <Private>
        <App />
      </Private>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "users", element: <UsersList /> },
      { path: "users/new", element: <UserForm /> },
      { path: "users/:id", element: <UserForm /> },
      { path: "accounts", element: <AccountsList /> },
      { path: "accounts/new", element: <AccountForm /> },
      { path: "accounts/:id", element: <AccountForm /> },
      { path: "transactions", element: <TransactionsList /> },
      { path: "transactions/new", element: <TransactionForm /> },
      { path: "transactions/:id", element: <TransactionForm /> }
    ]
  },
  { path: "*", element: <NotFound /> }
])
