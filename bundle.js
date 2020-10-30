(()=>{"use strict";(()=>{const e=(e,t)=>Math.floor(e+Math.random()*(t+1-e));window.util={isEscape:e=>"Escape"===e.key,isEnter:e=>"Enter"===e.key,getRandom:e,getRandomFrom:t=>t[e(0,t.length-1)],shuffleElements:e=>{for(let t=e.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e}}})(),window.debounce=e=>{let t=null;return(...r)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...r)}),500)}},(()=>{const e="https://21.javascript.pages.academy/kekstagram/data",t="https://21.javascript.pages.academy/kekstagram";window.backend={load:(t,r)=>{const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(()=>{let e;switch(o.status){case 200:t(o.response);break;case 400:e="Неверный запрос";break;case 401:e="Пользователь не авторизован";break;case 404:e="Ничего не найдено";break;default:e="Cтатус ответа: : "+o.status+" "+o.statusText}e&&r(e)})),o.addEventListener("error",(()=>{r("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{r("Запрос не успел выполниться за "+o.timeout+"мс")})),o.timeout=1e4,o.open("GET",e),o.send()},save:(e,r,o)=>{const s=new XMLHttpRequest;s.responseType="json",s.addEventListener("load",(()=>{let e;switch(s.status){case 200:r(s.response);break;case 400:e="Неверный запрос";break;case 401:e="Пользователь не авторизован";break;case 404:e="Ничего не найдено";break;default:e="Cтатус ответа: : "+s.status+" "+s.statusText}e&&o(e)})),s.addEventListener("error",(()=>{window.successError.openErrorMessage()})),s.open("POST",t),s.send(e)}}})(),(()=>{const e=document.querySelector(".big-picture"),t=e.querySelector(".comments-loader"),r=e.querySelector(".social__comments"),o=e.querySelector("#picture-cancel"),s=r.querySelector(".social__comment").cloneNode(!0),n=e=>{const t=s.cloneNode(!0);return t.querySelector(".social__picture").src=e.avatar,t.querySelector(".social__picture").alt=e.name,t.querySelector(".social__picture").width="35",t.querySelector(".social__picture").height="35",t.querySelector(".social__text").textContent=e.message,t.classList.add("hidden"),t};window.renderBigPicture=s=>{e.querySelector("img").src=s.url,e.querySelector("img").alt=s.description,e.querySelector(".social__caption").textContent=s.description,e.querySelector(".likes-count").textContent=s.likes,e.querySelector(".comments-count").textContent=s.comments.length,r.innerHTML="",s.comments.map(n).forEach((e=>r.append(e))),t.classList.remove("hidden");let l=[];l=s.comments;const c=(e,t)=>{for(let r=0;r<e;r++)t[r].classList.remove("hidden")},a=r.querySelectorAll(".social__comment");let i=5;const d=(e,r,o)=>{e<r.length?(c(e,o),t.classList.remove("hidden")):(c(r.length,o),t.classList.add("hidden"))};d(i,a,a),t.addEventListener("click",(()=>{i+=5,d(i,l,a)})),e.querySelector(".social__comment-count").classList.add("hidden"),document.querySelector("body").classList.add("modal-open"),e.classList.remove("hidden");const u=t=>{window.util.isEscape(t)&&document.querySelector("body").classList.remove("modal-open"),e.classList.add("hidden")};return o.addEventListener("click",(()=>{e.classList.add("hidden"),document.removeEventListener("keydown",u),document.querySelector("body").classList.remove("modal-open")})),document.addEventListener("keydown",u),e}})(),(()=>{const e=document.querySelector("#picture").content.querySelector(".picture");window.renderPicture=t=>{const r=e.cloneNode(!0);return r.querySelector(".picture__img").src=t.url,r.querySelector(".picture__likes").textContent=t.likes,r.querySelector(".picture__comments").textContent=t.comments.length,r}})(),(()=>{const e=document.querySelector("body"),t=document.querySelector(".pictures"),r=document.querySelector(".img-filters"),o=r.querySelectorAll(".img-filters__button"),s=e=>{let t=0;return t+=e.comments.length,t},n=r=>{(e=>{const r=document.createDocumentFragment();e.map(window.renderPicture).forEach((e=>r.append(e))),t.append(r)})(r),e.classList.remove("modal-open"),((e,t)=>{for(let r=0;r<e.length;r++)e[r].addEventListener("click",(()=>{window.renderBigPicture(t[r])}))})(t.querySelectorAll(".picture"),r)},l={"filter-default":e=>{const t=(e=>e.slice())(e);a(),c(o),window.debounce(n(t))},"filter-random":e=>{const t=((e,t)=>window.util.shuffleElements(e.slice()).slice(0,10))(e);a(),c(o),window.debounce(n(t))},"filter-discussed":e=>{const t=(e=>e.slice().sort(((e,t)=>s(t)-s(e))))(e);a(),c(o),window.debounce(n(t))}},c=e=>{for(let t of e)t.classList.remove("img-filters__button--active")},a=()=>{t.querySelectorAll(".picture").forEach((e=>e.remove())),e.classList.remove("modal-open")};let i=[];window.successHandler=e=>{i=e,n(i),r.classList.remove("img-filters--inactive"),(e=>{for(let t of o)t.addEventListener("click",(r=>{l[r.target.id](e),t.classList.add("img-filters__button--active")}))})(i)}})(),(()=>{const e=document.querySelector(".img-upload__scale"),t=e.querySelector(".scale__control--smaller"),r=e.querySelector(".scale__control--bigger"),o=e.querySelector(".scale__control--value"),s=document.querySelector(".img-upload__preview img"),n=e=>{o.setAttribute("value",e+"%"),s.style.transform=`scale(${e/100})`};n(100),t.addEventListener("click",(()=>{const e=o.value,t=parseInt(e,10)-25;t>=25?n(t):o.setAttribute("value","25%")})),r.addEventListener("click",(()=>{const e=o.value,t=parseInt(e,10)+25;t<=100?n(t):o.setAttribute("value","100%")}))})(),(()=>{const e=document.querySelector(".img-upload__preview"),t=document.querySelectorAll(".effects__preview"),r=document.querySelectorAll(".effects__label"),o=document.querySelector(".img-upload__effect-level"),s=o.querySelector(".effect-level__value"),n=document.querySelector(".effect-level__pin"),l={none:()=>{i="none",e.classList.add("effects__preview--none"),o.style.display="none",e.style.filter="none"},chrome:()=>{i="chrome",e.classList.add("effects__preview--chrome"),e.style.filter="grayscale(1)",o.style.display="block"},sepia:()=>{i="sepia",e.classList.add("effects__preview--sepia"),e.style.filter="sepia(1)",o.style.display="block"},marvin:()=>{i="marvin",e.classList.add("effects__preview--marvin"),e.style.filter="invert(100%)",o.style.display="block"},phobos:()=>{i="phobos",e.classList.add("effects__preview--phobos"),e.style.filter="blur(3px)",o.style.display="block"},heat:()=>{i="heat",e.classList.add("effects__preview--heat"),e.style.filter="brightness(3)",o.style.display="block"}},c={none:()=>"none",chrome:e=>`grayscale(${e/100})`,sepia:e=>`sepia(${e/100})`,marvin:e=>`invert(${e}%)`,phobos:e=>`blur(${1+e/100*2}px)`,heat:e=>`brightness(${1+e/100*2})`},a={none:0,chrome:1,sepia:2,marvin:3,phobos:4,heat:5};let i,d;n.style.cursor="ew-resize",o.style.display="none";const u=e=>{n.style.left=e+"%",o.querySelector(".effect-level__depth").style.width=e+"%",s.value=e};document.querySelector(".img-upload__form").addEventListener("change",(o=>{d=100,s.value=d,e.className="img-upload__preview effects__preview--none",o.target&&o.target.matches('input[type="radio"]')&&(t.forEach((e=>{e.style.border="none"})),r.forEach((e=>{e.style.color="white"})),l[o.target.value](),t[a[o.target.value]].style.border="#ffe753",r[a[o.target.value]].style.color="#ffe753",u(d),s.value=""+d),i=o.target.value})),n.addEventListener("mousedown",(t=>{t.preventDefault();let r={x:t.clientX};const o=e=>{e.preventDefault();let t=r.x-e.clientX;r={x:e.clientX};const o=parseFloat(window.getComputedStyle(document.querySelector(".effect-level__line")).width);d=(n.offsetLeft-t)/o*100,d>100?d=100:d<0&&(d=0),u(d)},s=t=>{u(d),t.preventDefault(),e.style.filter=c[i](d),n.removeEventListener("mousemove",o),document.removeEventListener("mouseup",s)};n.addEventListener("mousemove",o),document.addEventListener("mouseup",s)})),window.cancelOldValues=()=>{document.querySelector(".text__hashtags").style.border="none",document.querySelector(".text__description").style.border="none",document.querySelector("#upload-file").value="",e.style.filter="none",o.style.display="none",document.querySelector(".text__hashtags").value="",document.querySelector(".text__description").value="",d=100,document.querySelector(".scale__control--value").setAttribute("value","100%"),e.querySelector("img").style.transform="scale(1)",t.forEach((e=>{e.style.border="none"})),r.forEach((e=>{e.style.color="white"})),t[0].style.border="#ffe753",r[0].style.color="#ffe753"}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),r=t.querySelector(".success__button"),o=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),s=o.querySelector(".error__button"),n=o.querySelector(".error__title"),l=(t,r,o,s,n)=>{e.append(t),r.addEventListener("click",o),document.addEventListener("keydown",s),document.addEventListener("click",n)},c=(e,t,r)=>{e.remove(),document.removeEventListener("keydown",t),document.removeEventListener("click",r)},a=()=>{c(t,i,d)},i=e=>{window.util.isEscape(e)&&(e.preventDefault(),c(t,i,d))},d=e=>{e.preventDefault(),c(t,i,d)},u=()=>{c(o,m,y)},m=e=>{window.util.isEscape(e)&&(e.preventDefault(),c(o,m,y))},y=e=>{e.preventDefault(),c(o,m,y)};window.successError={openSuccessMessage:()=>{l(t,r,a,i,d)},openCreatedErrorMessage:t=>{((t,r,o,s,l,c)=>{n.textContent=t,e.append(r),o.addEventListener("click",s),document.addEventListener("keydown",l),document.addEventListener("click",c)})(t,o,s,u,m,y)},openErrorMessage:()=>{l(o,s,u,m,y)}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".img-upload__form"),r=t.querySelector("#upload-file"),o=t.querySelector("#upload-cancel"),s=t.querySelector(".img-upload__overlay"),n=s.querySelector(".text__hashtags"),l=s.querySelector(".text__description"),c=document.querySelector(".img-upload__start input[type=file]"),a=document.querySelector(".img-upload__preview img");let i=!0;c.addEventListener("change",(()=>{const t=c.files[0],r=t.name.toLowerCase();if(a.src="",i=e.some((e=>r.endsWith(e))),i){const e=new FileReader;e.addEventListener("load",(()=>{a.src=e.result})),e.addEventListener("error",window.successError.openErrorMessage),e.readAsDataURL(t)}}));const d=e=>{window.util.isEscape(e)&&e.target!==n&&e.target!==l&&(e.preventDefault(),window.cancelOldValues(),s.classList.add("hidden")),document.removeEventListener("keydown",d),o.removeEventListener("click",u)},u=()=>{window.cancelOldValues(),s.classList.add("hidden"),document.removeEventListener("keydown",d),o.removeEventListener("click",u)};r.addEventListener("change",(()=>{s.classList.remove("hidden"),o.addEventListener("click",u),document.addEventListener("keydown",d)}));const m=/^\s*#\w*$/;t.addEventListener("submit",(e=>{const r=n.value.split(" "),o=l.value,c=new Set;for(let e of r)c.add(e.toLowerCase());const a=c.size<r.length,d=""!==n.value&&r.some((e=>!m.test(e))),u=r.some((e=>e.length>20)),y=o.length>140;t.addEventListener("keydown",(()=>{n.setCustomValidity(""),l.setCustomValidity(""),n.style.border="none",l.style.border="none",n.reportValidity(),l.reportValidity()})),e.preventDefault(),d||r.length>5?(n.setCustomValidity("Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Нельзя указать больше пяти хэш-тегов."),n.style.border="1px solid red"):a?(n.setCustomValidity("Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. Один и тот же хэш-тег не может быть использован дважды."),n.style.border="1px solid red"):u?(n.setCustomValidity("Минимальная длина одного хэш-тега – 2 символа, максимальная длина – 20 символов, включая решётку."),n.style.border="1px solid red"):y?(l.setCustomValidity(`Максимальная длина комментария 140 символов. Удалите лишние ${o.length-140} симв.`),l.style.border="1px solid red"):i?window.backend.save(new FormData(t),(()=>{s.classList.add("hidden"),window.cancelOldValues(),window.successError.openSuccessMessage()})):(s.classList.add("hidden"),window.successError.openErrorMessage()),t.reportValidity()}))})(),window.backend.load(window.successHandler,window.successError.openCreatedErrorMessage)})();