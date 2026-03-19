function Button({ buttonName, onClick, disabled = false }) {
  return <button onClick={onClick} disabled={disabled}>{buttonName}</button>;
}

export default Button;
