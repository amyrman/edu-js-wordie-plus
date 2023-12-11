export default function handleError(err, req, res, next) {
  console.error("Error from errorHandler:", err);
  res.status(500).json({ message: err.message });
}
