var http = require('http'),
    fs = require('fs'),
    port = 8080;
const url = require("url");

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
    //Investigate the request object's url and method
    var pathname = url.parse(request.url).pathname;
    var verb = url.parse(request.method).pathname;

    //Send listingData in JSON format as response if GET request is sent to '/listings' path
    if ((pathname == '/listings') && (verb == 'GET')) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(listingData);
        response.end();
    }

    //Otherwise, send a 404 error
    else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('404 Not Found\n');
        response.end();
    }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
    //This callback function saves the data in the listingData variable, then starts the server.
    //Save the data in the listingData variable already defined
    listingData = data;

    //Check for errors
    if (err) throw err;

    //Create the server
    server = http.createServer(requestHandler);

    //Start the server
    server.listen(port);
    console.log('Server started');
});
