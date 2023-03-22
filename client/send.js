const fromField = document.querySelector(".from-field")
const toField = document.querySelector(".to-field")
const messageField = document.querySelector(".message-field")
const createBtn = document.querySelector(".send-btn")



async function sendJson(url, method, data) {
    const fetchOptions = {
      method: method,
      body: JSON.stringify(data), // Gör om data till json
      headers: {
        "Content-Type": "application/json" // Media type json
      }
    }

    return await fetch(url, fetchOptions);
}


async function sendEmail() {
    const message = {
        from: fromField.value,
        to: toField.value,
        message: messageField.value
    }

    let response = await sendJson("http://127.0.0.1:3030/api/user/send/", "PUT", message);
    console.log(response);
}


createBtn.addEventListener("click", event => {

    sendEmail();
});