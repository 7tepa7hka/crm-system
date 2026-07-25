import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Login } from "../pages/Login/Login";
import { MainLayout } from "../layout/MainLayout/MainLayout";
import { Home } from "../pages/Home/Home";
import { Users } from "../pages/Users/Users";
import { Lessons } from "../pages/Lessons/Lessons";
import { Statistics } from "../pages/Statistics/Statistics";
import { Settings } from "../pages/Settings/Settings";
import { Contacts } from "../pages/Contacts/Contacts";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
