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

const translations={
    it:{
        'nav.about':'Chi siamo','nav.what':'Cosa facciamo','nav.projects':'Progetti','nav.contact':'Contatti',
        'hero.label':'FIDFELLOW / DIGITAL VENTURES','hero.title':'BUILDING<br><span>DIGITAL</span> VENTURES.','hero.text':'Creiamo idee, costruiamo prodotti e sviluppiamo nuove opportunità nel mondo digitale.','hero.button':'Scopri di più <span>→</span>','hero.contact':'Contattaci',
        'about.label':'01 / CHI SIAMO','about.title':'Idee che diventano <span>imprese digitali.</span>','about.p1':'FidFellow è un venture studio dedicato alla creazione e allo sviluppo di nuovi progetti digitali.','about.p2':"Partiamo da un'idea, analizziamo il problema, costruiamo il prodotto e trasformiamo l'opportunità in un progetto concreto.",
        'services.label':'02 / COSA FACCIAMO','service1.title':'Venture<br>Building','service1.text':'Trasformiamo idee e opportunità in nuovi business digitali, dalla prima intuizione fino al lancio.','service2.title':'Product<br>Development','service2.text':'Progettiamo e sviluppiamo prodotti digitali moderni, semplici da usare e pronti per crescere.','service3.title':'Digital<br>Growth','service3.text':'Costruiamo strategie e sistemi per aiutare i progetti a trovare il mercato e creare valore.',
        'projects.label':'03 / PROGETTI','projects.text':'Stiamo costruendo una nuova generazione di prodotti digitali.','projects.coming':'Nuovi progetti digitali in costruzione.',
        'cta.title':"Hai un'idea? <span>Costruiamola.</span>",'cta.text':'Parliamo del tuo progetto, della tua idea o della prossima opportunità digitale.','cta.button':'Inizia una conversazione <span>→</span>'
    },
    en:{
        'nav.about':'About us','nav.what':'What we do','nav.projects':'Projects','nav.contact':'Contact',
        'hero.label':'FIDFELLOW / DIGITAL VENTURES','hero.title':'BUILDING<br><span>DIGITAL</span> VENTURES.','hero.text':'We create ideas, build products and develop new opportunities in the digital world.','hero.button':'Discover more <span>→</span>','hero.contact':'Contact us',
        'about.label':'01 / ABOUT US','about.title':'Ideas that become <span>digital ventures.</span>','about.p1':'FidFellow is a venture studio focused on creating and developing new digital projects.','about.p2':'We start with an idea, analyze the problem, build the product and turn the opportunity into a concrete venture.',
        'services.label':'02 / WHAT WE DO','service1.title':'Venture<br>Building','service1.text':'We turn ideas and opportunities into new digital businesses, from the first insight to launch.','service2.title':'Product<br>Development','service2.text':'We design and develop modern digital products that are simple to use and ready to grow.','service3.title':'Digital<br>Growth','service3.text':'We build strategies and systems that help projects find their market and create value.',
        'projects.label':'03 / PROJECTS','projects.text':'We are building a new generation of digital products.','projects.coming':'New digital projects currently in development.',
        'cta.title':'Have an idea? <span>Let’s build it.</span>','cta.text':'Let’s talk about your project, your idea or the next digital opportunity.','cta.button':'Start a conversation <span>→</span>'
    }
};

let currentLanguage=localStorage.getItem('fidfellow-language')||'it';

function setLanguage(language){
    currentLanguage=language;
    document.documentElement.lang=language;
    document.querySelectorAll('[data-i18n]').forEach(element=>{
        const key=element.dataset.i18n;
        if(translations[language][key]!==undefined) element.innerHTML=translations[language][key];
    });
    document.querySelectorAll('.language-button').forEach(button=>{
        button.textContent=language==='it'?'EN':'IT';
        button.setAttribute('aria-label',language==='it'?'Switch to English':'Passa all\'italiano');
    });
    localStorage.setItem('fidfellow-language',language);
}

function toggleLanguage(){
    setLanguage(currentLanguage==='it'?'en':'it');
}

document.querySelectorAll('.language-button').forEach(button=>button.addEventListener('click',toggleLanguage));
setLanguage(currentLanguage);
