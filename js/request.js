//const url = "https://minticloud.uis.edu.co/c3s20grupo11/";
const url = "http://localhost:8080/"

async function sendRequest(endPoint, method, data) {
  const myHeaders = new Headers();
  myHeaders.set("Content-Type", "application/json");
  myHeaders.set("Accept", "application/json");

  if (!endPoint.includes("/user/login")) {
    const credentials = await getUser();
    myHeaders.set("Authorization", credentials);
  }

  const config = {
    method,
    mode: endPoint == "logout" ? "no-cors" : "cors",
    headers: myHeaders,
    body: data ? JSON.stringify(data) : data,
  };
  if (method.toUpperCase() === "GET" || method.toUpperCase() === "DELETE") {
    delete config["body"];
  }
  const myRequest = new Request(url + endPoint, config);

  const response = await fetch(myRequest).catch(function (error) {
    alert(`Error: ${error.message}`);
  });

  if (
    !response.ok &&
    !endPoint.includes("user/login") &&
    response.status != 0 // when is 0 is OK because is no-cors
  ) {
    alert("Request error");
  }

  return response;
}
