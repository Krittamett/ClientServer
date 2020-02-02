var net = require('net');
const readline = require('readline');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

client.connect(PORT,HOST,function(){
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

client.on('data',function(data){
    r1.question(data,(name) => {
        client.write(name);
    });
    
});

client.on('close',function(){
     console.log('connection close'); 
});