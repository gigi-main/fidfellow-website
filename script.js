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

document.querySelectorAll('[data-product-target]').forEach(button=>button.addEventListener('click',()=>{
  const selected=button.dataset.productTarget;
  document.querySelectorAll('[data-product]').forEach(card=>card.classList.toggle('product-active',card.dataset.product===selected));
  document.querySelectorAll('[data-product-target]').forEach(tab=>{
    const active=tab===button;
    tab.classList.toggle('active',active);
    tab.setAttribute('aria-selected',String(active));
  });
}));

const structureSlider=document.querySelector('#structure-slider');
const simButtons=[...document.querySelectorAll('[data-sim-product]')];
const euro=value=>new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
let activeSimulation=simButtons[0];

const updateSimulation=()=>{
  if(!structureSlider||!activeSimulation)return;
  const count=Number(structureSlider.value);
  const rate=Number(activeSimulation.dataset.rate);
  const revenue=count*rate;
  const maxRevenue=100*rate;
  const endY=280-(revenue/maxRevenue)*220;
  const points=[0,.25,.5,.75,1].map((fraction,index)=>`${60+(720*fraction)} ${280-((revenue*fraction)/maxRevenue)*220}`);
  const linePath=`M${points.join(' L')}`;
  document.querySelector('#sim-count').textContent=count;
  document.querySelector('#sim-unit').textContent=activeSimulation.dataset.unit;
  document.querySelector('#sim-revenue').textContent=euro(revenue);
  document.querySelector('#sim-rate').textContent=euro(rate);
  document.querySelector('#slider-output').textContent=count;
  document.querySelector('#sim-axis-max').textContent=`€${Math.round(maxRevenue/1000)}K`;
  document.querySelector('#sim-line').setAttribute('d',linePath);
  document.querySelector('#sim-area').setAttribute('d',`${linePath} L780 280 L60 280 Z`);
  document.querySelector('#sim-point').setAttribute('cy',endY);
  structureSlider.style.setProperty('--range-progress',`${count}%`);
};

simButtons.forEach(button=>button.addEventListener('click',()=>{
  activeSimulation=button;
  simButtons.forEach(item=>item.classList.toggle('active',item===button));
  structureSlider.value=button.dataset.default;
  updateSimulation();
}));
if(structureSlider){structureSlider.addEventListener('input',updateSimulation);updateSimulation()}

window.addEventListener('popstate',()=>showPage(pageFromHash(),false));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
showPage(pageFromHash(),false);
