const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});
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
(async () => {
    try {
        const response = await getHackerRankNews();
        const temp = JSON.stringify(response.descendants);
        console.log('getHackerRankNews', temp);
    } catch (error) {
        console.log('catch.error', error);
    }
})();
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});