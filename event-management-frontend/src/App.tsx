import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { EventsDataTableList, HomePage, MyContentPage, MyEventsPage } from "./pages";
import { themeSettings } from "./themes/themes";

function App() {
  //inicializar mode 
  const mode = useSelector((state: any) => state.mode);
  
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state: any) => state.token))

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mycontent" element={<MyContentPage />} />
            <Route path="/myevents" element={isAuth ? <MyEventsPage /> : <Navigate to="/" />} />
            <Route path="/eventslist" element={isAuth ? <EventsDataTableList /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;