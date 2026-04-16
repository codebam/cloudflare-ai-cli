import EventSource from 'eventsource';

const url = new URL('https://damp-recipe-a17d.codebam.workers.dev');
url.searchParams.set('content', process.argv.slice(2).join(' '));

const source = new EventSource(url.href);
source.onmessage = (event) => {
    if (event.data === '[DONE]') {
        source.close();
        return;
    }
    try {
        const data = JSON.parse(event.data);
        if (data.choices && data.choices[0]?.delta?.content) {
            process.stdout.write(data.choices[0].delta.content);
        }
        else if (data.response) {
            process.stdout.write(data.response);
        }
    } catch (e) {
    }
};
