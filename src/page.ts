/* MIT License

Copyright (c) 2020 journey-ad

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { Context } from 'hono'
import { html } from 'hono/html'
import { Env } from '.'

export default (c: Context<{ Bindings: Env }>) => {
  return c.html(html`<!DOCTYPE html>
    <html>
      <head>
        <title>Moco Counter!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css"
        />
      </head>
      <body>
        <h3>How to use:</h3>
        <h5>SVG address</h5>
        <code>https://${c.env.DOMAIN}/get/@:name</code>
        <h5>Img tag</h5>
        <code
          >&lt;img src="https://${c.env.DOMAIN}/get/@:name" alt=":name" /></code
        >
        <h5>Markdown</h5>
        <code>![:name](https://${c.env.DOMAIN}/get/@:name)</code>
        <h3>eg:<img src="//${c.env.DOMAIN}/get/@index" alt="Moco Count!" /></h3>
        <i
          >Data can access by anyone, please<span style="color: #ff4500;">
            DO NOT</span
          >
          enter personal information</i
        >
        <details>
          <summary style="display: inline-block;">
            <h3 style="display: inline-block; cursor: pointer;">More themes</h3>
          </summary>
          <p style="margin: 0;">
            Just use the query parameters <code>theme</code>, like this:
            <code>https://${c.env.DOMAIN}/get/@:name?theme=moebooru</code>
          </p>
          <h5>asoul</h5>
          <img src="//${c.env.DOMAIN}/get/@demo?theme=asoul" alt="A-SOUL" />
          <h5>moebooru</h5>
          <img
            src="//${c.env.DOMAIN}/get/@demo?theme=moebooru"
            alt="Moebooru"
          />
          <h5>moebooru-h</h5>
          <img
            src="//${c.env.DOMAIN}/get/@demo?theme=moebooru-h"
            alt="Moebooru-Hentai"
          />
          <h5>rule34</h5>
          <img src="//${c.env.DOMAIN}/get/@demo?theme=rule34" alt="Rule34" />
          <h5>gelbooru</h5>
          <img
            src="//${c.env.DOMAIN}/get/@demo?theme=gelbooru"
            alt="Gelbooru"
          />
          <h5>gelbooru-h</h5>
          <img
            src="//${c.env.DOMAIN}/get/@demo?theme=gelbooru-h"
            alt="Gelbooru-Hentai"
          />
        </details>
        <h3>Credits</h3>
        <ul>
          <li>
            <a
              href="https://github.com/journey-ad/Moe-Counter"
              target="_blank"
              title="Moe Counter"
              >Moe Counter</a
            >
          </li>
          <li>
            <a
              href="https://space.bilibili.com/703007996"
              target="_blank"
              title="A-SOUL_Official"
              >A-SOUL</a
            >
          </li>
          <li>
            <a
              href="https://github.com/moebooru/moebooru"
              target="_blank"
              rel="nofollow"
              >moebooru</a
            >
          </li>
          <li>
            <a
              href='javascript:alert("!!! NSFW LINK !!!
Please enter the url manually")'
              >rule34.xxx</a
            >
            NSFW
          </li>
          <li>
            <a
              href='javascript:alert("!!! NSFW LINK !!!
Please enter the url manually")'
              >gelbooru.com</a
            >
            NSFW
          </li>
          <li>
            <a
              href="https://icons8.com/icon/80355/star"
              target="_blank"
              rel="nofollow"
              >Icons8</a
            >
          </li>
        </ul>
        <h3>Tool</h3>
        <div class="tool">
          <code>https://${c.env.DOMAIN}/get/@</code
          ><input
            id="name"
            type="text"
            placeholder=":name"
            style="display: inline-block; width: 80px; height: 1.4em; line-height: 1.4em; margin: 0 4px; vertical-align: middle;"
          />
          <code>?theme=</code>
          <select
            id="theme"
            style="display: inline-block; height: 1.6em; line-height: 1.6em; font-size: 14px; margin: 0 4px; padding: 0 4px; vertical-align: middle;"
          >
            <option value="asoul">asoul</option>
            <option value="moebooru">moebooru</option>
            <option value="moebooru-h">moebooru-h</option>
            <option value="rule34">rule34</option>
            <option value="gelbooru">gelbooru</option>
            <option value="gelbooru-h">gelbooru-h</option>
          </select>
          <button id="get" style="margin: 10px 0;">Get</button>
          <img id="result" style="display: block;" />
          <script>
            var btn = document.getElementById('get'),
              img = document.getElementById('result')

            btn.addEventListener('click', function () {
              var name = document.getElementById('name'),
                themeEl = document.getElementById('theme')
              var text = name.value ? name.value.trim() : ''
              var theme = themeEl.value || 'moebooru'
              if (!text) {
                alert('Please input counter name.')
                return
              }

              img.src = '//${c.env.DOMAIN}/get/@' + text + '?theme=' + theme
            })
          </script>
        </div>
        <p class="copy">
          <a href="https://github.com/kotx/moco" target="_blank">source code</a>
        </p>
      </body>
    </html>`)
}
