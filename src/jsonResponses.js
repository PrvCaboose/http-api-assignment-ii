const users = {};

const sendResponse = (request, response, statusCode, content) => {
    const jsonBody = JSON.stringify(content);
    response.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(jsonBody, 'utf8'),
    });

    if (request.method !== "HEAD" && statusCode != 204) {
        response.write(jsonBody);
    }

    response.end();
}

const getUsers = (request, response) => {
    const jsonResponse = {
        users
    }
    sendResponse(request, response, 200, jsonResponse);
}

const addUser = (request, response) => {
    const jsonMessage = {
        message: "Both name and age are required"
    };

    const {name, age} = request.body;

    if (!name || !age) {
        jsonMessage.id = "missingParams";
        return sendResponse(request, response, 400, jsonMessage);
    }

    let responseCode = 204; // updated

    if (!users[name]) {
        responseCode = 201; // Created
        users[name] = {
            name: name,
            age: age
        }

        jsonMessage.message = "Created Successfully";
        return sendResponse(request, response, responseCode, jsonMessage);
    }

    // 204 response doesn't send body
    sendResponse(request, response, responseCode, {})

}

const notReal = (request, response) => {

}

module.exports = {
    getUsers,
    addUser,
    notReal
}