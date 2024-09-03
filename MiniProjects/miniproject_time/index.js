const cursor = document.getElementById("cursor");
const timeContainer = document.getElementById("time-container");
const fontSelector = document.getElementById("font-selector");
const button = document.querySelectorAll(".btn");

// Moving pointer
window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// Getting current time
function currentTime() {
  let getTime = new Date();

  const currentHours =
    (getTime.getHours() < 10 ? "0" : "") + getTime.getHours();
  const currentMinutes =
    (getTime.getMinutes() < 10 ? "0" : "") + getTime.getMinutes();
  const currentSeconds =
    (getTime.getSeconds() < 10 ? "0" : "") + getTime.getSeconds();

  hours.textContent = currentHours;
  minutes.textContent = currentMinutes;
  seconds.textContent = currentSeconds;
}

// Change background color
function currentBackground() {
  document.body.style.background = `#${Math.floor(
    Math.random() * 0xffffff
  ).toString(16)}`;
}

// Change text color
function textColor() {
  const explainContainer = document.getElementById("explain-container");

  explainContainer.style.color = `#${Math.floor(
    Math.random() * 1.618 * 0xffffff
  ).toString(16)}`;
}

// +++++++++++++++++++++++ Click events +++++++++++++++++++++++

timeContainer.addEventListener("mouseover", () => {
  cursor.style.height = "144px";
});

timeContainer.addEventListener("mouseout", () => {
  cursor.style.height = "34px";
});

button.forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    cursor.style.height = "13px";
  });

  btn.addEventListener("mouseout", () => {
    cursor.style.height = "34px";
  });
});

window.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "font-1":
      timeContainer.style.fontFamily = "'Matemasie'";
      break;
    case "font-2":
      timeContainer.style.fontFamily = "'DynaPuff'";
      break;
    case "font-3":
      timeContainer.style.fontFamily = "'Libre Barcode 39 Extended Text'";
      break;
    default:
      null;
  }
});

// +++++++++++++++++++++++ Important +++++++++++++++++++++++++++
// the mistake is the missing quotes around the font family name.
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

setInterval(currentTime, 1000);
setInterval(currentBackground, 10000);
setInterval(textColor, 10000);

// +++++++++++++++++++++++ End of code +++++++++++++++++++++++
