//
// Creates logs with a better format
//
function logWithFormat(message){
    console.log('\x1b[32m%s\x1b[0m', '\n' + '   ---> ' + message);
}

module.exports = { logWithFormat };