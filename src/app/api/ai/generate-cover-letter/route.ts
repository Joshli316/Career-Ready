export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getAIClient } from "@/lib/ai/client";
import { PROMPTS } from "@/lib/ai/prompts";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { getClientIp } from "@/lib/ai/client-ip";

interface GenerateRequest {
  jobTitle?: string;
  company?: string;
  jobDescription?: string;
  resume?: string;
}

interface GeneratedLetter {
  recipientName: string;
  opening: string;
  body: string;
  closing: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI features are not configured" },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);
  const { allowed, remaining } = checkRateLimit(`ai:ip:${ip}`, false);
  if (!allowed) {
    return NextResponse.json(
      { error: "Daily AI limit reached. Create an account for more." },
      { status: 429 }
    );
  }

  let body: GenerateRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { jobTitle, company, jobDescription, resume } = body;

  if (!jobDescription || typeof jobDescription !== "string" || jobDescription.length > 15000) {
    return NextResponse.json(
      { error: "Job description is required (max 15,000 characters)." },
      { status: 400 }
    );
  }
  if (!resume || typeof resume !== "string" || resume.length > 15000) {
    return NextResponse.json(
      { error: "Resume is required (max 15,000 characters)." },
      { status: 400 }
    );
  }

  try {
    const client = getAIClient(apiKey);
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: PROMPTS.generateCoverLetter,
      messages: [
        {
          role: "user",
          content: `Job Title: ${jobTitle || "Not specified"}
Company: ${company || "Not specified"}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}`,
        },
      ],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Try to parse structured JSON from Claude's response
    let result: GeneratedLetter;
    try {
      result = JSON.parse(rawText);
    } catch {
      // If Claude didn't return valid JSON, use the raw text as the body
      result = {
        recipientName: "Hiring Manager",
        opening: "",
        body: rawText,
        closing: "",
      };
    }

    return NextResponse.json({ result, remaining });
  } catch {
    return NextResponse.json(
      { error: "Cover letter generation failed. Please try again." },
      { status: 500 }
    );
  }
}
