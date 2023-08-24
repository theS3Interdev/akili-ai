import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma-db";
import { MAX_FREE_ATTEMPTS } from "@/lib/constants";

export const incrementAPILimitAttempts = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userAPILimit = await prismadb.userAPILimit.findUnique({
    where: { userId: userId },
  });

  if (userAPILimit) {
    await prismadb.userAPILimit.update({
      where: { userId: userId },
      data: { count: userAPILimit.count + 1 },
    });
  } else {
    await prismadb.userAPILimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const checkAPILimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userAPILimit = await prismadb.userAPILimit.findUnique({
    where: { userId: userId },
  });

  if (!userAPILimit || userAPILimit.count < MAX_FREE_ATTEMPTS) {
    return true;
  } else {
    return false;
  }
};

export const getAPILimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userAPILimit = await prismadb.userAPILimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userAPILimit) {
    return 0;
  }

  return userAPILimit.count;
};
