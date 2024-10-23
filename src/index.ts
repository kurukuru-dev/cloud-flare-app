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

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Get the pathname from the request
		const pathname = new URL(request.url).pathname;

		if (pathname === '/api/upload' && request.method === 'POST') {
			// Get the file from the request
			const formData = await request.formData();
			const file = formData.get('pdfFile') as File;

			// Upload the file to Cloudflare R2
			await env.MY_BUCKET.put(file.name, file.stream());
			return new Response('File uploaded successfully', { status: 200 });
		}

		return new Response('incorrect route', { status: 404 });
	},
} satisfies ExportedHandler<Env>;
