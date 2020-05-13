const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const getHackerRankNews = () => {
    const url = 'hacker-news.firebaseio.com';
    const path = '/v0/item/8863.json?print=pretty';
    const options = {
        hostname: url,
        port: 443,
        path,
        method: 'GET'
    };
    const body = [];
    const executor = ((resolve, reject) => {
        const handleError = (error) => {
            console.error(error);
            reject(error.message);
        };
        const https = require('https');
        https.request(options, res => {
            const listener = (chunk) => {
                body.push(chunk); // process.stdout.write(d)
            };
            const handleEnd = () => {
                const temp = JSON.parse(Buffer.concat(body).toString());
                // console.log('end', temp);
                resolve(temp);
            };
            res.on('data', listener)
                .on('end', handleEnd);
        })
            .on('error', handleError)
            .end();
    });
    const promise = new Promise(executor);
    return promise;
};
const requestListener = (_req, res) => {
    (async () => {
        try {
            const response = await getHackerRankNews();
            const by = JSON.stringify(response.by);
            const descendants = JSON.stringify(response.descendants);
            const id = JSON.stringify(response.id);
            const score = JSON.stringify(response.score);
            const time = JSON.stringify(response.time);
            const title = JSON.stringify(response.title);
            const type = JSON.stringify(response.type);
            const url = JSON.stringify(response.url);
            const kids = JSON.stringify(response.kids);
            console.log('now', Date.now());
            console.log('getHackerRankNews.by', by);
            console.log('getHackerRankNews.descendants', descendants);
            console.log('getHackerRankNews.id', id);
            console.log('getHackerRankNews.score', score);
            console.log('getHackerRankNews.time', time);
            console.log('getHackerRankNews.title', title);
            console.log('getHackerRankNews.type', type);
            console.log('getHackerRankNews.url', url);
            console.log('getHackerRankNews.kids', kids);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            // res.end(JSON.stringify(response));
            res.end(kids);
        } catch (error) {
            console.log('catch.error', error);
        }
    })();
};
const server = http.createServer(requestListener);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});