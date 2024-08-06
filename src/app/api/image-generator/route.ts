import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const imgPrompt = await request.json()
    const payload = {
        prompt: `${imgPrompt}`,
        output_format: "webp"
      };
      const apiKey = process.env.NEXT_PUBLIC_STABILITY_AI_API_KEY

    const formData = new FormData();
    Object.keys(payload).forEach((key) => formData.append(key, payload[key as keyof typeof payload]));

      const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/ultra", {
        method: "POST",
        headers:{
          Authorization: `Bearer ${apiKey}`,
          Accept: "image/*"
        },
        body: formData
      })
      if (response.status === 200) {
        const arrayBuffer = await response.arrayBuffer()
        const baseImage = Buffer.from(arrayBuffer).toString('base64')
        const dataUrl = `data:image/webp;base64,${baseImage}`

        return NextResponse.json({dataUrl}, {status: 200})
      }
      else {
        throw new Error(`${response.status}`)
      }
}