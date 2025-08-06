// 메시지 보내기 (에러 방지 처리 포함)
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  if (!tabs[0]) return;
  chrome.tabs.sendMessage(
    tabs[0].id,
    { type: "REQUEST_KOREA_OPTIONS" },
    function (response) {
      if (chrome.runtime.lastError) {
        console.warn("Content script 연결 안 됨:", chrome.runtime.lastError.message);
      }
    }
  );
});

// 메시지 수신 및 표시
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "KOREA_OPTIONS") {
    const list = document.getElementById("result");
    list.innerHTML = "";

    if (msg.data.length > 0) {
      msg.data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.optionText} (value: ${item.value})`;
        list.appendChild(li);
      });
    } else {
      list.innerHTML = "<li>이 페이지에서 한국 관련 항목을 찾을 수 없습니다.</li>";
    }
  }
});