import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request:Request) {
  try {
    const { message } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);

    return Response.json({
      response: result.response.text(),
    });

  } catch (error) {
    return Response.json(
      { error: "Failed to process request", details: error.message },
      { status: 500 }
    );
  }
}
