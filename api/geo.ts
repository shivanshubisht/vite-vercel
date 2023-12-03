import {
  geolocation,
  ipAddress,
  CITY_HEADER_NAME,
  COUNTRY_HEADER_NAME,
  EMOJI_FLAG_UNICODE_STARTING_POSITION,
  LATITUDE_HEADER_NAME,
  LONGITUDE_HEADER_NAME,
  IP_HEADER_NAME,
  REGION_HEADER_NAME,
  REQUEST_ID_HEADER_NAME,
} from '@vercel/edge'

export const runtime = 'edge'

export function GET(request: Request) {
  const location = geolocation(request)
  const ip = ipAddress(request)

  return new Response(
    JSON.stringify({
      location,
      ip,
      CITY_HEADER_NAME,
      COUNTRY_HEADER_NAME,
      EMOJI_FLAG_UNICODE_STARTING_POSITION,
      LATITUDE_HEADER_NAME,
      LONGITUDE_HEADER_NAME,
      IP_HEADER_NAME,
      REGION_HEADER_NAME,
      REQUEST_ID_HEADER_NAME,
    }),
    {
      headers: { 'content-type': 'application/json' },
    }
  )
}
