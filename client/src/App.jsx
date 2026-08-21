import { AppProvider } from "./context/AppContext";
import AppRoute from "./route/approute";

function App() {
  return (
    <AppProvider>
      <AppRoute />
    </AppProvider>
  );
}

export default App;
