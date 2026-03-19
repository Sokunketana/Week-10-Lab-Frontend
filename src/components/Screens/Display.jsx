function Display({ type, onRestart }) {
  const normalizedType = type?.toLowerCase();
  const isWin = normalizedType === "won" || normalizedType === "win";
  const resultMessage = isWin ? "You Won!" : "You Lost!";

  return (
    <section className={`container result-screen ${isWin ? "result-screen--win" : "result-screen--lose"}`}>
      <h2>Game Over!</h2>
      <h3>{resultMessage}</h3>
      <button onClick={onRestart}>Start New Game</button>
    </section>
  );
}

export default Display;
