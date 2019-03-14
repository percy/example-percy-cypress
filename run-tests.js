const httpServer = require('http-server');
const port = process.env.PORT_NUMBER || 8000;
const spawn = require('child_process').spawn;
const platform = require("os").platform();

// We need to change the command path based on the platform they're using
const cmd = /^win/.test(platform)
      ? `${process.cwd()}\\node_modules\\.bin\\cypress.cmd`
      : `cypress`;

const server = httpServer.createServer()

server.listen(port)
console.log(`Server is listening on http://localhost:${port}`)

const tests = spawn(cmd, ['run'], {
  stdio: "inherit",
  windowsVerbatimArguments: true,
});

tests.on('close', () => {
  console.log(`Tests finished! Closing server http://localhost:${port}`);
  server.close();
});
