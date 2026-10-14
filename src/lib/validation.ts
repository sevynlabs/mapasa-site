/** Remove tudo que não é dígito e o DDI 55, se presente. */
export function normalizeBrazilianPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
    digits = digits.slice(2);
  }
  return digits;
}

/** Valida telefone brasileiro: DDD válido + fixo (8 dígitos) ou celular (9 dígitos iniciando em 9). */
export function isValidBrazilianPhone(value: string): boolean {
  const d = normalizeBrazilianPhone(value);
  if (d.length !== 10 && d.length !== 11) return false;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99 || d[1] === "0") return false;
  if (d.length === 11 && d[2] !== "9") return false;
  if (d.length === 10 && !/[2-5]/.test(d[2])) return false;
  return true;
}

/** Máscara progressiva: (34) 99999-9999 */
export function formatBrazilianPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
