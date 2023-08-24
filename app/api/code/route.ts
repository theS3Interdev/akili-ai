import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { checkAPILimit, incrementAPILimitAttempts } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized access.", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("API Key not configured.", {
        status: 500,
      });
    }

    /* check for a valid message */
    if (!messages) {
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
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    await incrementAPILimitAttempts();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
