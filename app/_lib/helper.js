export function toCapitalize(word) {
  let toCapital = word;

  if (word.includes(" ")) toCapital = word.split(" ");
  if (Array.isArray(toCapital) && word.length > 1)
    return toCapital.map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

  return word[0].toUpperCase() + word.slice(1);
}

export const formatNumberForCompactDisplay = new Intl.NumberFormat("en-PK", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

export function getDatePeriodWise(period) {
  const now = new Date();
  let from = null;
  let to = null;

  switch (period) {
    case "today":
      from = new Date(now);
      from.setHours(0, 0, 0, 0);

      to = new Date(now);
      to.setHours(23, 59, 59, 999);
      break;

    case "7days":
      from = new Date(now);
      from.setDate(from.getDate() - 7);
      from.setHours(0, 0, 0, 0);

      to = new Date(now);
      to.setHours(23, 59, 59, 999);
      break;

    case "month":
      from = new Date(now.getFullYear(), now.getMonth(), 1);

      to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      break;

    case "last-month":
      from = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      to = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;

    case "3months":
      from = new Date(now);
      from.setMonth(from.getMonth() - 3);
      from.setHours(0, 0, 0, 0);

      to = new Date(now);
      to.setHours(23, 59, 59, 999);
      break;

    case "6months":
      from = new Date(now);
      from.setMonth(from.getMonth() - 6);
      from.setHours(0, 0, 0, 0);

      to = new Date(now);
      to.setHours(23, 59, 59, 999);
      break;

    case "year":
      from = new Date(now.getFullYear(), 0, 1);

      to = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;

    case "all":
    default:
      from = null;
      to = null;
  }
  return { from, to };
}

export function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

export function buildMonthlySales(bills, now) {
  const year = now.getFullYear();
  const month = now.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const salesByDay = Array.from({ length: daysInMonth }, (_, index) => ({
    label: String(index + 1),
    sales: 0,
  }));

  for (const bill of bills) {
    const date = new Date(bill.created_at);

    if (date.getFullYear() !== year || date.getMonth() !== month) {
      continue;
    }

    const day = date.getDate();

    salesByDay[day - 1].sales += Number(bill.total) || 0;
  }

  return salesByDay;
}

export function buildYearlySales(bills, now) {
  const year = now.getFullYear();

  const salesByMonth = Array.from({ length: 12 }, (_, index) => ({
    label: new Date(year, index, 1).toLocaleString("en-US", {
      month: "short",
    }),
    sales: 0,
  }));

  for (const bill of bills) {
    const date = new Date(bill.created_at);

    if (date.getFullYear() !== year) {
      continue;
    }

    const month = date.getMonth();

    salesByMonth[month].sales += Number(bill.total) || 0;
  }

  return salesByMonth;
}

export function formatMoney(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;
}

export function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatPaymentMethod(method) {
  if (!method) return "-";

  return method
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
