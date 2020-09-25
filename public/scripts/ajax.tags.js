import ApiHandler from "./apiHandler.js";

const tagApi = new ApiHandler("/collection");

const tagBox = document.querySelectorAll(".checkbox")

tagBox.forEach((element) => {
    element.addEventListener("change",  (evt) => {
        const currentButton = evt.currentTarget;
        const id = currentButton.getAttribute("data-tag-id");
})})

