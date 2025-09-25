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

// const handleRequest = (request, response, parsedURL) => {
//   // Check if URL exists, then call the proper handler
//   if (urlStruct[parsedURL.pathname]) {
//     return urlStruct[parsedURL.pathname](request, response);
//   }

//   // Fallback if url fails
//   return urlStruct['/notReal'](request, response);
// };

const handlePost = (request, response, parsedURL) => {

};

const handleGet = (request, response, parsedURL) => {

};

const handleHead = (request, response, parsedURL) => {

};

const onRequest = (request, response) => {
  // Parse URL info
  const protocol = request.connection.encryted ? 'https' : 'http';
  const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

  switch (request.method) {
    case 'POST':
      handlePost(request, response, parsedURL);
      break;
    case 'GET':
      handleGet(request, response, parsedURL);
      break;
    case 'HEAD':
      handleHead(request, response, parsedURL);
      break;
    default:
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  // console.log(`Listening on 127.0.0.1:${port}`);
});
