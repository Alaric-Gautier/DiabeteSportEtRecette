import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/style.scss";
import { AuthProvider, UserProvider } from "./utils/context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<UserProvider>
				<App />
				<ToastContainer position="top-right" />
			</UserProvider>
		</AuthProvider>
	</React.StrictMode>,
)
