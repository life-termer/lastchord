// app/api/transcribe/route.js
import { NextResponse } from "next/server";
import { writeFile, createReadStream } from "fs";
import { promisify } from "util";
import path from "path";
import os from "os";
import crypto from "crypto";
import { OpenAI } from "openai";
import fs from "fs/promises";

const writeFileAsync = promisify(writeFile);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {

    const formData = await req.formData();
    const file = formData.get("audioFile");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
    }

    // Save the file to /tmp folder
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempDir = os.tmpdir();
    const fileName = `upload-${crypto.randomUUID()}.mp3`;
    const filePath = path.join(tempDir, fileName);

    await fs.writeFile(filePath, buffer);
    console.log("✅ Audio saved:", filePath);

    // Send to OpenAI Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: createReadStream(filePath),
      model: "whisper-1",
      response_format: "verbose_json",
    });

    // Clean up: remove temp file
    await fs.unlink(filePath);

    return NextResponse.json({ segments: transcription.segments });
  } catch (error) {
    console.error("❌ Transcription error:", error);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
