const panel=document.querySelector('aside');
const pages=[...document.querySelectorAll('[data-mobile-page]')];

const closeMenu=()=>{
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
};

const pageFromHash=()=>{
  const requested=window.location.hash.slice(1);
  return pages.some(section=>section.dataset.mobilePage===requested)?requested:'home';
};

const showPage=(page,updateHistory=true)=>{
  const selected=pages.some(section=>section.dataset.mobilePage===page)?page:'home';
  pages.forEach(section=>section.classList.toggle('page-active',section.dataset.mobilePage===selected));
  document.querySelectorAll('nav a[href^="#"], aside a[href^="#"]').forEach(link=>{
    const active=link.getAttribute('href')===`#${selected}`;
    link.classList.toggle('active',active);
    if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
  });
  if(updateHistory)history.pushState({page:selected},'',selected==='home'?'#home':`#${selected}`);
  window.scrollTo({top:0,behavior:'smooth'});
  closeMenu();
};

document.querySelector('.menu').addEventListener('click',()=>{
  panel.classList.add('open');
  panel.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
});
document.querySelector('.close').addEventListener('click',closeMenu);

document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const target=document.querySelector(link.getAttribute('href'));
  if(!target)return;
  event.preventDefault();
  showPage(target.dataset.mobilePage||target.id||'home');
}));

window.addEventListener('popstate',()=>showPage(pageFromHash(),false));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
showPage(pageFromHash(),false);
