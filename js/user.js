async function saveUser() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let response = await sendRequest("user/signup", "POST", {
    username,
    password,
  });

  if (response.ok) {
    window.location = "login.html?message=User created";
  }
}
