import "./styles.css";

const breeds = ["affenpinscher", "african", "airedale", "akita", "appenzeller"];

const container = document.getElementById("container");

/* if (document.readyState !== "loading") {
  console.log("eroor");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function async() {
    console.log("eroorr");
    initializeCode();
  });
} */
const createWikiItem = (breed, description, imgSrc) => {
  /*
  End result will look like this
  <div class="wiki-item" >
    <h1 class="wiki-header">Breed X</h1>
    <div class="wiki-content">
     <p class="wiki-text">
       Some text about this breed.
     </p>
     <div class="img-container">
       <img class="wiki-img" src="">
     </div>
    </div>
  </div>
  */
  const wikiItem = document.createElement("div");
  wikiItem.classList.add("wiki-item");

  const header = document.createElement("h1");
  header.classList.add("wiki-header");
  header.textContent = breed;
  wikiItem.appendChild(header);

  const content = document.createElement("div");
  content.classList.add("wiki-content");
  const text = document.createElement("p");
  text.classList.add("wiki-text");
  text.textContent = description;
  content.appendChild(text);
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  const img = document.createElement("img");
  img.classList.add("wiki-img");
  img.setAttribute("src", imgSrc);
  imgContainer.appendChild(img);
  content.appendChild(imgContainer);

  wikiItem.appendChild(content);
  container.appendChild(wikiItem);
};

async function fetchImageUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  return data.message;
}

async function fetchWikiDescription(breed) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`;
  const response = await fetch(url);
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  console.log(data);
  return data.extract;
}

async function initializeCode() {
  breeds.forEach(async (breed) => {
    const imgSrc = await fetchImageUrl(
      `https://dog.ceo/api/breed/${breed}/images`
    );
    /* const description = await fetchWikiDescription(breed); */
    const description =
      "Sed consequat nulla sed turpis consequat imperdiet. Mauris viverra, libero at volutpat eleifend, magna enim fringilla justo, vitae molestie ligula dolor in tellus. Etiam sodales, lorem in sodales ultrices, diam odio dictum elit, sed dignissim magna eros consectetur ex. Donec sollicitudin, nulla et accumsan commodo, sem ipsum porttitor urna, a commodo risus ipsum nec risus. Integer faucibus ac sem a condimentum. Etiam semper, purus eget fringilla cursus, ex libero eleifend neque, in posuere dui urna et enim. Phasellus egestas euismod finibus.";
    createWikiItem(
      breed,
      description,
      imgSrc[Math.floor(Math.random() * imgSrc.length)]
    );
  });

  /* for (let i = 0; i < 5; i++) {
    const imgSrc = await fetchImage("https://dog.ceo/api/breeds/image/random");

    createWikiItem(
      "random breed",
      "Sed consequat nulla sed turpis consequat imperdiet. Mauris viverra, libero at volutpat eleifend, magna enim fringilla justo, vitae molestie ligula dolor in tellus. Etiam sodales, lorem in sodales ultrices, diam odio dictum elit, sed dignissim magna eros consectetur ex. Donec sollicitudin, nulla et accumsan commodo, sem ipsum porttitor urna, a commodo risus ipsum nec risus. Integer faucibus ac sem a condimentum. Etiam semper, purus eget fringilla cursus, ex libero eleifend neque, in posuere dui urna et enim. Phasellus egestas euismod finibus.",
      imgSrc
    );
  } */
}

initializeCode();
