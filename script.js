document.querySelectorAll('a[href^="#"]').forEach(link=>{link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});closeMobileMenu()}})});

const menuButton=document.querySelector('.menu-button');
const mobileMenu=document.querySelector('.mobile-menu');
const closeButton=document.querySelector('.menu-close');

function openMobileMenu(){
    if(!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden','false');
    menuButton?.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden';
}

function closeMobileMenu(){
    if(!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden','true');
    menuButton?.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
}

menuButton?.addEventListener('click',openMobileMenu);
closeButton?.addEventListener('click',closeMobileMenu);

window.addEventListener('resize',()=>{
    if(window.innerWidth>800) closeMobileMenu();
});

document.addEventListener('keydown',e=>{
    if(e.key==='Escape') closeMobileMenu();
});
