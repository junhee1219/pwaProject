// WebAuthn 인증 요청
async function authenticate() {
  // Relying Party 정보
  const rp = {
    id: "example.com",
    name: "My Example Site"
  };

  // 인증 요청을 서버에 보냄
  const credentialOptions = await fetch("/start_authentication", {
    method: "POST",
    body: JSON.stringify(rp)
  }).then(response => response.arrayBuffer());

  // 클라이언트에서 사용 가능한 인증기 목록을 가져옴
  const devices = await navigator.credentials.get({
    publicKey: JSON.parse(credentialOptions)
  });

  // 인증 결과를 서버에 보냄
  await fetch("/complete_authentication", {
    method: "POST",
    body: JSON.stringify(devices)
  });
}

// 버튼 클릭 시 인증 요청 실행
const button = document.querySelector("#authenticate-button");
button.addEventListener("click", authenticate);
