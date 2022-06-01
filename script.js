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
]

const transactions = dataTransaction;

function init(){
  transactions.forEach(item=>addTransactionToList(item))
  calculateMoney()
}


function addTransactionToList(transaction){
  const symbol = transaction.amount<0 ? '-':'+';
  const result = numberWithCommas(Math.abs(transaction.amount))
  // create li element
  const item = document.createElement('li');
  item.innerHTML = `${transaction.text} <span>${symbol}${result}</span><button class="deleteBtn">x</button>`
  //add class  to li
  const status = transaction.amount<0 ? 'minus' : 'plus';
  item.className=status
  // หรือ
  // item.classList.add(status)

  //add child to list
  list.appendChild(item)
}

function calculateMoney(){
  // กรองเฉพาะ amount
  const amounts =  dataTransaction.map(item=>item.amount);
  //ยอดคงเหลือ(รวม)
  const total = amounts.reduce((result,item)=>{
    return result += item;
  },0)
  //คำนวณรายรับ
  const income = amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0)
  //คำนวณรายจ่าย
  const expense = amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1



  //display
  money_plus.innerHTML=`฿${numberWithCommas(income.toFixed(2))}`
  money_minus.innerHTML=`฿${numberWithCommas(expense.toFixed(2))}`
  balance.innerHTML=`฿${numberWithCommas(total.toFixed(2))}`;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() == ""||amount.value.trim()==""){
      alert("กรุณาป้อนข้อมูลให้ครบถ้วน")
  }else{
      const newTransaction={
        id:generateAutoId(),
        text:text.value.trim(),
        amount:Number(amount.value.trim())
      }

      console.log(newTransaction);

      transactions.push(newTransaction)
      // console.log(transactions);
      addTransactionToList(newTransaction)
      //calculate เงินใหม่
      calculateMoney();

      //เคลียร์ช่อง input
      amount.value ="";
      text.value ="";
  }

}

function generateAutoId(){
  return Math.floor(Math.random()*100000)
}

//addEventListener
form.addEventListener('submit',addTransaction)

init();