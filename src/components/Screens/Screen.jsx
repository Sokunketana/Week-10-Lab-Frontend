import Display from "./Display";

function Screen({ type, onRestart }) {
  if (!type) {
    return null;
  }

  return (
    <section id="container">
      <Display type={type} onRestart={onRestart} />
    </section>
  );
}

export default Screen;
