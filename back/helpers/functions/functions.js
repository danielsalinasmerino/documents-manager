//
// Creates logs with a better format
//
function logWithFormat(message){
    console.log('\x1b[32m%s\x1b[0m', '\n' + '   ---> ' + message);
}

//
// Creates a reference for this moment
//
function createThisMomentReference() {

    const thisMoment = new Date();

    const thisMomentDate = String(thisMoment.getDate());
    const thisMomentMonth = String(thisMoment.getMonth() + 1);
    const thisMomentYear = String(thisMoment.getFullYear());
    const thisMomentHours = String(thisMoment.getHours());
    const thisMomentMinutes = String(thisMoment.getMinutes());
    const thisMomentSeconds = String(thisMoment.getSeconds());

    return (thisMomentDate + thisMomentMonth + thisMomentYear + thisMomentHours + thisMomentMinutes + thisMomentSeconds);
}

module.exports = { logWithFormat, createThisMomentReference };