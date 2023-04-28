function register() {
  // API endpoint for registration.
  let register_url = "https://127.0.0.1:5000/api/register/begin";

  // Call the registration API to get the PublicKeyCredentialCreationOptions.
  fetch(register_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Pass the PublicKeyCredentialCreationOptions to navigator.credentials.create().
      navigator.credentials.create({ publicKey: data }).then(function (newCredentialInfo) {
        // API endpoint for completing the registration.
        let register_complete_url = "https://127.0.0.1:5000/api/register/complete";

        // Call the registration API to complete the registration process.
        fetch(register_complete_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: newCredentialInfo.id,
            rawId: newCredentialInfo.rawId,
            type: newCredentialInfo.type,
            response: {
              attestationObject: newCredentialInfo.response.attestationObject,
              clientDataJSON: newCredentialInfo.response.clientDataJSON,
            },
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // Handle the response from the registration API.
            console.log(data);
          });
      });
    });
}

function authenticate() {
  // API endpoint for authentication.
  let authenticate_url = "https://127.0.0.1:5000/api/authenticate/begin";

  // Call the authentication API to get the PublicKeyCredentialRequestOptions.
  fetch(authenticate_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Pass the PublicKeyCredentialRequestOptions to navigator.credentials.get().
      navigator.credentials.get({ publicKey: data }).then(function (assertion) {
        // API endpoint for completing the authentication.
        let authenticate_complete_url = "https://127.0.0.1:5000/api/authenticate/complete";

        // Call the authentication API to complete the authentication process.
        fetch(authenticate_complete_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: assertion.id,
            rawId: assertion.rawId,
            type: assertion.type,
            response: {
              authenticatorData: assertion.response.authenticatorData,
              clientDataJSON: assertion.response.clientDataJSON,
              signature: assertion.response.signature,
              userHandle: assertion.response.userHandle,
            },
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // Handle the response from the authentication API.
            console.log(data);
          });
      });
    });
}


// 버튼 클릭 시 인증 요청 실행
const button = document.querySelector("#authenticate-button");
button.addEventListener("click", authenticate);
