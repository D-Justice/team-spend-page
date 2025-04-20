import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import 'antd/dist/antd.min.css';

import Router from "./router";
import { AuthProvider } from "./contexts/authContext";
const App = () => (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
