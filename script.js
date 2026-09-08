const panel=document.querySelector('aside');
const menu=document.querySelector('.menu');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const closeMenu=(restoreFocus=false)=>{
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden','true');
  panel.inert=true;
  menu.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
  if(restoreFocus)menu.focus();
};
menu.addEventListener('click',()=>{
  panel.inert=false;
  panel.classList.add('open');
  panel.setAttribute('aria-hidden','false');
  menu.setAttribute('aria-expanded','true');
  document.body.style.overflow='hidden';
  panel.querySelector('.close').focus();
});
document.querySelector('.close').addEventListener('click',()=>closeMenu(true));
panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu(true)));
document.addEventListener('keydown',event=>{
  if(!panel.classList.contains('open'))return;
  if(event.key==='Escape')closeMenu(true);
  if(event.key==='Tab'){
    const items=[...panel.querySelectorAll('button,a[href]')];
    if(event.shiftKey&&document.activeElement===items[0]){event.preventDefault();items.at(-1).focus()}
    else if(!event.shiftKey&&document.activeElement===items.at(-1)){event.preventDefault();items[0].focus()}
  }
});
window.matchMedia('(min-width: 851px)').addEventListener('change',event=>{if(event.matches)closeMenu()});
const hero=document.querySelector('.hero');
let scheduled=false;
const paintScroll=()=>{
  const progress=Math.max(0,Math.min(1,window.scrollY/(hero.offsetHeight-window.innerHeight||1)));
  hero.style.setProperty('--journey',reducedMotion.matches?0:progress);
  document.querySelector('header').classList.toggle('scrolled',window.scrollY>50);
  scheduled=false;
};
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(paintScroll)}},{passive:true});
window.addEventListener('resize',paintScroll);
reducedMotion.addEventListener('change',paintScroll);
paintScroll();
const sections=[...document.querySelectorAll('main > section[id]')];
const navigationObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    document.querySelectorAll('nav a,aside a').forEach(link=>{
      const active=link.hash==='#'+entry.target.id;
      link.classList.toggle('active',active);
      if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
  });
},{rootMargin:'-20% 0px -45% 0px'});
sections.forEach(section=>navigationObserver.observe(section));

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


// Keyboard navigation for the product tabs.
const productTabs=[...document.querySelectorAll('[data-product-target]')];
productTabs.forEach((tab,index)=>{
  tab.id='tab-'+tab.dataset.productTarget;
  tab.setAttribute('aria-controls','product-'+tab.dataset.productTarget);
  tab.tabIndex=index===0?0:-1;
  const card=document.querySelector('[data-product="'+tab.dataset.productTarget+'"]');
  card.id='product-'+tab.dataset.productTarget;
  card.setAttribute('role','tabpanel');
  card.setAttribute('aria-labelledby',tab.id);
  tab.addEventListener('click',()=>productTabs.forEach(item=>item.tabIndex=item===tab?0:-1));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%productTabs.length;
    if(event.key==='ArrowLeft')next=(index+productTabs.length-1)%productTabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=productTabs.length-1;
    if(next!==undefined){event.preventDefault();productTabs[next].focus();productTabs[next].click()}
  });
});
document.querySelector('.sim-products').removeAttribute('role');
simButtons.forEach(button=>{
  button.setAttribute('aria-pressed',String(button===activeSimulation));
  button.addEventListener('click',()=>simButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button))));
});
