// Serves a different page per Host header: a.lvh.me gets site A, b.lvh.me gets site B.
const http = require('http');

const PORT = Number(process.env.SITE_PORT) || 8010;

http.createServer((req, res) => {
  const host = (req.headers.host || '').split(':')[0];
  const site = host.startsWith('b.') ? 'b' : 'a';
  const other = site === 'a' ? 'b' : 'a';

  if (req.url === '/style.css') {
    res.writeHead(200, { 'content-type': 'text/css' });
    return res.end(`body { font-family: sans-serif; margin: 40px; }
h1 { color: ${site === 'a' ? '#cc0000' : '#0000cc'}; }`);
  }
  if (req.url === '/' || req.url === '/account') {
    res.writeHead(200, { 'content-type': 'text/html' });
    return res.end(`<!doctype html>
<html>
  <head><title>Site ${site.toUpperCase()}</title><link rel="stylesheet" href="/style.css"></head>
  <body>
    <h1 id="title">Site ${site.toUpperCase()} on ${host}</h1>
    <a id="go" href="http://${other}.lvh.me:${PORT}/account">Go to ${other}.lvh.me</a>
  </body>
</html>`);
  }
  res.writeHead(404);
  res.end();
}).listen(PORT, () => console.log(`Serving a.lvh.me and b.lvh.me on port ${PORT}`));
