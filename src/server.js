const http = require('http');
const htmlHandler = require('./htmlResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getStyles,
  '/getUsers': '',
  '/notReal': '',
  '/addUser': '',
};

const handlePost = (request, response, parsedURL) => {

};

const handleGetHead = (request, response, parsedURL) => {
  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response);
  }
  // Fallback if url fails
  return urlStruct['/notReal'](request, response);
};

const onRequest = (request, response) => {
  // Parse URL info
  const protocol = request.connection.encryted ? 'https' : 'http';
  const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

  if (request.method === 'POST') {
    handlePost(request, response, parsedURL);
  } else {
    handleGetHead(request, response, parsedURL);
  }
};

http.createServer(onRequest).listen(port, () => {
  // console.log(`Listening on 127.0.0.1:${port}`);
});
