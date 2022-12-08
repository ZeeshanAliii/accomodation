// Filters
const filters = document.querySelectorAll(".filters");

filters.forEach(function (item) {
  item.addEventListener("click", function (event) {
    const TheValue = event.target.value;

    if (TheValue == "All") {
      displayAll(TheValue);
    } else {
      displayfilter(TheValue);
    }
  });
});

function displayAll(TheValue) {
  const TheContents = document.querySelectorAll(".TheCard");
  TheContents.forEach(function (TheContents) {
    TheContents.classList.remove("hide");
  });
}

function displayfilter(TheValue) {
  const TheContents = document.querySelectorAll(".TheCard");
  TheContents.forEach(function (TheContents) {
    const TheData = TheContents.getAttribute("data-id");
    if (TheValue == TheData) {
      TheContents.classList.remove("hide");
    } else {
      TheContents.classList.add("hide");
    }
  });
}

const PlaceFilters = document.querySelectorAll(".PlaceFilters");

PlaceFilters.forEach(function (item) {
  item.addEventListener("click", function (event) {
    const ThePlaceValue = event.target.value;

    if (ThePlaceValue == "AllPlaces") {
      displayAll(ThePlaceValue);
    } else {
      displayPlacefilter(ThePlaceValue);
    }
  });
});

// if making two functions with same things, dont have it the same name, eg, display all

function displayAll(ThePlaceValue) {
  const TheContentsPlaces = document.querySelectorAll(".TheCard");
  TheContentsPlaces.forEach(function (TheContentsPlaces) {
    TheContentsPlaces.classList.remove("hide");
  });
}

function displayPlacefilter(ThePlaceValue) {
  const TheContentsPlaces = document.querySelectorAll(".TheCard");
  TheContentsPlaces.forEach(function (TheContentsPlaces) {
    const ThePlaceData = TheContentsPlaces.getAttribute("data-place");
    if (ThePlaceValue == ThePlaceData) {
      TheContentsPlaces.classList.remove("hide");
    } else {
      TheContentsPlaces.classList.add("hide");
    }
  });
}

// calander

var picker = new Litepicker({
  element: document.getElementById("litepicker"),

  format: "DD-MMM-YYYY",

  minDate: Date.now(),

  singleMode: false,
});

picker.on("selected", (date1, date2) => {
  var theRangeInMillseconds = date2.dateInstance - date1.dateInstance;

  var numberOfMillsecondsInDay = 86400000;

  var nightsCounter = theRangeInMillseconds / numberOfMillsecondsInDay;

  console.log("Length of Booking = ", nightsCounter, " nights");
  chosenDay = date1.dateInstance.getDate();
});

// enter button display all

const contents = document.querySelector(".hidecontentfunction");

const enter = document.querySelector(".fieldenteredshowseverything");

function ShowAll() {
  contents.classList.toggle("FadeAnimation");
}

enter.onclick = ShowAll;

// show modal menu

const Modal = document.querySelector(".modal");
const closemodal = document.querySelector(".closeout");

function addEventListenerToAccomadations() {
  const checkoutButtons = document.querySelectorAll(".DetailsButton");
  for (let checkoutButton of checkoutButtons) {
    checkoutButton.onclick = changeModalContents;
  }
}

// thechanger/
function changeModalContents(event) {
  const modalTitle = document.querySelector("#modal-title");
  const modalDescription = document.querySelector("#modal-description");
  const modalPrice = document.querySelector("#modal-price");
  const modalImage = document.querySelector("#modal-image");

  for (let accomadation of accomadationsData)
    if (event.currentTarget.dataset.num == accomadation.id) {
      modalImage.src = accomadation.image;
      modalTitle.textContent = accomadation.title;
      modalDescription.textContent = accomadation.description;
      modalPrice.textContent = accomadation.price;
      // priceChanger.dataset.price = accomadation.price;
      // console.log(priceChanger);
      // PriceElement.dataset.price = accomadation.price;
      priceChanger = accomadation.price;
    }

  ShowModal();
}

function ShowModal() {
  Modal.classList.toggle("showModal");
}

closemodal.onclick = ShowModal;

// Maps
var myMap;

function initMap() {
  myMap = new google.maps.Map(document.querySelector(".map-container"), {
    center: { lat: -37.07440903937423, lng: 174.92682809779822 },
    // -36.85097141262606, 174.75188578380002    use this for targeting the map.  homework with add my marker, use your house, right click on map and copy it.
    zoom: 15,

    mapTypeId: "roadmap",
  });

  addMyMarker(-37.07440903937423, 174.92682809779822, "Destination");
}

function resetMap(newLat, newLng) {
  myMap.setCenter({ lat: newLat, lng: newLng });
}
// different looks =  Hybrid, SATTLITE, TERRIAN, ROADMAP

function addMyMarker(theLatitude, theLongitude, theMessage) {
  const theSpot = { lat: theLatitude, lng: theLongitude };

  const spotMarker = new google.maps.Marker({
    position: theSpot,

    map: myMap,
  });

  google.maps.event.addListener(spotMarker, "click", function () {
    var infoWindow = new google.maps.InfoWindow({ map: myMap });

    infoWindow.setContent(theMessage);

    infoWindow.open(myMap, spotMarker);
  });
}
// Maps

// check adds price more

const WifiElement = document.querySelector(".Modaladd-ons1");
const ACElement = document.querySelector(".Modaladd-ons2");
const PriceElement = document.querySelector(".ThemodalPrice");

var Wifiprice = 130;
var ACPrice = 120;
var priceChanger = parseInt(PriceElement.dataset.price);

WifiElement.addEventListener("change", Addition);

function Addition(event) {
  console.log(priceChanger);
  if (event.target.checked) {
    priceChanger = priceChanger + Wifiprice;
  } else {
    priceChanger = priceChanger - Wifiprice;
  }

  PriceElement.innerHTML = "$" + priceChanger;
}

ACElement.addEventListener("change", AdditionTwo);

function AdditionTwo(event) {
  if (event.target.checked) {
    priceChanger = priceChanger + ACPrice;
  } else {
    priceChanger = priceChanger - ACPrice;
  }

  PriceElement.innerHTML = "$" + priceChanger;
}

// looping contents for modal changer
let accomadationsData;
async function fetchAccomodationsData() {
  const response = await fetch("./data.json");
  const decode = await response.json();
  accomadationsData = decode.data;
  loopAccomodations(decode.data);
}

const contentsContainer = document.querySelector(".contents");

function loopAccomodations(accomadationsData) {
  let html = "";
  for (let accomadation of accomadationsData) {
    const template = `<div class="TheCard" data-id="${accomadation.dataId}" data-place="${accomadation.place}">

    

    
    <p class="Placename">${accomadation.title}</p>
    <img class="cardimg" src="${accomadation.image}" alt="" />
    
    <div>
    <p class="price">$${accomadation.price}</p>
    
    <button data-num="${accomadation.id}" class="DetailsButton">Details</button>
    </div>
    </div>`;
    html += template;
  }
  // add data and filter stuff on everything, fill in all of the json stuff,

  contentsContainer.innerHTML = html;
  addEventListenerToAccomadations();
}

fetchAccomodationsData();
