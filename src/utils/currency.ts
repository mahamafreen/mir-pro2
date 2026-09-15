export const formatPKR = (value: number) =>
  `PKR ${new Intl.NumberFormat('en-PK', {maximumFractionDigits: 0}).format(value)}`;
