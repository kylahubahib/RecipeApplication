export default function getInitials(fullName) {
  if (!fullName) return "";

  // Split name by spaces and filter out empty parts
  const parts = fullName.trim().split(" ").filter(Boolean);

  // Take the first letter of the first two parts
  const initials = parts
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join("");

  return initials;
}
