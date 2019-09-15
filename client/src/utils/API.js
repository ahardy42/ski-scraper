const GRAB = async function (url, method, body = null) {
    let response;
    if (body) {
        response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: { "content-type": "application/json" }
        });
    } else {
        response = await fetch(url, {
            method: method
        });
    }
    let json = await response.json();
    return json;
}

export default GRAB;