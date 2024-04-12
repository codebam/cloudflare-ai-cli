import EventSource from 'eventsource';

const url = new URL('https://damp-recipe-a17d.codebam.workers.dev');
url.searchParams.set('content', process.argv.slice(2).join(' '));

const source = new EventSource(url.href);
source.onmessage = (event) => {
	if (event.data == '[DONE]') {
		source.close();
		return;
	}
	const data = JSON.parse(event.data);
	process.stdout.write(data.response);
};
