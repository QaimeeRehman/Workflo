export function toCapitalize(word) {
  if (Array.isArray(word) && word.length > 1)
    return word.map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

  return word[0].toUpperCase() + word.slice(1);
}

export const formatNumberForCompactDisplay = new Intl.NumberFormat("en-PK", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});
