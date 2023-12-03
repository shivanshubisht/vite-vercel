import { type RequestContext } from '@vercel/edge'

export const config = {
  runtime: 'edge',
}

export async function GET(request: Request, context: RequestContext) {
  console.log(context)
  const url = request.url
  return new Response(JSON.stringify({ url, message: 'Hello from edge!' }))
}

// non HTTP verbs as function name are supported only with default export on vercel edge functions, like this:
// export default async function handler(request: Request) {
//   const url = request.url
//   return new Response(JSON.stringify({ url }))
// }
