export default function RetroButton({ children, className = '', ...props }) {
  return <button className={`retro-button ${className}`} {...props}>{children}</button>
}
