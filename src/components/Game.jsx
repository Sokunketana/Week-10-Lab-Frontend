import { useState } from "react";
import ButtonContainer from "./Buttons/ButtonContainer.jsx";
import Log from "./BattleLog/Log.jsx";
import PlayerContainer from "./Characters/PlayerContainer.jsx";
import MonsterContainer from "./Characters/MonsterContianer.jsx";
import Screen from "./Screens/Screen.jsx";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

const MAX_HEALTH = 100;

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createLogId() {
  return `${Date.now()}-${Math.random()}`;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    id: createLogId(),
    isPlayer,
    isDamage: true,
    value: damage,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    id: createLogId(),
    isPlayer: true,
    isDamage: false,
    value: healing,
  };
}

function getBattleResult(playerHealth, monsterHealth) {
  if (playerHealth <= 0 && monsterHealth <= 0) {
    return "draw";
  }

  if (monsterHealth <= 0) {
    return "won";
  }

  if (playerHealth <= 0) {
    return "lost";
  }

  return null;
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHp, setPlayerHp] = useState(MAX_HEALTH);
  const [monsterHp, setMonsterHp] = useState(MAX_HEALTH);
  const [logs, setLogs] = useState([]);
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState(null);
  const isSpecialAvailable = turn !== 0 && turn % 3 === 0;

  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function addLogEntry(entry) {
    setLogs((currentLogs) => [entry, ...currentLogs]);
  }

  function updateWinner(playerHealth, monsterHealth) {
    const battleResult = getBattleResult(playerHealth, monsterHealth);

    if (battleResult) {
      setWinner(battleResult);
      return true;
    }

    return false;
  }

  function handleMonsterAttack(currentPlayerHp, currentMonsterHp) {
    const monsterDamage = getRandomValue(5, 13);
    const updatedPlayerHp = Math.max(currentPlayerHp - monsterDamage, 0);

    setPlayerHp(updatedPlayerHp);
    addLogEntry(createLogAttack(true, monsterDamage));
    updateWinner(updatedPlayerHp, currentMonsterHp);
  }

  function handleAttack() {
    if (winner) {
      return;
    }

    const playerDamage = getRandomValue(5, 13);
    const updatedMonsterHp = Math.max(monsterHp - playerDamage, 0);

    setMonsterHp(updatedMonsterHp);
    addLogEntry(createLogAttack(false, playerDamage));
    setTurn((prev) => prev + 1);

    if (updateWinner(playerHp, updatedMonsterHp)) {
      return;
    }

    handleMonsterAttack(playerHp, updatedMonsterHp);
  }

  function handleSpecial() {
    if (winner || !isSpecialAvailable) {
      return;
    }

    const specialDamage = getRandomValue(8, 26);
    const updatedMonsterHp = Math.max(monsterHp - specialDamage, 0);

    setMonsterHp(updatedMonsterHp);
    addLogEntry(createLogAttack(false, specialDamage));
    setTurn((prev) => prev + 1);

    if (updateWinner(playerHp, updatedMonsterHp)) {
      return;
    }

    handleMonsterAttack(playerHp, updatedMonsterHp);
  }

  function handleHeal() {
    if (winner) {
      return;
    }

    const healValue = getRandomValue(8, 16);
    const updatedPlayerHp = Math.min(playerHp + healValue, MAX_HEALTH);

    setPlayerHp(updatedPlayerHp);
    addLogEntry(createLogHeal(healValue));
    setTurn((prev) => prev + 1);
    handleMonsterAttack(updatedPlayerHp, monsterHp);
  }

  function handleKill() {
    if (winner) {
      return;
    }

    setPlayerHp(0);
    setWinner("lost");
  }

  function handleRestart() {
    setPlayerHp(MAX_HEALTH);
    setMonsterHp(MAX_HEALTH);
    setLogs([]);
    setWinner(null);
    setTurn(0);
  }

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <>
      <PlayerContainer player="Player" health={playerHp} />
      <MonsterContainer monster="Monster" health={monsterHp} />
      {winner ? (
        <Screen type={winner} onRestart={handleRestart} />
      ) : (
        <ButtonContainer
          onAttack={handleAttack}
          onSpecial={handleSpecial}
          onHeal={handleHeal}
          onKill={handleKill}
          specialDisabled={!isSpecialAvailable}
        />
      )}
      <Log logs={logs} />
    </>
  );
}

export default Game;
