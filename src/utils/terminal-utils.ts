import {
  TIMESTAMP_REGEX,
  ISO_TIMESTAMP_REGEX,
  SYSTEM_MESSAGE_INDICATORS,
  TIME_FORMAT_OPTIONS,
  DATETIME_FORMAT_OPTIONS,
  DATE_FORMAT_OPTIONS,
  FULL_DATETIME_REGEX,
  DATETIME_WITH_MS_REGEX,
} from "@/constants/terminal.constants";

/**
 * Formata o horário atual no padrão brasileiro HH:mm:ss
 */
export function formatCurrentTime(): string {
  return new Date().toLocaleTimeString("pt-BR", TIME_FORMAT_OPTIONS);
}

/**
 * Formata a data e hora atual no padrão brasileiro DD/MM/YYYY HH:mm:ss
 */
export function formatCurrentDateTime(): string {
  return new Date().toLocaleString("pt-BR", DATETIME_FORMAT_OPTIONS);
}

/**
 * Formata apenas a data atual no padrão brasileiro DD/MM/YYYY
 */
export function formatCurrentDate(): string {
  return new Date().toLocaleDateString("pt-BR", DATE_FORMAT_OPTIONS);
}

/**
 * Extrai apenas a parte do tempo (HH:mm:ss) de um timestamp ISO
 */
export function extractTimeFromTimestamp(timestamp: string): string {
  return timestamp.split(/[T\s]/)[1].split(".")[0]; // Remove milissegundos se existir
}

/**
 * Extrai data e hora de um timestamp ISO e formata para o padrão brasileiro
 */
export function extractDateTimeFromTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("pt-BR", DATETIME_FORMAT_OPTIONS);
}

/**
 * Verifica se a linha está vazia
 */
export function isEmptyLine(line: string): boolean {
  return line.trim() === "";
}

/**
 * Verifica se a linha já possui um timestamp formatado [HH:mm:ss]
 */
export function hasFormattedTimestamp(line: string): boolean {
  return TIMESTAMP_REGEX.test(line);
}

/**
 * Extrai timestamp ISO da linha se existir (com ou sem milissegundos)
 */
export function extractIsoTimestamp(line: string): string | null {
  // Primeiro tenta encontrar timestamp com milissegundos
  let match = line.match(DATETIME_WITH_MS_REGEX);
  if (match) return match[1];

  // Depois tenta timestamp sem milissegundos
  match = line.match(FULL_DATETIME_REGEX);
  if (match) return match[1];

  // Fallback para o regex original
  match = line.match(ISO_TIMESTAMP_REGEX);
  return match ? match[1] : null;
}

/**
 * Detecta o tipo de timestamp presente na linha
 */
export function detectTimestampType(
  line: string
): "formatted" | "iso-with-ms" | "iso" | "none" {
  if (TIMESTAMP_REGEX.test(line)) return "formatted";
  if (DATETIME_WITH_MS_REGEX.test(line)) return "iso-with-ms";
  if (FULL_DATETIME_REGEX.test(line)) return "iso";
  return "none";
}

/**
 * Verifica se a linha contém uma mensagem de sistema
 */
export function isSystemMessage(line: string): boolean {
  return SYSTEM_MESSAGE_INDICATORS.some((indicator) =>
    line.includes(indicator)
  );
}

/**
 * Formata uma linha com timestamp extraído dos logs (apenas hora)
 */
export function formatLineWithExtractedTimestamp(
  line: string,
  isoTimestamp: string
): string {
  const timeOnly = extractTimeFromTimestamp(isoTimestamp);
  const cleanLine = line.replace(isoTimestamp, "").trim();
  return `[${timeOnly}] ${cleanLine}`;
}

/**
 * Formata uma linha com data e hora completa extraída dos logs
 */
export function formatLineWithExtractedDateTime(
  line: string,
  isoTimestamp: string
): string {
  const dateTime = extractDateTimeFromTimestamp(isoTimestamp);
  const cleanLine = line.replace(isoTimestamp, "").trim();
  const coloredTimestamp = processColorCodes(dateTime, "gray", "black");
  return `${coloredTimestamp} ${cleanLine}`;
}

/**
 * Formata uma linha com o horário atual (apenas hora)
 */
export function formatLineWithCurrentTime(line: string): string {
  const currentTime = formatCurrentTime();
  return `[${currentTime}] ${line}`;
}

/**
 * Formata uma linha com data e hora atual completa
 */
export function formatLineWithCurrentDateTime(line: string): string {
  const currentDateTime = formatCurrentDateTime();
  return `[${currentDateTime}] ${line}`;
}

const colors = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  gray: 90,
};

const bgColors = {
  black: 40,
  red: 41,
  green: 42,
  yellow: 43,
  blue: 44,
  magenta: 45,
  cyan: 46,
  white: 47,
  gray: 100, // bright background gray
};

export function processColorCodes(
  text: string,
  foreground: keyof typeof colors,
  background: keyof typeof colors
): string {
  return `\x1b[1;${colors[foreground]};${bgColors[background]}m ${text}\x1b[0m`;
}
