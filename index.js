const http = require('http');
const PORT = 3000;

const friends = [
    {
        id: 0,
        name: 'sir Ross',
    },
    {
        id: 1,
        name: 'sir Voss',
    },
    {
        id: 2,
        name: 'sir Boss',
    }
]

const server = http.createServer((req, res) => {

    const items = req.url.split('/');
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            console.log('Request:', friend);
            friends.push(JSON.parse(friend));
        });
        req.pipe(res);
    } else if (req.method === 'GET' && items[1] === 'friends') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });

        //const friendsIndex = Number(items[2]);
        if (items.length === 3) {
            const friendsIndex = +items[2];
            res.end(JSON.stringify(friends[[friendsIndex]]))
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Ross!</li>');
        res.write('<li>What are your thoughts on astronomy</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});