export function functionPostRequestOptions(rawContent){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postRequestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: rawContent,
        redirect: 'follow'
    };

    return postRequestOptions;
}

export const getRequestOptions = {
    method: 'GET',
    redirect: 'follow'
};

export function functionPutRequestOptions(rawContent){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var putRequestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: rawContent,
        redirect: 'follow'
    };

    return putRequestOptions;
}

export const deleteRequestOptions = {
    method: 'DELETE',
    redirect: 'follow'
};