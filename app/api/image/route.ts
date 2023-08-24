import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512 x 512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("API Key not configured.", {
        status: 500,
      });
    }

    /* check for a valid prompts */
    if (!prompt) {
      return new NextResponse("The message prompt is required.", {
        status: 400,
      });
    }

    if (!amount) {
      return new NextResponse("The amount prompt is required.", {
        status: 400,
      });
    }

    if (!resolution) {
      return new NextResponse("The resolution prompt is required.", {
        status: 400,
      });
    }

    /* valid message prompt */
    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
