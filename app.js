const defaults=[
{id:1,name:"7000 Diamonds",price:1000},{id:2,name:"10000 Diamonds",price:1500},{id:3,name:"30000 Diamonds",price:4000},
{id:4,name:"40000 Diamonds",price:5000},{id:5,name:"60000 Diamonds",price:6000},{id:6,name:"800000 Diamonds",price:8000}
];
let products=JSON.parse(localStorage.getItem("malikProducts")||"null")||defaults;
function money(n){return "PKR "+03276303979(n).toLocaleString()}
function saveProducts(){localStorage.setItem("malikProducts",JSON.stringify(products))}
function cart(){return JSON.parse(localStorage.getItem("malikCart")||"[]")}
function saveCart(c){localStorage.setItem("malikCart",JSON.stringify(c))}
function updateCount(){let el=document.getElementById("cartCount");if(el)el.textContent=cart().reduce((a,x)=>a+x.qty,0)}
function renderProducts(){let el=document.getElementById("products");if(!el)return;el.innerHTML=products.map(p=>`<article class="card"><div class="diamond">💎</div><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button onclick="add(${p.id})">🛒 BUY NOW</button></article>`).join("")}
function add(id){let c=cart(),x=c.find(a=>a.id===id);if(x)x.qty++;else c.push({id,qty:1});saveCart(c);updateCount();alert("Added to cart!");}
function renderCart(){let el=document.getElementById("cart");if(!el)return;let c=cart();if(!c.length){el.innerHTML='<div class="form"><h3>Your cart is empty.</h3><a class="btn" href="index.html#diamonds">Browse Diamonds</a></div>';return}
let total=0;el.innerHTML=c.map(x=>{let p=products.find(q=>q.id===x.id);let sub=p.price*x.qty;total+=sub;return `<div class="cartItem"><div>💎 <b>${p.name}</b><br><small>Quantity: ${x.qty}</small></div><strong>${money(sub)}</strong><button class="save" onclick="removeItem(${p.id})">Remove</button></div>`}).join("")+
`<div class="total">Total: <b>${money(total)}</b></div><div class="form"><h3>Player & Contact Details</h3><input id="player" placeholder="Free Fire Player ID"><input id="name" placeholder="Your name"><input id="phone" placeholder="Phone / WhatsApp"><button class="save" onclick="placeOrder()">PLACE ORDER</button></div>`}
function removeItem(id){saveCart(cart().filter(x=>x.id!==id));renderCart();updateCount()}
function placeOrder(){let p=document.getElementById("player").value.trim(),n=document.getElementById("name").value.trim(),ph=document.getElementById("phone").value.trim();if(!p||!n||!ph){alert("Please fill all details.");return}let id="MS-"+Date.now().toString().slice(-7);localStorage.setItem("lastOrder",JSON.stringify({id,player:p,name:n,phone:ph,items:cart()}));saveCart([]);alert("Order created: "+id+"\\nPayment gateway can be connected in the next step.");location.href="index.html"}
function renderAdmin(){let el=document.getElementById("adminProducts");if(!el)return;el.innerHTML=products.map(p=>`<div class="adminRow"><span>💎 ${p.name}</span><input id="price${p.id}" type="number" value="${p.price}"><button class="save" onclick="changePrice(${p.id})">Save Price</button></div>`).join("")}
function changePrice(id){let v=Number(document.getElementById("price"+id).value);if(v<0)return alert("Invalid price");products.find(p=>p.id===id).price=v;saveProducts();renderAdmin();alert("Price updated.")}
renderProducts();renderCart();renderAdmin();updateCount();
