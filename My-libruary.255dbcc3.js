!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,a.call(i.exports,i,i.exports),i.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},e.parcelRequired7c6=a);var i=a("dIxxU");const s=document.querySelector(".close__btn"),l=document.querySelector(".modal__backdrop"),o=document.querySelector(".gallery"),c=document.querySelector(".new-info");let u=0;s.addEventListener("click",d),l.addEventListener("click",(function(e){if(e.target!==l)return;d()})),o.addEventListener("click",(async function(e){if(!e.path.includes("li.card.gallery__item")){l.classList.remove("visually-hidden"),u=e.path.find((e=>"LI"===e.nodeName)).id;let t=await async function(e){const t=`https://api.themoviedb.org/3/movie/${e}?api_key=2913964819360854cc0ff757d62600b5&language=en-US`;return await i.default.get(t).then((e=>e.data))}(u);try{void 0!==t.original_title?(c.innerHTML="",function(e){const{poster_path:t,original_title:n,title:a,overview:i,popularity:s,vote_average:l,vote_count:o,genres:u}=e;let r=`https://image.tmdb.org/t/p/w780${t}`;null==t&&(r="./src/images/not-found.png");let d=u.map((e=>e.name)).join(", ");const p=`<div class="modal__img-thumb">\n        <img\n        class="modal__img"\n        src="${r}"\n        alt="${n}"\n        />\n        </div>\n        <div class="modal__info">\n        <h2 class="modal__title">${a}</h2>\n        <ul class="modal__table">\n        <li><span class="table__name">Vote / Votes</span><span class="table__value"><span class="orange">${Math.round(10*l)/10}</span> / <span class="grey">${o}</span></span></li>\n        <li><span class="table__name">Popularity</span><span class="table__value">${Math.round(10*s)/10}</span></li>\n        <li><span class="table__name">Original Title</span><span class="table__value">${n}</span></li>\n        <li><span class="table__name">Genre</span><span class="table__value">${d}</span></li>\n        </ul>\n        <h3 class="modal__about">about</h3>\n        <p class="modal__descr">${i}</p>\n        <ul class="modal__btns">\n        <li>\n        <button type="button" class="button wtchd_btn">\n        add to Watched\n        </button>\n        </li>\n        <li>\n        <button type="button" class="button queue_btn">add to queue</button>\n        </li>\n        <li>\n        <button type="button" class="button trailer__btn">watch trailer</button>\n        </li>\n        </ul>\n        </div>`;c.insertAdjacentHTML("beforeend",p)}(t),function(){const e=document.querySelector(".wtchd_btn"),t=document.querySelector(".queue_btn");e.addEventListener("click",p),t.addEventListener("click",_)}(),async function(e){const t=`https://api.themoviedb.org/3/movie/${e}/videos?api_key=2913964819360854cc0ff757d62600b5&language=en-US`;await i.default.get(t).then((e=>e.data))}(u)):(c.innerHTML="",alert("Sorry, nothing was found for your search."))}catch(e){console.log(e)}}}));let r={watchedList:[],queueList:[]};function d(){l.classList.add("visually-hidden")}function p(e){return r.queueList.includes(u)||r.watchedList.includes(u)?r.queueList.includes(u)&&b(u,r.queueList,r.watchedList):r.watchedList.push(u),localStorage.setItem("myLibraryList",JSON.stringify(r))}function _(e){return r.queueList.includes(u)||r.watchedList.includes(u)?r.watchedList.includes(u)&&b(u,r.watchedList,r.queueList):r.queueList.push(u),localStorage.setItem("myLibraryList",JSON.stringify(r))}function b(e,t,n){const a=t.indexOf(e);t.splice(a,1),n.push(e)}!function(){if(localStorage.getItem("myLibraryList")){const e=localStorage.getItem("myLibraryList");r=JSON.parse(e)}else r={watchedList:[],queueList:[]}}()}();
//# sourceMappingURL=My-libruary.255dbcc3.js.map
