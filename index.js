import{a as f,S as m,i as s}from"./assets/vendor-EBklf52_.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const y="https://pixabay.com/api/",g="32802293-5821b85c58537e1609d134566";function h(i){const o={key:g,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40};return f.get(y,{params:o}).then(r=>r.data).catch(r=>Promise.reject(r))}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),b=new m(".gallery a",{captionsData:"alt",captionDelay:250});function L(i){const o=i.map(({webformatURL:r,largeImageURL:a,tags:e,likes:t,views:n,comments:d,downloads:p})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img src="${r}" alt="${e}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${t}</p>
          <p><b>Views:</b> ${n}</p>
          <p><b>Comments:</b> ${d}</p>
          <p><b>Downloads:</b> ${p}</p>
        </div>
      </li>`).join("");l.insertAdjacentHTML("beforeend",o),b.refresh()}function S(){l.innerHTML=""}function q(){u.hidden=!1}function c(){u.hidden=!0}const v=document.querySelector(".form"),w=document.querySelector(".search-text");v.addEventListener("submit",async i=>{i.preventDefault();const o=w.value.trim();if(o===""){s.warning({title:"Увага",message:"Введіть слово для пошуку!",position:"topRight"});return}S(),q();try{const r=await h(o);if(r.hits.length===0){s.info({title:"Нічого не знайдено",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c();return}L(r.hits)}catch(r){s.error({title:"Помилка",message:"Виникла проблема з отриманням даних!",position:"topRight"}),console.error(r)}finally{c()}});
//# sourceMappingURL=index.js.map
