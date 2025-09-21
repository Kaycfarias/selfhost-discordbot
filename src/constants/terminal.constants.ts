// Constantes para o processamento de terminal
export const TIMESTAMP_REGEX = /^\[\d{2}:\d{2}:\d{2}\]/;
export const ISO_TIMESTAMP_REGEX = /(\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2})/;
export const SYSTEM_MESSAGE_INDICATORS = ["🔄", "✅", "❌", "🔌"] as const;

// Configurações de estilo
export const TERMINAL_STYLES = {
  fontFamily: "Fira Code, Courier New, monospace",
  fontSize: "14px",
  lineHeight: "1.2",
} as const;

// Configurações de tempo
export const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
} as const;

// Configurações de data e hora completa
export const DATETIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit", 
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
} as const;

// Configurações apenas de data
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
} as const;

// Regex para detectar diferentes formatos de timestamp
export const FULL_DATETIME_REGEX = /(\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2})/;
export const DATETIME_WITH_MS_REGEX = /(\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}\.\d{3})/;
