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
  const [letter, setLetter] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [lettersUsed, setLettersUsed] = useState<LetterUsedProps[]>([]);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);

  const ATTEMPT_MARGIN = 5;

  function handleRestartGame() {
    const isConfirmed = confirm(
      "Você tem certeza que deseja reiniciar o jogo?"
    );
    if (isConfirmed) startGame();
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite uma letra!");
    }

    const value = letter.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value
    );

    if (exists) {
      alert(`Você já utilizou a letra: ${value}`);
      setLetter("");
      return;
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct }]);
    setScore(currentScore);
    setLetter("");

    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallenge(randomWord);
    setScore(0);
    setLetter("");
    setLettersUsed([]);
  }

  function endGame(message: string) {
    alert(message);
    startGame();
    return;
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challenge) return;
    setTimeout(() => {
      if (score === challenge.word.length) {
        endGame(`Parabéns você descobriu a palavra: ${challenge.word}`);
        return;
      }
      const ATTEMPT_LIMIT = challenge.word.length + ATTEMPT_MARGIN;
      if (lettersUsed.length === ATTEMPT_LIMIT) {
        return endGame(`Que pena, você usou todas suas tentativas.`);
      }
    }, 200);
  }, [score, lettersUsed.length]);

  if (!challenge) return;

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPT_MARGIN}
          onRestart={handleRestartGame}
        />
        <Tip tip={challenge.tip} />
        <div className={`${styles.words} ${shake && styles.shake}`}>
          {challenge.word.split("").map((letter, index) => {
            const lUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase()
            );

            return (
              <Letter
                key={index}
                value={lUsed?.value}
                color={lUsed?.correct ? "correct" : "default"}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleConfirm();
              }
            }}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}

export default App;
