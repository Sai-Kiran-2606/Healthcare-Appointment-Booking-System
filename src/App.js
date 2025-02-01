import ReactDOM from "react-dom/client";
import "../index.css";

const App = () => {
    return(
        <div>
            <h1>React is working</h1>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

export default App;