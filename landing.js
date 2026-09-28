const body=document.body;
const service=body.dataset.service;
const language=body.dataset.language;
const messageIntro=body.dataset.messageIntro;
const detailsLabel=body.dataset.detailsLabel;
const track=(method,placement)=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'contact_intent',contact_method:method,placement,service,language})};
document.getElementById('languageSwitch').addEventListener('change',event=>window.location.assign(event.target.value));
document.addEventListener('click',event=>{const link=event.target.closest('a[data-method]');if(link)track(link.dataset.method,link.dataset.placement)});
document.getElementById('leadForm').addEventListener('submit',event=>{event.preventDefault();const details=document.getElementById('details');if(!details.reportValidity())return;const text=`${messageIntro} ${service}.\n${detailsLabel}: ${details.value.trim()}`;track('whatsapp','form');window.location.assign(`https://wa.me/37360300789?text=${encodeURIComponent(text)}`)});
