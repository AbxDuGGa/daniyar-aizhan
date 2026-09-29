// The reference content is temporary. Never submit responses to the reference owner.
window.addEventListener('submit',function(event){event.preventDefault();event.stopImmediatePropagation();sendResponse(event.target);},true);
window.addEventListener('click',function(event){const b=event.target.closest('button[type="submit"],input[type="submit"]');if(b&&b.form){event.preventDefault();event.stopImmediatePropagation();sendResponse(b.form)}},true);
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a[href]').forEach(a=>{if(/invitedesiign\.kz/.test(a.href)){a.removeAttribute('href');a.setAttribute('aria-hidden','true')}});const observer=new MutationObserver(()=>{for(const f of document.forms){if(f.dataset.previewSafe)continue;f.dataset.previewSafe='true';f.removeAttribute('action');f.querySelectorAll('input[name="formservices[]"]').forEach(e=>e.remove());f.querySelectorAll('input[type=text]').forEach(i=>{if(!i.name.includes('spec')){i.required=true;i.maxLength=120;i.autocomplete='name'}});const note=document.createElement('p');note.className='preview-note';note.textContent=window.RSVP_ENDPOINT?'Ваш ответ увидят только организаторы.':'Приём ответов скоро откроется.';f.append(note)}});observer.observe(document.body,{childList:true,subtree:true});
const audio=document.querySelector('audio');if(audio){audio.loop=true;audio.volume=0.4;

const b=document.createElement('button');b.className='music-toggle';b.type='button';b.textContent='♫';b.setAttribute('aria-label','Включить музыку');document.body.append(b);function state(){b.setAttribute('aria-pressed',String(!audio.paused));b.setAttribute('aria-label',audio.paused?'Включить музыку':'Выключить музыку');b.classList.toggle('playing',!audio.paused)}audio.addEventListener('play',state);audio.addEventListener('pause',state);b.addEventListener('click',e=>{e.stopPropagation();if(audio.paused)audio.play().catch(()=>{});else audio.pause()});}
});

// A single viewport-sized curtain avoids independent Tilda image heights.
document.addEventListener('DOMContentLoaded',()=>{
 const cover=document.createElement('div');cover.className='curtain-cover';
 cover.innerHTML='<div class="curtain-panel curtain-left"><img src="assets/curtain-white.png" alt=""></div><div class="curtain-panel curtain-right"><img src="assets/curtain-white.png" alt=""></div><button class="curtain-open" type="button" aria-label="Открыть приглашение"><img src="assets/asset-14.png" alt=""><span>Нажмите,<br>чтобы открыть</span></button>';
 document.body.append(cover);document.documentElement.classList.add('curtains-closed');
 cover.querySelector('button').addEventListener('click',()=>{
  document.querySelector('audio')?.play().catch(()=>{});
  cover.classList.add('is-open');document.documentElement.classList.remove('curtains-closed');
  setTimeout(()=>cover.remove(),1500);
 },{once:true});
});
const pendingResponses=new WeakMap();
async function sendResponse(form){
 if(!form.reportValidity()||form.dataset.sending==='true')return;
 let result=form.querySelector('.preview-response');if(!result){result=document.createElement('p');result.className='preview-response';result.setAttribute('role','status');result.setAttribute('aria-live','polite');form.append(result)}
 if(!window.RSVP_ENDPOINT){result.textContent='Приём ответов пока не подключён. Пожалуйста, попробуйте позже.';return}
 const name=Array.from(form.querySelectorAll('input[type=text]')).find(i=>!i.name.includes('spec'))?.value.trim();
 const selected=form.querySelector('input[type=radio]:checked');
 if(!name||!selected){result.textContent='Укажите имя и выберите, сможете ли вы прийти.';return}
 const options=Array.from(form.querySelectorAll('input[type=radio]'));const attendance=['alone','couple','no'][options.indexOf(selected)];
 const previous=pendingResponses.get(form);const payload=previous&&previous.name===name&&previous.attendance===attendance?previous:{id:crypto.randomUUID(),name,attendance};pendingResponses.set(form,payload);
 const button=form.querySelector('button[type=submit],input[type=submit]');form.dataset.sending='true';if(button)button.disabled=true;result.textContent='Отправляем ответ…';
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
 try{const response=await fetch(window.RSVP_ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),signal:controller.signal,redirect:'follow'});const data=await response.json();if(!response.ok||data.ok!==true||data.id!==payload.id)throw Error('Not confirmed');result.textContent='Спасибо! Ваш ответ сохранён.';form.dataset.sent='true';}
 catch{result.textContent='Не удалось подтвердить отправку. Проверьте интернет и нажмите «Отправить» ещё раз.';}
 finally{clearTimeout(timer);form.dataset.sending='false';if(button)button.disabled=false;}
}
document.addEventListener('DOMContentLoaded',()=>{
 const dialog=document.createElement('dialog');dialog.className='rsvp-reminder';dialog.setAttribute('aria-labelledby','rsvp-reminder-title');
 dialog.innerHTML='<button type="button" class="reminder-close" aria-label="Закрыть">×</button><p class="reminder-kicker">Данияр × Айжан</p><h2 id="rsvp-reminder-title">Будем ждать вашего ответа</h2><p>Перед тем как посмотреть маршрут, не забудьте подтвердить присутствие.</p><button type="button" class="reminder-confirm">Подтвердить присутствие ↓</button><a class="reminder-map" target="_blank" rel="noopener">Открыть карту</a>';
 document.body.append(dialog);let sourceLink;let movingToForm=false;
 dialog.querySelector('.reminder-close').onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 dialog.querySelector('.reminder-map').onclick=()=>dialog.close();
 dialog.querySelector('.reminder-confirm').onclick=()=>{movingToForm=true;dialog.close();const f=document.getElementById('form2008532863');f?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});};
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.classList.contains('reminder-map')||!a.href.startsWith('https://2gis.kz/'))return;if(document.querySelector('form[data-sent="true"]'))return;e.preventDefault();e.stopPropagation();sourceLink=a;dialog.querySelector('.reminder-map').href=a.href;dialog.showModal();},true);
 dialog.addEventListener('close',()=>{if(!movingToForm)sourceLink?.focus({preventScroll:true});movingToForm=false;});
});

// Reveal once; returning up the page never resets content to transparent.
document.addEventListener('DOMContentLoaded',()=>{
 const reveal=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('content-revealed');reveal.unobserve(entry.target)}}},{threshold:0});
 document.querySelectorAll('.personal-layer').forEach(el=>reveal.observe(el));
});

// Clip only the unused artboard tail; use actual rendered caption bounds.
window.addEventListener('load',()=>{
 const records=document.getElementById('allrecords');
 const end=document.querySelector('.final-caption');
 if(!records||!end)return;
 const fit=()=>{const h=Math.ceil(end.getBoundingClientRect().bottom-records.getBoundingClientRect().top+48);if(h>500){records.style.height=h+'px';records.style.overflow='clip';}};
 requestAnimationFrame(()=>requestAnimationFrame(fit));
 document.fonts?.ready.then(fit);
 window.addEventListener('resize',()=>requestAnimationFrame(fit));
});
