const koreanVariants = [
  "Korea",
  "South Korea",
  "Republic of Korea",
  "Korea, Republic of",
  "대한민국",
  "한국"
];

let foundTexts = [];

document.querySelectorAll('select').forEach((select, idx) => {
  select.querySelectorAll('option').forEach((option) => {
    const text = option.innerText.trim();
    if (koreanVariants.some(v => text.toLowerCase().includes(v.toLowerCase()))) {
      foundTexts.push(`✅ "${text}" (드롭다운 ${idx + 1}번)`);
    }
  });
});

if (foundTexts.length > 0) {
  const message = `이 페이지에서 한국 관련 항목이 발견되었습니다:\n\n` + foundTexts.join("\n");

  const bubble = document.createElement("div");
  bubble.textContent = message;
  Object.assign(bubble.style, {
    position: "fixed",
    top: "20px", // ✅ 상단으로 위치 이동
    right: "20px",
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: "16px 20px",
    borderRadius: "10px",
    zIndex: 9999,
    fontSize: "14px",
    whiteSpace: "pre-line",
    maxWidth: "320px",
    lineHeight: "1.6",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    fontFamily: "sans-serif"
  });
  document.body.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 10000); // 10초 후 자동 제거
}