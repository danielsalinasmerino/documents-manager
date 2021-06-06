//
// Creates logs with a better format
//
function logWithFormat(message){
    console.log('\x1b[32m%s\x1b[0m', '\n' + '   ---> ' + message);
}

//
// Creates an id given the length needed
//
function makeIdShort(length = 8) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = { logWithFormat, makeIdShort };