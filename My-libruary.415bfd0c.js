function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},i={},s=t.parcelRequired7c6;null==s&&((s=function(e){if(e in a)return a[e].exports;if(e in i){var t=i[e];delete i[e];var s={id:e,exports:{}};return a[e]=s,t.call(s.exports,s,s.exports),s.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},t.parcelRequired7c6=s);var n=s("2shzp"),r=s("fb9GJ");let l=0;document.querySelector(".gallery--my-library");const c=document.querySelector(".film-card--my-library"),o=document.querySelector(".button-list__switch--queue"),d=document.querySelector(".button-list__switch--watched"),u=document.getElementById("pagination"),p=document.querySelector(".button-clearer");let g=0;const m=localStorage.getItem("myLibraryList");let y=JSON.parse(m);localStorage.getItem("myLibraryList")||(y={watchedList:[],queueList:[]},localStorage.setItem("myLibraryList",JSON.stringify(y))),p.addEventListener("click",(function(){alert("Do you want to clear my-library?"),h(),y={watchedList:[],queueList:[]},localStorage.setItem("myLibraryList",JSON.stringify(y))}));const f=async e=>await n.default.get(`https://api.themoviedb.org/3/movie/${e}?api_key=2913964819360854cc0ff757d62600b5&language=en-US`).then((e=>e.data));function L({title:e,release_date:t,poster_path:a,genres:i,id:s}){let n=t.slice(0,4);const r=`<li class="card gallery__item rotateY" id="${s}">\n    <a href="#" class="card__link">\n        <div class="card__wrapper-img">\n        <img class="card__img" src="https://image.tmdb.org/t/p/w780/${a}" alt="movie's poster">\n        </div>\n        <div class="card__wrapper">\n        <h3 class="card__title">${e}</h3>\n        <p class="card__info">${i.map((e=>e.name)).join(", ")} | <span class="card__info-genre">${n}</span></p>\n        </div>\n    </a>\n  </li>`;c.insertAdjacentHTML("beforeend",r)}function h(){c.innerHTML=""}d.addEventListener("click",(function(){l=0;const e=localStorage.getItem("myLibraryList"),t=JSON.parse(e);o.classList.remove("is-active"),d.classList.add("is-active"),w(t.watchedList)})),o.addEventListener("click",(function(){l=0;const e=localStorage.getItem("myLibraryList"),t=JSON.parse(e);o.classList.add("is-active"),d.classList.remove("is-active"),w(t.queueList)}));const b={totalItems:g=y.queueList.length>y.watchedList.length?y.queueList.length:y.watchedList.length,itemsPerPage:9,visiblePages:3,page:l,centerAlign:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}},_=new(e(r))(u,b);function v(e){let t=l+9;return(e.length<9||e.length-l<9)&&(t=e.length),t}async function w(e){h(),_.reset();for(let t=l;t<v(e);t++)await f(e[t]).then((e=>L(e)))}_.on("beforeMove",(e=>{l=e.page,l>1?l=9*(l-1):1===l&&(l-=1),c.innerHTML="",o.classList.contains("is-active")?w(y.queueList):w(y.watchedList)})),w(y.watchedList);
//# sourceMappingURL=My-libruary.415bfd0c.js.map
