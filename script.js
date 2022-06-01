// อ้างอิง element
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dataTransaction = [
  {id:1,text:"ค่าขนม",amount:-100},
  {id:2,text:"จ็อบพิเศษ",amount:140},
  {id:3,text:"เงินเดือน",amount:+15000},
  {id:4,text:"ค่าห้อง",amount:-6000},
  {id:5,text:"ค่าขนมลูกตาล",amount:-10000},
  {id:6,text:"ค่ารับผ้า",amount:+2500},
]

const transactions = dataTransaction;

function init(){
  transactions.forEach(item=>addDataToList(item))
}

function addDataToList(transaction){
  const symbol = transaction.amount<0 ? '-':'+';

  // create li element
  const item = document.createElement('li');
  item.innerHTML = `${transaction.text} <span>${symbol}${Math.abs(transaction.amount)}</span><button class="deleteBtn">x</button>`
  //add class  to li
  const status = transaction.amount<0 ? 'minus' : 'plus';
  item.className=status
  // หรือ
  // item.classList.add(status)

  //add child to list
  list.appendChild(item)
}

init();