import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const url = request.url;
  response.setHeader("Cache-Control", "public, s-maxage=1");

  return response.status(200).json({ url, message: "Hello from lambda!" });
}
