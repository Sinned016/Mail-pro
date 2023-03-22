// Create accounts
const newUsername = document.querySelector(".create-username-field")
const newPassword = document.querySelector(".create-password-field")
const createBtn = document.querySelector(".create-btn")

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

async function createAccount() {
  const newUser = {
    username: newUsername.value,
    password: newPassword.value
  }

  let response = await sendJson("http://127.0.0.1:3030/api/user/", "PUT", newUser);
  console.log(response);

  if(response.status == 200) {
    console.log("Created account")
    window.location.replace("index.html")
  } else if (response.status == 400) {
    console.log("Bad request")
  }
}

createBtn.addEventListener("click", event => {

  createAccount();
})