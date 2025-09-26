export default function Button({ title, className= "", ...props}) {
  return (
    <button
      type="button"
      className={`text-white focus:ring-2 cursor-pointer focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-4 py-2 text-center ${className}`}
      {...props}
    >
      {title}
    </button>
  );
}
