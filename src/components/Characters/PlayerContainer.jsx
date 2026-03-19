import Container from "./Container.jsx";

function PlayerContainer({ player, health }) {
  return <Container type={player} health={health} />;
}

export default PlayerContainer;
