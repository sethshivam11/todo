import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider storageKey="todo-app-theme">
      <Toaster position="bottom-center" />
      <Routes>
        <Route
          element={
              <HomePage />
          }
          path="/"
        />
        <Route element={<ProfilePage />} path="/profile" />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
