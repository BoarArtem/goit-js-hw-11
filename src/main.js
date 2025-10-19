import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions.js"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form ? form.querySelector('input[name="search-text"]') : null;
const galleryEl = document.querySelector(".gallery");

if (!form || !input || !galleryEl) {
  console.error("Не знайдено потрібних DOM-елементів: форма / інпут / галерея.");
  iziToast.error({
    title: "Помилка",
    message: "Не знайдено елементів інтерфейсу. Перевірте HTML.",
    position: "topRight",
  });
}

if (form) {
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const query = input.value.trim();

    if (!query) {
      iziToast.warning({
        title: "Увага",
        message: "Поле пошуку порожнє. Введіть пошукове слово.",
        position: "topRight",
      });
      return;
    }

    clearGallery();
    showLoader();
    getImagesByQuery(query)
      .then(data => {
        if (!data || !Array.isArray(data.hits)) {
          iziToast.error({
            title: "Помилка",
            message: "Невірний формат відповіді від сервера.",
            position: "topRight",
          });
          return;
        }

        if (data.hits.length === 0) {
          iziToast.info({
            title: "Пошук",
            message:
              "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
          });
          return;
        }

        createGallery(data.hits);
        iziToast.success({
          title: "Знайдено",
          message: `Знайдено ${data.hits.length} зображень за запитом "${query}".`,
          position: "topRight",
        });
      })
      .catch(error => {
        console.error("Помилка запиту:", error);
        iziToast.error({
          title: "Помилка запиту",
          message:
            "Сталася помилка під час завантаження зображень. Перевірте підключення та API-ключ.",
          position: "topRight",
        });
      })
      .finally(() => {
        hideLoader();
      });
  });
}
