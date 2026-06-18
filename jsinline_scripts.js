
function toggleMenu(){
  const nav=document.getElementById('mobileNav');
  nav.classList.toggle('open');
}
function showPricing(type,btn){
  document.querySelectorAll('.pricing-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('pricing-'+type).classList.add('active');
  btn.classList.add('active');
}
function toggleFaq(el){
  const item=el.parentElement;
  item.classList.toggle('open');
}

function submitForm(){
  let valid = true;

  // Full name
  const name = document.getElementById('fullName');
  const errName = document.getElementById('err-fullName');
  if(!name.value.trim()){
    name.classList.add('error'); errName.classList.add('show'); valid=false;
  } else { name.classList.remove('error'); errName.classList.remove('show'); }

  // Phone
  const phone = document.getElementById('phone');
  const errPhone = document.getElementById('err-phone');
  const phoneVal = phone.value.trim().replace(/\s+/g,'');
  if(!phoneVal || phoneVal.length < 7){
    phone.classList.add('error'); errPhone.classList.add('show'); valid=false;
  } else { phone.classList.remove('error'); errPhone.classList.remove('show'); }

  // Email (optional but validate if filled)
  const email = document.getElementById('email');
  const errEmail = document.getElementById('err-email');
  if(email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
    email.classList.add('error'); errEmail.classList.add('show'); valid=false;
  } else { email.classList.remove('error'); errEmail.classList.remove('show'); }

  // Service
  const service = document.getElementById('service');
  const errService = document.getElementById('err-service');
  if(!service.value){
    service.classList.add('error'); errService.classList.add('show'); valid=false;
  } else { service.classList.remove('error'); errService.classList.remove('show'); }

  if(!valid) return;

  // Build WhatsApp message
  const budget = document.getElementById('budget').value;
  const bizName = document.getElementById('bizName').value.trim();
  const message = document.getElementById('message').value.trim();
  let waText = 'Hi, I submitted a consultation request.\n\n';
  waText += 'Name: ' + name.value.trim() + '\n';
  waText += 'Phone: ' + phone.value.trim() + '\n';
  if(bizName) waText += 'Business: ' + bizName + '\n';
  if(email.value.trim()) waText += 'Email: ' + email.value.trim() + '\n';
  waText += 'Service Needed: ' + service.value + '\n';
  if(budget) waText += 'Budget: ' + budget + '\n';
  if(message) waText += 'About Business: ' + message;

  // Show success
  document.getElementById('formCard').style.display = 'none';
  document.getElementById('successMsg').classList.add('show');

  // Open WhatsApp after short delay
  setTimeout(function(){
    window.open('https://wa.me/+91 97522 86540?text=' + encodeURIComponent(waText), '_blank');
  }, 600);
}

let exitShown=false;
setTimeout(function(){
  if(!exitShown){exitShown=true;document.getElementById('exitBanner').classList.add('show');}
},30000);
document.addEventListener('mouseleave',function(e){
  if(e.clientY<10&&!exitShown){exitShown=true;document.getElementById('exitBanner').classList.add('show');}
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const id=this.getAttribute('href').slice(1);
    const el=document.getElementById(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}
  });
});
