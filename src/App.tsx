import { SnackbarProvider } from "notistack";
import MessageButtons from "./MessageButtons";

function App() {
  return (
    <div>
      <SnackbarProvider>
        <MessageButtons />
      </SnackbarProvider>
    </div>
  );
}

export default App;
