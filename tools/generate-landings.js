/* Generate static Google Ads landing pages from the site's service catalog. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const catalogEnd = source.indexOf('const copy=');
if (catalogEnd < 0) throw new Error('Service catalog not found in script.js');
const context = {};
vm.runInNewContext(`${source.slice(0, catalogEnd)}\nthis.catalog=categoryData;`, context);
const catalog = context.catalog;

const locales = {
  ru: {index:0,locale:'ru',region:'Кишинёв и Молдова',serviceIn:'Услуга в Кишинёве и Молдове',quote:'Узнать стоимость',call:'Позвонить',services:'Все услуги',what:'Что сообщить для расчёта',whatIntro:'Эти детали помогут подобрать подходящее решение и обсудить стоимость.',how:'Как получить предложение',step1:'Опишите задачу',step1Text:'Расскажите об услуге и важных деталях.',step2:'Уточним условия',step2Text:'Обсудим объём работ, маршрут и удобное время.',step3:'Согласуем стоимость',step3Text:'Стоимость и условия согласуем до начала работ.',formTitle:'Коротко о задаче',formHint:'Например: адреса, объём, этаж и удобная дата',send:'Продолжить в WhatsApp',note:'WhatsApp откроется с подготовленным сообщением. Проверьте его и нажмите «Отправить».',waText:'Здравствуйте! Интересует услуга',detailsLabel:'Детали',phone:'Телефон',brand:'Двигаем важное в Кишинёве и по Молдове.',groups:{moves:{lead:'Расскажите об адресах, объёме вещей и условиях подъёма. Подберём транспорт и команду для вашего переезда.',hints:['Адреса погрузки и разгрузки','Примерный объём вещей','Этажи и наличие лифта']},transport:{lead:'Опишите груз и маршрут. Подберём транспорт с учётом размеров, веса и условий погрузки.',hints:['Что и сколько нужно перевезти','Маршрут и расстояние','Вес, размеры и этажи']},loaders:{lead:'Опишите объём и место работ. Уточним состав команды и условия погрузки или подъёма.',hints:['Какие предметы или материалы','Примерный вес и количество','Этаж, лифт и доступ к объекту']},waste:{lead:'Расскажите о виде и объёме отходов. Уточним транспорт, погрузку и условия вывоза.',hints:['Вид отходов','Примерный объём','Адрес, этаж и подъезд']},equipment:{lead:'Опишите задачу и параметры груза. Уточним, какая техника нужна и когда её использовать.',hints:['Тип груза или работ','Вес и габариты','Адрес и нужная дата']},extras:{lead:'Расскажите, какая помощь нужна с вещами или помещением. Уточним объём работ и предложим решение.',hints:['Что нужно сделать','Количество вещей или объём работ','Адрес и удобная дата']}}},
  ro: {index:1,locale:'ro',region:'Chișinău și Moldova',serviceIn:'Serviciu în Chișinău și Moldova',quote:'Cere o ofertă',call:'Sună',services:'Toate serviciile',what:'Ce informații ne ajută',whatIntro:'Aceste detalii ne ajută să propunem o soluție și să discutăm costul.',how:'Cum primiți o ofertă',step1:'Descrieți lucrarea',step1Text:'Spuneți-ne ce serviciu și ce detalii sunt importante.',step2:'Clarificăm condițiile',step2Text:'Discutăm volumul, traseul și ora convenabilă.',step3:'Stabilim costul',step3Text:'Costul și condițiile se stabilesc înainte de lucrare.',formTitle:'Descrieți pe scurt lucrarea',formHint:'De exemplu: adrese, volum, etaj și data dorită',send:'Continuă pe WhatsApp',note:'WhatsApp se deschide cu un mesaj pregătit. Verificați-l și apăsați „Trimite”.',waText:'Bună ziua! Mă interesează serviciul',detailsLabel:'Detalii',phone:'Telefon',brand:'Mutăm ce contează în Chișinău și Moldova.',groups:{moves:{lead:'Spuneți-ne adresele, volumul bunurilor și condițiile de ridicare. Alegem transportul și echipa pentru mutare.',hints:['Adresele de încărcare și descărcare','Volumul aproximativ','Etajele și disponibilitatea liftului']},transport:{lead:'Descrieți marfa și traseul. Alegem transportul după dimensiuni, greutate și condițiile de încărcare.',hints:['Ce și cât trebuie transportat','Traseul și distanța','Greutatea, dimensiunile și etajele']},loaders:{lead:'Descrieți volumul și locul lucrării. Clarificăm echipa și condițiile de încărcare sau ridicare.',hints:['Ce obiecte sau materiale','Greutatea și cantitatea','Etajul, liftul și accesul']},waste:{lead:'Spuneți-ne tipul și volumul deșeurilor. Clarificăm transportul, încărcarea și evacuarea.',hints:['Tipul deșeurilor','Volumul aproximativ','Adresa, etajul și accesul']},equipment:{lead:'Descrieți lucrarea și caracteristicile încărcăturii. Clarificăm ce utilaj este necesar și când.',hints:['Tipul încărcăturii sau al lucrării','Greutatea și dimensiunile','Adresa și data dorită']},extras:{lead:'Spuneți-ne de ce ajutor aveți nevoie pentru bunuri sau spațiu. Clarificăm volumul lucrării.',hints:['Ce trebuie făcut','Numărul de obiecte sau volumul','Adresa și data dorită']}}},
  en: {index:2,locale:'en',region:'Chișinău and Moldova',serviceIn:'Service in Chișinău and Moldova',quote:'Get a quote',call:'Call',services:'All services',what:'Details that help us quote',whatIntro:'These details help us suggest an approach and discuss the cost.',how:'How to get a proposal',step1:'Describe the task',step1Text:'Tell us which service and details matter.',step2:'Clarify conditions',step2Text:'We discuss the load, route and convenient time.',step3:'Agree on cost',step3Text:'We agree on cost and conditions before the job starts.',formTitle:'Describe the task briefly',formHint:'For example: addresses, load, floor and preferred date',send:'Continue on WhatsApp',note:'WhatsApp opens with a prepared message. Review it and press Send.',waText:'Hello! I am interested in',detailsLabel:'Details',phone:'Phone',brand:'We move what matters in Chișinău and Moldova.',groups:{moves:{lead:'Tell us the addresses, amount of belongings and access conditions. We will suggest a vehicle and crew for your move.',hints:['Collection and delivery addresses','Approximate amount of belongings','Floors and lift availability']},transport:{lead:'Describe the load and route. We will suggest transport that fits the dimensions, weight and loading conditions.',hints:['What and how much to transport','Route and distance','Weight, dimensions and floors']},loaders:{lead:'Describe the amount of work and the location. We will discuss crew size and access conditions.',hints:['Items or materials involved','Approximate weight and quantity','Floor, lift and site access']},waste:{lead:'Tell us the type and volume of waste. We will discuss transport, loading and removal conditions.',hints:['Type of waste','Approximate volume','Address, floor and access']},equipment:{lead:'Describe the task and load. We will discuss which equipment is suitable and when it is needed.',hints:['Type of load or work','Weight and dimensions','Address and preferred date']},extras:{lead:'Tell us what help you need with your belongings or space. We will discuss the scope of work.',hints:['What needs doing','Number of items or scope','Address and preferred date']}}}
};
locales.mo={...locales.ro,locale:'ro-MD'};

const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const slugify=value=>value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const rows=['language,keyword,category,landing_url,final_url'];
const used=new Set();
const languages=['ru','ro','mo','en'];
const adsRoot=path.join(root,'ads');
const categoryKeywords={
  moves:{slug:'moving-services',item:['Переезды','Mutări','Moving services']},
  transport:{slug:'freight-transport',item:['Грузоперевозки','Transport de mărfuri','Freight transport']},
  loaders:{slug:'movers-and-loaders',item:['Услуги грузчиков','Servicii hamali','Movers and loaders']},
  waste:{slug:'waste-removal',item:['Вывоз мусора','Evacuarea deșeurilor','Waste removal']},
  equipment:{slug:'equipment-rental',item:['Аренда спецтехники','Închiriere utilaje','Equipment rental']},
  extras:{slug:'packing-services',item:['Упаковка вещей','Ambalarea bunurilor','Packing services']}
};
const icons={
  phone:'<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.2 3.5h3.1l1.4 4.2-1.8 1.7a16.6 16.6 0 0 0 6.7 6.7l1.7-1.8 4.2 1.4v3.1c0 .9-.7 1.7-1.7 1.7C10.3 20.5 3.5 13.7 3.5 5.2c0-1 .8-1.7 1.7-1.7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.3 8.2c.3-.3.7-.3 1 0l1.1 1.4-.6 1c.8 1.4 1.9 2.5 3.3 3.2l.9-.6 1.5 1.1c.3.3.3.8 0 1.1-.5.6-1.1.8-1.8.6a10.1 10.1 0 0 1-5.8-5.8c-.2-.7 0-1.4.4-2Z" fill="currentColor"/></svg>',
  viber:'<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 4.5h11A3.5 3.5 0 0 1 21 8v7a3.5 3.5 0 0 1-3.5 3.5H11l-4 2v-2A3.5 3.5 0 0 1 3 15V8a3.5 3.5 0 0 1 3.5-3.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.5 8.2c.3-.2.6-.1.8.2l.8 1.2-.5.8c.6 1 1.4 1.8 2.5 2.4l.8-.5 1.2.8c.3.2.4.6.2.8-.4.5-.9.7-1.5.5a8 8 0 0 1-4.8-4.8c-.2-.6 0-1.1.5-1.4Z" fill="currentColor"/><path d="M13 7.6c1.8.2 3.1 1.5 3.3 3.3M13 9.5c.8.1 1.3.6 1.4 1.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
};
const entries=catalog.flatMap(group=>[
  {group,item:categoryKeywords[group.id].item,slug:categoryKeywords[group.id].slug},
  ...group.items.map(item=>({group,item,slug:slugify(item[2])}))
]);

for(const {group,item,slug} of entries){
    if(used.has(slug)) throw new Error(`Duplicate slug: ${slug}`);
    used.add(slug);
    for(const language of languages){
      const t=locales[language], service=item[t.index], groupText=t.groups[group.id];
      const message=`${t.waText} ${service}.`;
      const wa=`https://wa.me/37360300789?text=${encodeURIComponent(message)}`;
      const langOptions=languages.map(l=>`<option value="../${l}/${slug}.html"${l===language?' selected':''}>${l.toUpperCase()}</option>`).join('');
      const hints=groupText.hints.map((hint,i)=>`<li><span>0${i+1}</span>${escapeHtml(hint)}</li>`).join('');
      const title=`${service} — ${t.region} | hamal.rent`;
      const description=`${service}. ${groupText.lead} ${t.quote}: +373 60 300 789.`;
      const html=`<!doctype html>
<html lang="${t.locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#102b2a" />
  <meta name="googlebot" content="noindex,follow" />
  <meta name="bingbot" content="noindex,follow" />
  <meta name="description" content="${escapeHtml(description)}" />
  <title>${escapeHtml(title)}</title>
  <link rel="icon" type="image/svg+xml" href="../../logo-mark.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../landing.css" />
</head>
<body data-language="${language}" data-service="${escapeHtml(service)}" data-message-intro="${escapeHtml(t.waText)}" data-details-label="${escapeHtml(t.detailsLabel)}">
  <header class="landing-header"><div class="wrap header-inner"><a class="brand" href="../../index.html"><img src="../../logo-mark.svg" width="38" height="38" alt=""/><span>hamal<span class="dot">.</span>rent</span></a><div class="header-actions"><select id="languageSwitch" aria-label="Language">${langOptions}</select><a href="tel:+37360300789" data-method="phone" data-placement="header">+373 60 300 789</a></div></div></header>
  <main>
    <section class="landing-hero"><div class="wrap hero-grid"><div class="hero-copy"><span class="eyebrow">${escapeHtml(t.serviceIn)}</span><h1>${escapeHtml(service)}</h1><p class="lead">${escapeHtml(groupText.lead)}</p><div class="hero-actions"><a class="btn btn-primary" href="${wa}" data-method="whatsapp" data-placement="hero">${escapeHtml(t.quote)} <span>↗</span></a><a class="btn btn-secondary" href="tel:+37360300789" data-method="phone" data-placement="hero">${escapeHtml(t.call)} <span>↗</span></a></div><p class="hero-foot">${escapeHtml(t.step3Text)}</p></div><form id="leadForm" class="lead-form"><span class="form-top">hamal.rent <span>↗</span></span><h2>${escapeHtml(t.formTitle)}</h2><label for="details">${escapeHtml(t.formTitle)}</label><textarea id="details" rows="4" placeholder="${escapeHtml(t.formHint)}" required></textarea><button class="btn btn-primary" type="submit">${escapeHtml(t.send)} <span>↗</span></button><p>${escapeHtml(t.note)}</p></form></div></section>
    <section class="info-section"><div class="wrap info-grid"><div><span class="eyebrow eyebrow-dark">${escapeHtml(t.region)}</span><h2>${escapeHtml(t.what)}</h2><p>${escapeHtml(t.whatIntro)}</p></div><ul class="hint-list">${hints}</ul></div></section>
    <section class="steps-section"><div class="wrap"><h2>${escapeHtml(t.how)}</h2><div class="steps-grid"><article><span>01</span><h3>${escapeHtml(t.step1)}</h3><p>${escapeHtml(t.step1Text)}</p></article><article><span>02</span><h3>${escapeHtml(t.step2)}</h3><p>${escapeHtml(t.step2Text)}</p></article><article><span>03</span><h3>${escapeHtml(t.step3)}</h3><p>${escapeHtml(t.step3Text)}</p></article></div><div class="last-cta"><p>${escapeHtml(t.brand)}</p><a class="btn btn-primary" href="${wa}" data-method="whatsapp" data-placement="bottom">${escapeHtml(t.quote)} <span>↗</span></a></div></div></section>
  </main>
  <footer><div class="wrap footer-inner"><a href="../../index.html">hamal.rent</a><a href="../../index.html#catalog">${escapeHtml(t.services)} ↗</a><a href="tel:+37360300789" data-method="phone" data-placement="footer">+373 60 300 789</a></div></footer>
  <nav class="mobile-bar" aria-label="Contact"><a href="tel:+37360300789" data-method="phone" data-placement="mobile_bar"><span class="bar-icon">${icons.phone}</span>${escapeHtml(t.call)}</a><a href="${wa}" data-method="whatsapp" data-placement="mobile_bar"><span class="bar-icon wa">${icons.whatsapp}</span>WhatsApp</a><a href="viber://chat?number=%2B37360300789" data-method="viber" data-placement="mobile_bar"><span class="bar-icon viber">${icons.viber}</span>Viber</a></nav>
  <script src="../../landing.js"></script>
</body>
</html>
`;
      const dir=path.join(adsRoot,language);
      fs.mkdirSync(dir,{recursive:true});
      fs.writeFileSync(path.join(dir,`${slug}.html`),html,'utf8');
      const relativeUrl=`/ads/${language}/${slug}.html`;
      rows.push([language,service,group.id,relativeUrl,`https://hamal.rent${relativeUrl}`].map(value=>`"${String(value).replace(/"/g,'""')}"`).join(','));
    }
}
fs.writeFileSync(path.join(adsRoot,'keyword-map.csv'),rows.join('\n')+'\n','utf8');
console.log(`Generated ${used.size} services × ${languages.length} languages = ${used.size*languages.length} landing pages`);
