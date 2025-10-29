import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const input = document.querySelector(".search-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (query === "") {
    iziToast.warning({
      title: "Увага",
      message: "Введіть слово для пошуку!",
      position: "topRight",
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.info({
        title: "Нічого не знайдено",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      hideLoader();
      return;
    }

    createGallery(data.hits);
  } catch (error) {
    iziToast.error({
      title: "Помилка",
      message: "Виникла проблема з отриманням даних!",
      position: "topRight",
    });
    console.error(error);
  } finally {
    hideLoader();
  }
});
