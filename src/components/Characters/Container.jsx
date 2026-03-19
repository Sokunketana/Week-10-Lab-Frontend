function Container({ type, health }) {
  const safeHealth = Math.max(health, 0);

  return (
    <section className="container">
      <h2>{type} Health</h2>
      <div className="healthbar">
        <div style={{ width: `${safeHealth}%` }} className="healthbar__value"></div>
      </div>
    </section>
  );
}

export default Container;
