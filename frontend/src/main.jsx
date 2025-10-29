import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "../context/authContext.jsx";
import { ProtectedPage } from "../components/ProtectedPage.jsx";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "../pages/login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <AuthProvider>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedPage>
                <App />
              </ProtectedPage>
            }
          />
      </Routes>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
