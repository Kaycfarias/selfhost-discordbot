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
  const coloredTimestamp = processColorCodes(dateTime, "gray");
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

export function processColorCodes(
  text: string,
  color:
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "gray"
): string {
  const colorCodes: Record<string, string> = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
  };
  return `${colorCodes[color]}${text}\x1b[0m`;
}
