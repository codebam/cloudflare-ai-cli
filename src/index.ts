export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env) {
		const content = new URL(request.url).searchParams.get('content');
		const system = new URL(request.url).searchParams.get('system');
		const model = new URL(request.url).searchParams.get('model');

		const messages = [
			{ role: 'system', content: system ?? '' },
			{
				role: 'user',
				content: content ?? '',
			},
		];

		const stream = await env.AI.run((model as '@cf/meta/llama-3-8b-instruct') ?? '@cf/meta/llama-3-8b-instruct', {
			messages,
			stream: true,
		});

		return new Response(stream as BodyInit, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/event-stream' },
		});
	},
};
