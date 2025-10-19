import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "loaders.css/loaders.min.css";

const galleryContainer = document.querySelector(".gallery");
const loaderElement = document.querySelector(".loader"); 
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});


export function createGallery(images) {
  if (!galleryContainer) return;

  const markup = images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <div class="photo-card">
              <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
                <p class="info-item"><b>Likes:</b> ${likes}</p>
                <p class="info-item"><b>Views:</b> ${views}</p>
                <p class="info-item"><b>Comments:</b> ${comments}</p>
                <p class="info-item"><b>Downloads:</b> ${downloads}</p>
              </div>
            </div>
          </a>
        </li>
      `;
    })
    .join("");

  galleryContainer.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = "";
  lightbox.refresh();
}

export function showLoader() {
  if (!loaderElement) return;
  loaderElement.classList.add("is-active");
}

export function hideLoader() {
  if (!loaderElement) return;
  loaderElement.classList.remove("is-active");
}
