export function formatToCurrency(value: number, currency: string) {
  if (value !== undefined && value !== null) {
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
    }).format(value)

    return formatted
  }
  return ""
}
