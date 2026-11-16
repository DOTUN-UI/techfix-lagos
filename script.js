const menu=document.getElementById('menu'),nav=document.getElementById('nav');
if(menu){menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)})}
const fb=document.querySelectorAll('.filters button'),cards=document.querySelectorAll('.card[data-cat]');
fb.forEach(b=>b.addEventListener('click',()=>{
fb.forEach(x=>x.setAttribute('aria-pressed',x===b));
cards.forEach(c=>{c.hidden=!(b.dataset.f==='all'||c.dataset.cat.includes(b.dataset.f))})}));
const form=document.getElementById('quote-form');
if(form){form.addEventListener('submit',e=>{
e.preventDefault();let ok=true;
const rules={name:v=>v.trim().length>=2||'Enter your full name.',
phone:v=>/^[0-9+\s]{10,15}$/.test(v.trim())||'Enter a valid phone number, for example 08012345678.',
device:v=>v!==''||'Choose your device.',
message:v=>v.trim().length>=10||'Describe the problem in at least 10 characters.'};
for(const k in rules){const f=form.elements[k],r=rules[k](f.value),er=document.getElementById('err-'+k);
er.textContent=r===true?'':r;f.classList.toggle('bad',r!==true);if(r!==true)ok=false}
const s=document.getElementById('ok');s.hidden=!ok;
if(ok){form.reset()}})}
