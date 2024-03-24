const btn = document.querySelector(".changeColorBtn");

btn.addEventListener("click", async () => {
  console.log("Pick Color button clicked");

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pickColor,
  });
});

async function pickColor() {
  console.log("Script working Correctly");
  try {
    //pikcer
    const eyeDropper = new EyeDropper();
    const selectedColor = await navigator.eyeDropper.open();
    console.log(selectedColor);

  } catch (err) {
    console.error(err);
  }
}
