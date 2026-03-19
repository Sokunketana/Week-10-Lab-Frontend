import Container from "./Container.jsx";

function MonsterContainer({ monster, health }) {
  return <Container type={monster} health={health} />;
}

export default MonsterContainer;
