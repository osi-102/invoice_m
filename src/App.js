import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const myRouter = createBrowserRouter([
    { path: "", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);

  return (
    <div>
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;
