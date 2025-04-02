// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "../index.css";
// import Header from "./components/Header";
// import Home from "./components/Home";

// const App = () => {
//     return (
//         <Router>
//             <div className="app">
//                 <Header />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

// export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // This file includes your Tailwind imports
import Navbar from "./components/shared/Navbar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Navbar /> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
