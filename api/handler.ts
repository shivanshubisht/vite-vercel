export const config = {
  runtime: 'edge',
}

export default async (request: Request) => {
  const url = request.url
  console.log(url)
  const data = await (await fetch('https://api.github.com/users/vercel')).json()
  return new Response(JSON.stringify(data))
}
// import type { VercelResponse } from '@vercel/node'

// export const config = {
//   runtime: 'edge',
// }

// export default function handler(response: VercelResponse) {
//   response.setHeader('Cache-Control', 'public, s-maxage=1')

//   return response.status(200).json({ name: 'John Doe' })
// }
