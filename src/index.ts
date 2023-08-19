import { Buffer } from 'node:buffer'
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { html } from 'hono/html'

import page from './page'

export type Env = {
  DOMAIN: string
  UPSTASH_URL: string
  UPSTASH_TOKEN: string
  PAD: number
  SELF: Fetcher
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', page)
app.get('/*', serveStatic({ root: './' }))

const IMAGE_WIDTH = 45
const IMAGE_HEIGHT = 100
const image = async (
  val: string,
  idx: number,
  theme: string,
  self: Fetcher
) => {
  const url = `https://x/theme/${encodeURIComponent(
    theme
  )}/${encodeURIComponent(val)}.png`
  const buf = await self
    .fetch(url, {
      cf: {
        cacheTtlByStatus: { '200-299': 86400, 404: 1, '500-599': 0 },
        cacheEverything: true,
      },
    })
    .then((res) => res.arrayBuffer())
  const b64 = Buffer.from(buf).toString('base64')
  const dataUrl = `data:image/gif;base64,${b64}`

  return html`
    <image
      x="${idx * IMAGE_WIDTH}"
      y="0"
      width="${IMAGE_WIDTH}"
      height="${IMAGE_HEIGHT}"
      xlink:href="${dataUrl}"
    />
  `
}

app.get('/get/:name', async (c) => {
  const name = c.req.param('name')
  const theme = c.req.query('theme') || 'moebooru'

  let count
  if (name !== '@demo') {
    const { result } = await fetch(
      `${c.env.UPSTASH_URL}/incr/${encodeURIComponent(name)}`,
      {
        headers: {
          Authorization: `Bearer ${c.env.UPSTASH_TOKEN}`,
        },
      }
    ).then((res) => res.json<{ result: number }>())

    count = result.toString()
  } else {
    count = '0123456789'
  }

  const chars = count.padStart(c.env.PAD, '0').split('')

  return c.body(
    html`<?xml version="1.0" encoding="UTF-8"?>
      <svg
        width="${IMAGE_WIDTH * chars.length}"
        height="${IMAGE_HEIGHT}"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="image-rendering: pixelated;"
      >
        <title>Moco Count</title>
        <g>
          ${await Promise.all(
            chars.map((x, idx) => image(x, idx, theme, c.env.SELF))
          )}
        </g>
      </svg>`,
    200,
    {
      'Cache-Control': 'no-cache, no-store',
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'X-Moco-Count': count,
    }
  )
})

export default app
