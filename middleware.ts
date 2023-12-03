// import { rewrite } from '@vercel/edge'

// export default function middleware(request: Request) {
//   const url = new URL(request.url)

//   if (url.pathname.startsWith('/redirect-home')) {
//     return rewrite(new URL('/', request.url))
//   }
// }

export default function middleware(request: Request) {
  return Response.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/redirect-home/:path*',
}
