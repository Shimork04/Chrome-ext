const btn = document.querySelector(".changeColorBtn");
const colorgrid = document.getElementById( "colorGrid" );
const colorValue = document.getElementById("colorValue");


// color-picker popup function
btn.addEventListener("click", async () => {
  console.log("Pick Color button clicked");

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pickColor,
  }, async(injectionResults) =>{

    // send chosen color back to the content script and then to the background page for storage in localStorage
    console.log(injectionResults); 
    const [data] = injectionResults;   
    if(data.result)
    {
        const color = data.result.sRGBHex;
        colorgrid.style.background = color;
        colorValue.value=color;
    }
    else
    {
        alert('Failed to get the color');
    };

  });
});

async function pickColor() {
  console.log("Script working Correctly");
  try {
    //pikcer
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
    console.log(selectedColor);

  } catch (err) {
    console.error(err);
  }
}
