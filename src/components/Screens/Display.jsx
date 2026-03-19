function Display({ type, onRestart }) {
  const normalizedType = type?.toLowerCase();
  const isDraw = normalizedType === "draw";
  const isWin = normalizedType === "won" || normalizedType === "win";
  const screenTitle = isDraw ? "It's a Draw!" : "Game Over!";
  const resultMessage = isDraw
    ? "Both fighters went down."
    : isWin
      ? "You Won!"
      : "You Lost!";

  return (
    <section className={`container result-screen ${isDraw ? "result-screen--draw" : isWin ? "result-screen--win" : "result-screen--lose"}`}>
      <h2>{screenTitle}</h2>
      <h3>{resultMessage}</h3>
      <button onClick={onRestart}>Start New Game</button>
    </section>
  );
}

export default Display;
