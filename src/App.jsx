import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AppRouter } from "./router/AppRouter";
import { Loader } from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/theme.css";
import "./styles/global.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          {isLoading && <Loader onFinish={() => setIsLoading(false)} />}
          {!isLoading && <AppRouter />}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
