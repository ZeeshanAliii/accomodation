// Fields enter modal pop up

const TheModalcontainer = document.querySelector(".hideandAnimateModal");

const Placeorder = document.querySelector(".ProceedButton");

function ShowtheModal() {
  TheModalcontainer.classList.toggle("showModal");
}

Placeorder.onclick = ShowtheModal;
