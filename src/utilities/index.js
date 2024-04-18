export function getInitials(str) {
  const words = str.split(" ");

  let initials = "";

  for (let i = 0; i < words.length; i++) {
    initials += words[i].charAt(0).toUpperCase();
  }

  return initials;
}
