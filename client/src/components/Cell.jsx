export default function Cell({ id, className, children }) {
  return (
    <div className={`cell ${className}`} id={id}>
      {children}
    </div>
  );
}
