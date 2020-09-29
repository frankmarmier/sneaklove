const tagInput = document.querySelectorAll(".tag-list-item input");
const productsGrid = document.getElementById("products_grid");
const tagListInput = document.querySelectorAll(".tag-list-item input");

let allTags = [];

tagListInput.forEach((tag) => {
  tag.addEventListener("click", () => {
    const tagId = tag.dataset.tagId;
    if (tag.checked) {
      allTags.push(tagId);
      console.log(allTags);
    } else {
      allTags = allTags.filter((tag) => tag != tagId);
      console.log(allTags);
    }
    filterProducts(allTags);
  });
});

function filterProducts(allTags) {
  axios
    // .get(`/sneakers/tag-filter/${tagID}`)
    .get(`/sneakers/tag-filter/`, {
      params: {
        tag: allTags,
      },
    })
    .then((filteredSneakers) => {
      console.log(filteredSneakers);
      displaySneakers(filteredSneakers.data);
    })
    .catch((error) => console.log(error));
}

function displaySneakers(sneakers) {
  productsGrid.innerHTML = "";
  sneakers.forEach((sneaker) => {
    productsGrid.innerHTML += `<a href="/one-product/{{this._id}}" class="product-item-wrapper">
      <div class="product-img">
          <img src="${sneaker.image}" alt="${sneaker.name}" : what a nice pair of kicks">
      </div>
      <p class="product-name">${sneaker.name}</p>
      <p class="product-cat">${sneaker.category}</p>
      <p class="product-price">${sneaker.price}</p>
  </a>`;
  });
}
