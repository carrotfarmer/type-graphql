import { v4 } from "uuid";
import { redis } from "../../redis";
import { CONFIRM_USER_PREFIX } from "../constants/redisPrefixes";

export const createConfirmationUrl = async (
  userId: number
): Promise<string> => {
  const token = v4();
  await redis.set(CONFIRM_USER_PREFIX + token, userId, "EX", 60 * 60 * 24); // 1 day expiration

  return `http://localhost:3000/user/confirm/${token}`;
};
