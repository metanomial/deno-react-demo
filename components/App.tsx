import React from "react";
import { Link, RouteObject, useRoutes } from "react-router-dom";
import { Home } from "./Home.tsx";
import { About } from "./About.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
];

export function App() {
  return (
    <>
      <nav>
        <menu>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </menu>
      </nav>
      {useRoutes(routes)}
    </>
  );
}
