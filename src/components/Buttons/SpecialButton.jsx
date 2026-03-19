import Button from "./Button.jsx";

function SpecialButton({ onClick, disabled = false }) {
  return <Button buttonName="SPECIAL!" onClick={onClick} disabled={disabled} />;
}

export default SpecialButton;
