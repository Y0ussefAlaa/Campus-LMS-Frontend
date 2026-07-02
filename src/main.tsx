import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ThemedToaster from "./Components/ui/ThemedToaster";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";
import { QuizProvider } from "./context/QuizContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <QuizProvider>
              <App />
            </QuizProvider>
          </AuthProvider>
          <ThemedToaster />
        </QueryClientProvider>
      </Router>
    </ThemeProvider>
  </StrictMode>,
);
