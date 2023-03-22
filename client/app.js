const usernameField = document.querySelector(".username-field")
const passwordField = document.querySelector(".password-field")
const loginBtn = document.querySelector(".login-btn")



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

// Log in
async function authenticateLogin() {
  const user = {
    username: usernameField.value,
    password: passwordField.value
  }

  let response = await sendJson("http://127.0.0.1:3030/api/users/login/", "PUT", user);
  console.log(response);

  if(response.status == 200) {
    console.log("login successful")
    window.location.replace("inbox.html")
  } else if (response.status == 400) {
    console.log("Bad request")
  }
}




loginBtn.addEventListener("click", event => {

    authenticateLogin()
})


