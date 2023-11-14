export default function Cell({ id, className, children }) {
  return (
    <div className={`cell ${className}`} id={`cell-${id}`}>
      {children}
    </div>
  );
}
