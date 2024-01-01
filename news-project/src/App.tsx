import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./routes";
import { Provider } from 'react-redux';
import store from "./reduxTol0kit/store";
const routes = createBrowserRouter(ROUTES);


function App() {
  return (
    <>
    <Provider store={store}>
        <RouterProvider router={routes} />
    </Provider>
    </>
  );
}

export default App;
