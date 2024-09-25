import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/login";
import "./App.css";
import Register from "./components/register/Register";
import Setting from "./components/dashboard/Setting";
import Home from "./components/dashboard/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Invoices from "./components/dashboard/Invoices";
import NewInvoice from "./components/dashboard/NewInvoice";

function App() {
  const myRouter = createBrowserRouter([
    // Redirect root path to login
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        // Set default dashboard route to "home"
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "invoices", element: <Invoices /> },
        { path: "new-invoice", element: <NewInvoice /> },
        { path: "setting", element: <Setting /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;
