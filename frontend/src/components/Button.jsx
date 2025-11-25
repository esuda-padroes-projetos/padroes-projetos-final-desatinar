import './Button.css'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  type = 'button',
  disabled = false,
  onClick,
  className = ''
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
