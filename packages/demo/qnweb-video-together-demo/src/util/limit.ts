export function limitNumber(value: string, len: number): string {
  return value.replace(/\D/g, '').substring(0, len);
}
