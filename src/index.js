import './styles/style.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from 'Components/app.jsx';


const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);