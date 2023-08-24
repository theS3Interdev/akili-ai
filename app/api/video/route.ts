import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { checkAPILimit, incrementAPILimitAttempts } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized access.", { status: 401 });
    }

    /* check for a valid prompts */
    if (!prompt) {
      return new NextResponse("The message prompt is required.", {
        status: 400,
      });
    }

    const isFreeTrial = await checkAPILimit();

    if (!isFreeTrial) {
      return new NextResponse(
        "Your free trial has expired. Please upgrade to Premium.",
        { status: 403 },
      );
    }

    /* valid message prompt */
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f",
      {
        input: {
          prompt,
        },
      },
    );

    await incrementAPILimitAttempts();

    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
