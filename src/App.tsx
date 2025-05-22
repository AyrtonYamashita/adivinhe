import styles from "./app.module.css";

import { useEffect, useState } from "react";
import { WORDS, Challenge } from "./utils/words";
import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed, LetterUsedProps } from "./components/LettersUsed";

function App() {
  const [attempts, setAttempts] = useState(0);
  const [letter, setLetter] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [letterUsed, setletterUsed] = useState<LetterUsedProps[]>([]);

  function handleRestartGame() {
    alert("Reiniciar o jogo!");
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallenge(randomWord);
    setAttempts(0);
    setLetter("");
  }

  useEffect(() => {
    startGame();
  }, []);

  if (!challenge) return;

  return (
    <div className={styles.container}>
      <main>
        <Header current={attempts} max={10} onRestart={handleRestartGame} />
        <Tip tip={challenge.tip} />
        <div className={styles.words}>
          {challenge.word.split("").map(() => (
            <Letter />
          ))}
        </div>

        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder="?" />
          <Button title="Confirmar" />
        </div>

        <LettersUsed data={letterUsed} />
      </main>
    </div>
  );
}

export default App;
