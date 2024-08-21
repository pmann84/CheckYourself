import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BaseThemeProvider } from "./BaseThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BaseThemeProvider>
            <App />
        </BaseThemeProvider>
    </StrictMode>
);
