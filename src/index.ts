import { Ai } from '@cloudflare/ai';

export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env) {
		const ai = new Ai(env.AI);

		const content = new URL(request.url).searchParams.get('content');

		const messages = [
			{ role: 'system', content: 'You are a friendly assistant' },
			{
				role: 'user',
				content,
			},
		];

		const stream = await ai.run('@hf/thebloke/neural-chat-7b-v3-1-awq', {
			messages,
			stream: true,
		});

		return new Response(stream, {
			headers: { 'content-type': 'text/event-stream' },
		});
	},
};
