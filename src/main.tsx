import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import { Provider } from "react-redux";
import store from "./store";
import Leaderboard from "./components/Leaderboard.tsx";
import GameBoard from "./components/GameBoard.tsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/auth" element={<Auth />} />
      <Route path="/game" element={<GameBoard />} />
      <Route path="/leader-board" element={<Leaderboard />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
