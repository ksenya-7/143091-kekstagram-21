(()=>{"use strict";(()=>{const e=(e,t)=>Math.floor(e+Math.random()*(t+1-e));window.util={isEscape:e=>"Escape"===e.key,isEnter:e=>"Enter"===e.key,getRandom:e,getRandomFrom:t=>t[e(0,t.length-1)],createErrorMessage:e=>{let t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="15px",t.style.color="red",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},shuffleArray:e=>{for(let t=e.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e}}})(),(()=>{let e;window.debounce=t=>{e&&window.clearTimeout(e),e=window.setTimeout(t,500)}})(),(()=>{const e="https://21.javascript.pages.academy/kekstagram/data",t="https://21.javascript.pages.academy/kekstagram";window.backend={load:(t,r)=>{const s=new XMLHttpRequest;s.responseType="json",s.addEventListener("load",(()=>{let e;switch(s.status){case 200:t(s.response);break;case 400:e="Неверный запрос";break;case 401:e="Пользователь не авторизован";break;case 404:e="Ничего не найдено";break;default:e="Cтатус ответа: : "+s.status+" "+s.statusText}e&&r(e)})),s.addEventListener("error",(()=>{r("Произошла ошибка соединения")})),s.addEventListener("timeout",(()=>{r("Запрос не успел выполниться за "+s.timeout+"мс")})),s.timeout=1e4,s.open("GET",e),s.send()},save:(e,r,s)=>{const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(()=>{200===o.status?r(o.response):s(`Статус ответа: ${o.status} ${o.statusText}`)})),o.addEventListener("error",(()=>{window.successError.openErrorMessage()})),o.open("POST",t),o.send(e)}}})(),(()=>{const e=document.querySelector(".big-picture"),t=e.querySelector(".comments-loader"),r=e.querySelector(".social__comments"),s=e.querySelector("#picture-cancel"),o=r.querySelector(".social__comment").cloneNode(!0),n=e=>{const t=o.cloneNode(!0);return t.querySelector(".social__picture").src=e.avatar,t.querySelector(".social__picture").alt=e.name,t.querySelector(".social__picture").width="35",t.querySelector(".social__picture").height="35",t.querySelector(".social__text").textContent=e.message,t.classList.add("hidden"),t};window.renderBigPicture=o=>{e.querySelector("img").src=o.url,e.querySelector("img").alt=o.description,e.querySelector(".social__caption").textContent=o.description,e.querySelector(".likes-count").textContent=o.likes,e.querySelector(".comments-count").textContent=o.comments.length,r.innerHTML="",o.comments.map(n).forEach((e=>r.append(e))),t.classList.remove("hidden");let l=[];l=o.comments;const c=(e,t)=>{for(let r=0;r<e;r++)t[r].classList.remove("hidden")},a=r.querySelectorAll(".social__comment");let i=5;const d=(e,r,s)=>{e<r.length?(c(e,s),t.classList.remove("hidden")):(c(r.length,s),t.classList.add("hidden"))};d(i,a,a),t.addEventListener("click",(()=>{i+=5,d(i,l,a)})),e.querySelector(".social__comment-count").classList.add("hidden"),document.querySelector("body").classList.add("modal-open"),e.classList.remove("hidden");const u=t=>{window.util.isEscape(t)&&document.querySelector("body").classList.remove("modal-open"),e.classList.add("hidden")};return s.addEventListener("click",(()=>{e.classList.add("hidden"),document.removeEventListener("keydown",u),document.querySelector("body").classList.remove("modal-open")})),document.addEventListener("keydown",u),e}})(),(()=>{const e=document.querySelector("#picture").content.querySelector(".picture");window.renderPicture=t=>{const r=e.cloneNode(!0);return r.querySelector(".picture__img").src=t.url,r.querySelector(".picture__likes").textContent=t.likes,r.querySelector(".picture__comments").textContent=t.comments.length,r}})(),(()=>{const e=document.querySelector("body"),t=document.querySelector(".pictures"),r=document.querySelector(".img-filters"),s=r.querySelectorAll(".img-filters__button"),o=e=>{let t=0;return t+=e.comments.length,t},n=r=>{(e=>{const r=document.createDocumentFragment();e.map(window.renderPicture).forEach((e=>r.append(e))),t.append(r)})(r),e.classList.remove("modal-open"),((e,t)=>{for(let r=0;r<e.length;r++)e[r].addEventListener("click",(()=>{window.renderBigPicture(t[r])}))})(t.querySelectorAll(".picture"),r)},l={"filter-default":e=>{const t=(e=>e.slice())(e);a(),c(s),window.debounce(n(t))},"filter-random":e=>{const t=((e,t)=>window.util.shuffleArray(e.slice()).slice(0,10))(e);a(),c(s),window.debounce(n(t))},"filter-discussed":e=>{const t=(e=>e.slice().sort(((e,t)=>o(t)-o(e))))(e);a(),c(s),window.debounce(n(t))}},c=e=>{for(let t of e)t.classList.remove("img-filters__button--active")},a=()=>{t.querySelectorAll(".picture").forEach((e=>e.remove())),e.classList.remove("modal-open")};let i=[];window.successHandler=e=>{i=e,n(i),r.classList.remove("img-filters--inactive"),(e=>{for(let t of s)t.addEventListener("click",(r=>{l[r.target.id](e),t.classList.add("img-filters__button--active")}))})(i)}})(),(()=>{const e=document.querySelector(".img-upload__scale"),t=e.querySelector(".scale__control--smaller"),r=e.querySelector(".scale__control--bigger"),s=e.querySelector(".scale__control--value"),o=document.querySelector(".img-upload__preview img"),n=e=>{s.setAttribute("value",e+"%"),o.style.transform=`scale(${e/100})`};n(100),t.addEventListener("click",(()=>{const e=s.value,t=parseInt(e,10)-25;t>=25?n(t):s.setAttribute("value","25%")})),r.addEventListener("click",(()=>{const e=s.value,t=parseInt(e,10)+25;t<=100?n(t):s.setAttribute("value","100%")}))})(),(()=>{const e=document.querySelector(".img-upload__preview"),t=document.querySelectorAll(".effects__preview"),r=document.querySelectorAll(".effects__label"),s=document.querySelector(".img-upload__effect-level"),o=s.querySelector(".effect-level__value"),n=document.querySelector(".effect-level__pin"),l={none:()=>{i="none",e.classList.add("effects__preview--none"),s.style.display="none",e.style.filter="none"},chrome:()=>{i="chrome",e.classList.add("effects__preview--chrome"),e.style.filter="grayscale(1)",s.style.display="block"},sepia:()=>{i="sepia",e.classList.add("effects__preview--sepia"),e.style.filter="sepia(1)",s.style.display="block"},marvin:()=>{i="marvin",e.classList.add("effects__preview--marvin"),e.style.filter="invert(100%)",s.style.display="block"},phobos:()=>{i="phobos",e.classList.add("effects__preview--phobos"),e.style.filter="blur(3px)",s.style.display="block"},heat:()=>{i="heat",e.classList.add("effects__preview--heat"),e.style.filter="brightness(3)",s.style.display="block"}},c={none:()=>"none",chrome:e=>`grayscale(${e/100})`,sepia:e=>`sepia(${e/100})`,marvin:e=>`invert(${e}%)`,phobos:e=>`blur(${1+e/100*2}px)`,heat:e=>`brightness(${1+e/100*2})`},a={none:0,chrome:1,sepia:2,marvin:3,phobos:4,heat:5};let i,d;n.style.cursor="ew-resize",s.style.display="none";const u=e=>{n.style.left=e+"%",s.querySelector(".effect-level__depth").style.width=e+"%",o.value=e};document.querySelector(".img-upload__form").addEventListener("change",(s=>{d=100,o.value=d,e.className="img-upload__preview effects__preview--none",s.target&&s.target.matches('input[type="radio"]')&&(t.forEach((e=>{e.style.border="none"})),r.forEach((e=>{e.style.color="white"})),l[s.target.value](),t[a[s.target.value]].style.border="#ffe753",r[a[s.target.value]].style.color="#ffe753",u(d),o.value=""+d),i=s.target.value})),n.addEventListener("mousedown",(t=>{t.preventDefault();let r={x:t.clientX};const s=e=>{e.preventDefault();let t=r.x-e.clientX;r={x:e.clientX};const s=parseFloat(window.getComputedStyle(document.querySelector(".effect-level__line")).width);d=(n.offsetLeft-t)/s*100,d>100?d=100:d<0&&(d=0),u(d)},o=t=>{u(d),t.preventDefault(),e.style.filter=c[i](d),n.removeEventListener("mousemove",s),n.removeEventListener("mouseup",o)};n.addEventListener("mousemove",s),n.addEventListener("mouseup",o)})),window.cancelOldValues=()=>{e.style.filter="none",s.style.display="none",document.querySelector(".text__hashtags").value="",document.querySelector(".text__description").value="",d=100,document.querySelector(".scale__control--value").setAttribute("value","100%"),e.querySelector("img").style.transform="scale(1)",t.forEach((e=>{e.style.border="none"})),r.forEach((e=>{e.style.color="white"})),t[0].style.border="#ffe753",r[0].style.color="#ffe753"}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),r=t.querySelector(".success__button"),s=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),o=s.querySelector(".error__button"),n=(t,r,s,o,n)=>{e.append(t),r.addEventListener("click",s),document.addEventListener("keydown",o),document.addEventListener("click",n)},l=(e,t,r)=>{e.remove(),document.removeEventListener("keydown",t),document.removeEventListener("click",r)},c=()=>{l(t,a,i)},a=e=>{window.util.isEscape(e)&&(e.preventDefault(),l(t,a,i))},i=e=>{e.preventDefault(),l(t,a,i)},d=()=>{l(s,u,m)},u=e=>{window.util.isEscape(e)&&(e.preventDefault(),l(s,u,m))},m=e=>{e.preventDefault(),l(s,u,m)};window.successError={openSuccessMessage:()=>{n(t,r,c,a,i)},openErrorMessage:()=>{n(s,o,d,u,m)}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".img-upload__form"),r=t.querySelector("#upload-file"),s=t.querySelector("#upload-cancel"),o=t.querySelector(".img-upload__overlay"),n=o.querySelector(".text__hashtags"),l=o.querySelector(".text__description"),c=document.querySelector(".img-upload__start input[type=file]"),a=document.querySelector(".img-upload__preview img");let i=!0;c.addEventListener("change",(()=>{const t=c.files[0],r=t.name.toLowerCase();if(a.src="",i=e.some((e=>r.endsWith(e))),i){const e=new FileReader;e.addEventListener("load",(()=>{a.src=e.result})),e.addEventListener("error",window.successError.openErrorMessage),e.readAsDataURL(t)}})),r.addEventListener("change",(()=>{window.cancelOldValues(),o.classList.remove("hidden")}));const d=e=>{window.util.isEscape(e)&&e.target!==n&&e.target!==l&&(e.preventDefault(),o.classList.add("hidden"))};s.addEventListener("click",(()=>{window.cancelOldValues(),o.classList.add("hidden"),document.removeEventListener("keydown",d),r.value=""})),document.addEventListener("keydown",d);const u=/^\s*#*\w*$/,m=l.value;t.addEventListener("submit",(e=>{n.setCustomValidity(""),l.setCustomValidity("");const r=n.value.split(" "),s=new Set;for(let e of r)s.add(e.toLowerCase());const c=s.size<r.length,a=r.some((e=>!u.test(e))),d=r.some((e=>e.length>20));e.preventDefault(),a||r.length>5?(n.setCustomValidity("Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Нельзя указать больше пяти хэш-тегов."),n.style.border="1px solid red",window.util.createErrorMessage()):c?(n.setCustomValidity("Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. Один и тот же хэш-тег не может быть использован дважды."),n.style.border="1px solid red"):d?(n.setCustomValidity("Минимальная длина одного хэш-тега – 2 символа, максимальная длина – 20 символов, включая решётку."),n.style.border="1px solid red"):m.length>140?(l.setCustomValidity(`Максимальная длина комментария 140 символов. Удалите лишние ${m.length-140} симв.`),l.style.border="1px solid red"):i?window.backend.save(new FormData(t),(()=>{o.classList.add("hidden"),window.successError.openSuccessMessage()})):(o.classList.add("hidden"),window.successError.openErrorMessage())}))})(),window.backend.load(window.successHandler,window.util.createErrorMessage)})();