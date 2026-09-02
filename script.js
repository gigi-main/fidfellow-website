const panel=document.querySelector('aside');
const mobileQuery=window.matchMedia('(max-width: 850px)');
const mobilePages=[...document.querySelectorAll('[data-mobile-page]')];

const closeMenu=()=>{
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
};

const pageFromHash=()=>{
  const requested=window.location.hash.slice(1);
  return mobilePages.some(section=>section.dataset.mobilePage===requested)?requested:'home';
};

const showMobilePage=(page,updateHistory=true)=>{
  if(!mobileQuery.matches)return;
  const selected=mobilePages.some(section=>section.dataset.mobilePage===page)?page:'home';
  mobilePages.forEach(section=>section.classList.toggle('mobile-page-active',section.dataset.mobilePage===selected));
  document.querySelectorAll('aside a[href^="#"]').forEach(link=>{
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
  if(mobileQuery.matches){
    showMobilePage(target.dataset.mobilePage||target.id||'home');
  }else{
    target.scrollIntoView({behavior:'smooth'});
    closeMenu();
  }
}));

window.addEventListener('popstate',()=>showMobilePage(pageFromHash(),false));
mobileQuery.addEventListener('change',event=>{
  if(event.matches)showMobilePage(pageFromHash(),false);
  else mobilePages.forEach(section=>section.classList.remove('mobile-page-active'));
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
if(mobileQuery.matches)showMobilePage(pageFromHash(),false);
