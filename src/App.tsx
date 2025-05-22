import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import styles from "./app.module.css";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";

function App() {
  function handleRestartGame() {
    alert("Reiniciar o jogo!");
  }
  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame} />
        <Tip tip="Uma das linguagens de programação mais utilizadas" />
        <div className={styles.words}>
          <Letter value="R" />
          <Letter value="E" />
          <Letter value="A" />
          <Letter value="C" />
          <Letter value="T" />
        </div>

        <h4>Palpite</h4>
        <div>
          <Input autoFocus maxLength={1} placeholder="?"/>
        </div>
      </main>
    </div>
  );
}

export default App;
