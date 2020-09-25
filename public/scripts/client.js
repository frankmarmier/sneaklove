const getCatText = document.querySelector("#category-text");

const newURL =
  window.location.protocol +
  "://" +
  window.location.host +
  "/" +
  window.location.pathname;

const pathArray = window.location.pathname.split("/");
let segment_category = pathArray[2];

if (segment_category === "men") {
  segment_category += "'s";
} else if (segment_category === "women") {
  segment_category += "'s";
} else if (segment_category === "collection") {
  segment_category = "";
} 
getCatText.innerHTML = segment_category;


const getCheckbox = document.querySelectorAll(".checkbox");

const filterCheck = getCheckbox.forEach((check) => {
  check.addEventListener("change", function () {
    if (this.checked) {
      initiateFilter(this.id);
    } else {
      fullList();
    }
  });
});

function initiateFilter(id) {
  axios
    .get("http://localhost:3000/ajax")
    .then((apiResponse) => {
      let getList = apiResponse.data.sneakers;

      let filterList = getList.filter(function (shoe) {
       
        console.log("input_" + shoe.id_tags, id);
        return "input_" + shoe.id_tags === id;
      });

      const getGrid = document.querySelector("#products_grid");
      getGrid.innerHTML = "";
      const getCount = document.querySelector("#products_count");
      getCount.innerHTML = `(${filterList.length})`;
      for (const shoe of filterList) {
        const oneSneaker = document.createElement("a");
        oneSneaker.setAttribute("href", `/one-product/${shoe._id}`);
        oneSneaker.className = "product-item-wrapper";
        oneSneaker.innerHTML += `
      <div class="product-img">
          <img src="${shoe.image}" alt="${shoe.name} : what a nice pair of kicks">
      </div>
      <p class="product-name">${shoe.name}</p>
      <p class="product-cat">${shoe.category}</p>
      <p class="product-price">${shoe.price}</p>
  `;
        getGrid.appendChild(oneSneaker);
      }
    })
    .catch((apiError) => {
      console.log(apiError);
    });
}

function fullList() {
  axios
    .get("http://localhost:3000/ajax")
    .then((apiResponse) => {
      let getList = apiResponse.data.sneakers;

      const getGrid = document.querySelector("#products_grid");
      getGrid.innerHTML = "";
      const getCount = document.querySelector("#products_count");
      getCount.innerHTML = `(${getList.length})`;
      for (const shoe of getList) {
        const oneSneaker = document.createElement("a");
        oneSneaker.setAttribute("href", `/one-product/${shoe._id}`);
        oneSneaker.className = "product-item-wrapper";
        oneSneaker.innerHTML += `
        <div class="product-img">
            <img src="${shoe.image}" alt="${shoe.name} : what a nice pair of kicks">
        </div>
        <p class="product-name">${shoe.name}</p>
        <p class="product-cat">${shoe.category}</p>
        <p class="product-price">${shoe.price}</p>
    `;
        getGrid.appendChild(oneSneaker);
      }
    })
    .catch((apiError) => {
      console.log(apiError);
    });
}
