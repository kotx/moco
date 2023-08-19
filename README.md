# Moco Counter
[Moe Counter](https://github.com/journey-ad/Moe-Counter) on [Cloudflare Workers](https://workers.cloudflare.com/).

 ![Moco Counter](https://moco.yukata.dev/get/@moco-gh) 

## Deployment
- Clone this repository.
- Install dependencies with `pnpm install`.
- Modify `wrangler.toml` to your liking.
- Check out [`example.dev.vars`](./example.dev.vars) for required secrets to set. You can use the Upstash integration in Cloudflare dashboard.
- Run `pnpm run deploy`. For the first deployment, you may need to comment `services` in `wrangler.toml` before deploying again with it uncommented.

## Development
```
pnpm i
pnpm dev
```
