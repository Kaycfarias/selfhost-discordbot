import {
  isEmptyLine,
  hasFormattedTimestamp,
  extractIsoTimestamp,
  isSystemMessage,
  formatLineWithExtractedTimestamp,
  formatLineWithExtractedDateTime,
  formatLineWithCurrentTime,
  formatLineWithCurrentDateTime,
} from "@/utils/terminal-utils";

// Tipos para configuração de processamento
export type TimestampMode = "time-only" | "full-datetime";

export interface ProcessorConfig {
  timestampMode: TimestampMode;
  showSystemDateTime: boolean;
}

// Configuração padrão
const DEFAULT_CONFIG: ProcessorConfig = {
  timestampMode: "time-only",
  showSystemDateTime: false,
};

/**
 * Normaliza quebras de linha para o formato esperado pelo xterm
 */
export function normalizeLineBreaks(data: string): string {
  return data.replace(/\r?\n/g, "\r\n").replace(/\r\r\n/g, "\r\n");
}

/**
 * Processa uma linha individual para adicionar timestamp quando necessário
 */
export function processLineTimestamp(
  line: string,
  config: ProcessorConfig = DEFAULT_CONFIG
): string {
  if (isEmptyLine(line) || hasFormattedTimestamp(line)) {
    return line;
  }

  const isoTimestamp = extractIsoTimestamp(line);
  if (isoTimestamp) {
    return config.timestampMode === "full-datetime"
      ? formatLineWithExtractedDateTime(line, isoTimestamp)
      : formatLineWithExtractedTimestamp(line, isoTimestamp);
  }

  if (isSystemMessage(line)) {
    if (config.showSystemDateTime) {
      return formatLineWithCurrentDateTime(line);
    }
    return formatLineWithCurrentTime(line);
  }

  return line;
}

/**
 * Processa todas as linhas de dados do terminal para adicionar timestamps
 */
export function processTimestamps(
  data: string,
  config: ProcessorConfig = DEFAULT_CONFIG
): string {
  const lines = data.split("\r\n");
  const processedLines = lines.map((line) =>
    processLineTimestamp(line, config)
  );
  return processedLines.join("\r\n");
}

/**
 * Processa dados completos do terminal: normalização + timestamps
 */
export function processTerminalData(
  data: string,
  config: ProcessorConfig = DEFAULT_CONFIG
): string {
  const normalizedData = normalizeLineBreaks(data);
  return processTimestamps(normalizedData, config);
}

/**
 * Função de conveniência para processar com data e hora completa
 */
export function processTerminalDataWithDateTime(data: string): string {
  return processTerminalData(data, {
    timestampMode: "full-datetime",
    showSystemDateTime: true,
  });
}

/**
 * Função de conveniência para processar apenas com horário
 */
export function processTerminalDataWithTimeOnly(data: string): string {
  return processTerminalData(data, {
    timestampMode: "time-only",
    showSystemDateTime: false,
  });
}
