var server = require('http').createServer(); 
var createApplication = function(){
var app = require('./app'); 
server.on('request', app); 
}; 
var startServer = function(){
    var PORT = process.env.PORT || 1337; 
    server.listen(PORT, function(){
        console.log('Sever started on port ', PORT); 
    }); 
}; 

// Load balancer distributes the load between loads 

// creating simple server instance 
var http = require('http'); 
let PORT = process.argv.splice(2)[0]; 

// create a basic server that respond to any request with 'Hello world'
http.createServer(function(req, res){
    res.writeHead(200, {'Contente-Type':'test/plain'}); 
    console.log('SERVER : Instance at '+ PORT+' received request\n'); 
    res.end('Hello World'); 
}).listen(PORT, function(){
    console.log('Server running at http:localhost: '+PORT+'/'); 
}); 


// available tools 
// NOde-http-proxy 
// Nginx , HAProxy 


// Use Node-Http Proxy 
// let PORT = process.argv.splice(2)[0]; // 8000
let httpProxy = require('http-proxy'); 
const proxy = httpProxy.createServer(); 
// const http = require('http'); 

// creating load balancer 
let addresses = [
    {
        host : 'localhost', 
        port:8001
    }, 
    {
        host:'localhost',
        port:8002
    }, 
    {
        host:'localhost',
        port:8003
    }
]; 

// Creating load balancer 
http.createServer(function(req, res){
    let target = {target:addresses.shift()}; 
    console.log('\n PROXY: balancing request to: ', target); 
    proxy.web(req, res, target); 
    addresses.push(target.target); 
}).listen(PORT||8000); 
