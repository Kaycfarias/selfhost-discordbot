"use server";

import { ListBotsResponseDto } from "@/types/bot.dto";

export const getListBots = async (
  userID: string
): Promise<ListBotsResponseDto> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/list-bots?userId=${userID}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userID}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch bots: ${response.status} ${response.statusText}`
    );
  }

  const data: ListBotsResponseDto = await response.json();
  return data;
};
