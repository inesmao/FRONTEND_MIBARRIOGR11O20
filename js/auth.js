async function getUser() {
  const basicAuthorization = await localStorage.getItem("user");
  return basicAuthorization; // return base 64 string with user data
}

function setUser(username, password) {
  const encodeCredentials = btoa(`${username}:${password}`, "base64")
  return localStorage.setItem("user", `Basic ${encodeCredentials}`);
}

getUser().then(function (user) {
  if (!user && !location.pathname.includes("login.html") && !location.pathname.includes("signup.html")) {
    window.location = 'login.html';
  }
  if (user && location.pathname.includes("login.html"))  {
    window.location = 'products.html';
  }
})

async function logout() {
  let response = await sendRequest("logout", "POST");
  if (response.status == 0) {
    localStorage.removeItem("user")
    window.location = "login.html?message=Successful Closing Session";
  }
  return false
}

async function login() {
  let username = document.getElementById("username").value
  let password = document.getElementById("password").value

  let response = await sendRequest("user/login", "POST", { username, password });
  if (response.ok) {
    await setUser(username, password)
    window.location = "products.html";
  } else if (response.status == 401) {
    window.location = "login.html?error=Invalid username and password.";
  }
  return false
}

