

const cardTaskForm = document.querySelector('#form1');
const cards = document.querySelector('#cards');
let arrcards = [];
let id = 1;
if (localStorage.getItem("arrCards") !== null) {
  let json = localStorage.getItem("arrCards");
  arrcards = JSON.parse(json);
}
if(localStorage.getItem("maxCardID") !== null) {
  id = parseInt(localStorage.getItem("maxCardID")) + 1;
}


function onSubmit(e){
    e.preventDefault();
    const taskName = cardTaskForm.querySelector('#taskName').value;
    const task = cardTaskForm.querySelector('#task').value;
    const dateObj = new Date(cardTaskForm.querySelector('#date').value);
    const time = cardTaskForm.querySelector('#time').value;
    //console.log(typeof dateObj);
    //console.log(dateObj.toLocaleDateString("he-IL"));
    const date = dateObj.toLocaleDateString("he-IL");
    const taskobj = {
        "id": id,
        "taskName": taskName,
        "task": task,
        "date": date,
        "time": time
    };
    drowCard(taskobj);
    //add object to array, as a new element
    arrcards.push(taskobj);
    //console.log(taskobj);
        
    localStorage.setItem("arrCards", JSON.stringify(arrcards));
    localStorage.setItem("maxCardID", JSON.stringify(id));
    id++;
    // console.log(JSON.stringify(arrcards));
}
function drowCard(card) {
  cards.innerHTML += `
  <div class="col mb-4 cards">
      <div class="card">
        <div class="card-body">
        <i class="bi bi-file-x delete"><span>${card.id}</span></i>
          <h5 class="taskName"><b>Task name: </b> ${card.taskName}</h5>
          <p class="card-text">${card.task}</p>
          <p class="card-text">${card.date} ${card.time}</p>
        </div>
      </div>
    </div>
  `;}

function onLoad() {
  //loop through array and call newCard for each element
  for (let index = 0; index < arrcards.length; index++) {
    const arrCardsI = arrcards[index];
    drowCard(arrCardsI);
  }  
  const date = cardTaskForm.querySelector('#date');
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();

  var minDate = year + '-' + month + '-' + day;    
  date.setAttribute('min', minDate);
}


//object has basically two things in it: מאפיינים/משתנים ומתודות/פונקציות
function onDelete(e){
    // console.log(e.target);
    //if the element that triggered the event contains deleteBTN class, continue to line 38. otherwise, stop /exit the function.
    if (!e.target.classList.contains('delete')){
        return;
    };

    const delbtn = e.target;
    const cardId = parseInt(delbtn.querySelector('span').innerHTML);  
    delbtn.closest('div.mb-4').remove();
    
    //create a new array without this card: like deleting the card from the array
    arrcards = arrcards.filter(function(card){
      return card.id !== cardId; })
   //arrcards = arrcards.filter((f) =>  f.id !== cardId )
   
   //convert array to json and save in local storage.
    localStorage.setItem("arrCards", JSON.stringify(arrcards));
    // console.log(JSON.stringify(arrcards));
}

cardTaskForm.addEventListener('submit', onSubmit);
cards.addEventListener('click', onDelete);
window.addEventListener('load', onLoad);
