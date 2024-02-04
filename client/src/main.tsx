import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TodoContextProvider } from "./context/TodoContextProvider.tsx";
import UserContextProvider from "./context/UserContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
      <TodoContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </TodoContextProvider>
  </BrowserRouter>
);
