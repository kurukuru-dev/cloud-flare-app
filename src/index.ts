/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

async function sleep(ms: number): Promise<string> {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve('今起きた！');
		}, ms)
	);
}

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		const message: string = await sleep(30000);
// 		return new Response(message);
// 	},
// } satisfies ExportedHandler<Env>;

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const message: string = await sleep(100000);
		return new Response(message);
	},
} satisfies ExportedHandler<Env>;
