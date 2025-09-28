/**
 * Data Transfer Objects para a API de Bots
 */

export interface BotDto {
  containerName: string;
  botId: string;
  state: "running" | "stopped" | "restarting" | "paused" | "exited";
  status: string;
  created: number;
}

export interface ListBotsResponseDto {
  count: number;
  bots: BotDto[];
}

export interface ListBotsRequestDto {
  userId: string;
}

/**
 * Status possíveis dos bots
 */
export const BOT_STATUSES = {
  RUNNING: "running",
  STOPPED: "stopped",
  RESTARTING: "restarting",
  PAUSED: "paused",
  EXITED: "exited",
} as const;

export type BotStatuses = (typeof BOT_STATUSES)[keyof typeof BOT_STATUSES];

export interface BotMetricsType {
  botId: string;
  timestamp: string;
  cpuPercent: string;
  memoryUsage: number;
  memoryLimit: number;
  memoryPercent: string;
  networkRx: number;
  networkTx: number;
  status: BotStatuses;
  running: boolean;
  restarting: boolean;
  paused: boolean;
  uptime: string;
  restartCount: number;
}
