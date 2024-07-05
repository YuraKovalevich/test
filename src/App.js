import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import styles from './styles/App.module.css'

function App() {
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
        </div>

    );
}

export default App;
