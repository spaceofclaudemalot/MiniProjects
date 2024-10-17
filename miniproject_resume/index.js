document.title = "LeBonCV | Concepteur de CV";
const pageTitle = document.querySelector(".title");
pageTitle.textContent = "LeBonCV";

document.querySelector(
  ".footer__botton"
).textContent = `Copyright © ${new Date().getFullYear()} ${
  pageTitle.textContent
}`;
