import AttackButton from "./AttackButton.jsx";
import HealButton from "./HealButton.jsx";
import KillButton from "./KillButton.jsx";
import SpecialButton from "./SpecialButton.jsx";

function ButtonContainer({ onAttack, onSpecial, onHeal, onKill, specialDisabled }) {
  return (
    <div className="controls">
      <AttackButton onClick={onAttack} />
      <SpecialButton onClick={onSpecial} disabled={specialDisabled} />
      <HealButton onClick={onHeal} />
      <KillButton onClick={onKill} />
    </div>
  );
}

export default ButtonContainer;
