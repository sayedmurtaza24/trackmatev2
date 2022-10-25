import { Provider } from "react-redux";
import Navigation from "./pages/Navigation";
import store from "./state/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}