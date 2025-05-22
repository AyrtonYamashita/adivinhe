import { Header } from "./components/Header";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.container}>
      <main>
        <Header />
      </main>
    </div>
  );
}

export default App;
