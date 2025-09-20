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
export const BOT_STATES = {
  RUNNING: "running",
  STOPPED: "stopped",
  RESTARTING: "restarting",
  PAUSED: "paused",
  EXITED: "exited",
} as const;

export type BotState = (typeof BOT_STATES)[keyof typeof BOT_STATES];
