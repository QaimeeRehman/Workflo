export function toCapitalize(word) {
  if (Array.isArray(word))
    return word.map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

  return word[0].toUpperCase() + word.slice(1);
}
