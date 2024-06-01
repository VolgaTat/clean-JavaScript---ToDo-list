let tasks = []
let todoList ={
  ulTodoList: document.querySelector(".todo__list"),
  todoForm: document.querySelector(".todo__form"),
  todoField: document.querySelector(".todo__field"),
  todoError: document.querySelector(".todo__error"),
  todoAll: document.querySelector(".todo__lvl-all"),
  todoDone: document.querySelector(".todo__lvl-done"),
}
const addItemInTodoList = ()=>{
  todoList.ulTodoList.innerHTML = "";
  tasks.forEach((item)=>{
  todoList.ulTodoList.innerHTML +=` 
  <li class="todo__item" style ="background:${item.isDone ? 'green': item.isImportant ? 'gold' : 'royalblue' } ; order: ${item.isDone ? '-2': item.isImportant ? '-1' : '0'}">
    <div class= "todo__item-left">
      <input data-id ='${item.id}' ${item.isDone ? 'checked' : ''} class="todo__item-done" type="checkbox"/>
      <p class="todo__item-text" style ="color:${item.isImportant ? '#000000' : '#ffffff'}; 
      text-decoration: ${item.isDone ? "line-through":"none" };">${item.text} </p>
    </div>
    <div class= "todo__item-right">
      <span data-id ='${item.id}' class="todo__item-imp">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="13.000000pt" height="13.000000pt" viewBox="0 0 1280.000000 1216.000000"
        preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,1210.000000) scale(0.100000,-0.100000)"
            fill="${item.isImportant ? '#000000' : '#ffffff'}" stroke="none">
            <path d="M5890 10598 c-332 -755 -736 -1674 -898 -2043 -161 -368 -295 -671
            -297 -673 -2 -2 -308 -25 -682 -52 -373 -27 -1054 -76 -1513 -109 -459 -34
            -1087 -79 -1395 -101 -308 -22 -585 -43 -615 -46 l-54 -6 49 -47 c28 -25 336
            -300 684 -611 349 -311 806 -718 1016 -905 1267 -1130 1560 -1391 1572 -1400
            17 -13 74 228 -542 -2265 -256 -1036 -464 -1887 -463 -1890 2 -4 869 499 1928
            1117 1058 618 1931 1122 1940 1120 8 -2 398 -242 865 -532 468 -291 1165 -724
            1550 -963 385 -239 811 -504 947 -588 135 -85 249 -154 253 -154 4 0 4 17 0
            38 -6 34 -411 1897 -776 3568 -87 402 -159 738 -159 747 0 13 649 563 2997
            2542 258 217 261 220 230 227 -18 4 -1011 104 -2207 223 -1196 119 -2184 220
            -2196 225 -15 6 -62 111 -199 446 -98 242 -412 1013 -697 1714 -285 701 -564
            1388 -620 1525 -56 138 -104 253 -108 258 -3 4 -278 -610 -610 -1365z"/>
          </g>
        </svg>
      </span>
      <span data-id="${item.id}" class="todo__item-del">X</span>
    </div>
</li>`;
 });

 todoList.todoAll.textContent = tasks.length;
 todoList.todoDone.textContent = tasks.filter( el => el.isDone).length;

 let todoItemDel = document.querySelectorAll(".todo__item-del");
 Array.from(todoItemDel).forEach(item => {
   item.addEventListener("click", () => {
    tasks = tasks.filter(task => task.id != item.dataset.id)
     countChekboxs --;
     widthBg = parseFloat(getComputedStyle(progressBar).width);
     progressBar.style.width = `${widthBg - 5}px`;
     addItemInTodoList();
   }) 
 });

 let todoItemImpItems = document.querySelectorAll(".todo__item-imp");
 Array.from(todoItemImpItems).forEach(item => {
  item.addEventListener("click", () => {
    tasks = tasks.map( el => {
      if (el.id == item.dataset.id){
        return {...el, isImportant: !el.isImportant};
      }
      return el;
    });
    addItemInTodoList();
  }) 
});

let todoItemDone = document.querySelectorAll(".todo__item-done");
Array.from(todoItemDone).forEach(item => {
  item.addEventListener("change", () => {
    tasks = tasks.map( el => {
      if (el.id == item.dataset.id){
        return {...el, isDone: !el.isDone}
      }
      return el;
    });
    addItemInTodoList();
  }) 
});

let todoItemBtn = document.querySelector(".todo__del-all");
todoItemBtn.addEventListener("click",()=>{
  tasks = tasks.filter( el => !el.isDone );
  countChekboxs --;
  widthBg = parseFloat(getComputedStyle(progressBar).width);
  progressBar.style.width = `${widthBg - 5}px`;
  addItemInTodoList();
});
const inputs = document.querySelectorAll(".todo__item-done")
const progressBar = document.querySelector(".progress-bar")
let countChekboxs = 0;
Array.from(inputs).forEach(elem =>{
    elem.addEventListener("change", ()=>{
      if (elem.checked){
        countChekboxs ++;
        let widthBg = parseFloat(getComputedStyle(progressBar).width);
        progressBar.style.width = `${widthBg + 5}px`;
      } else {
        countChekboxs --;
        widthBg = parseFloat(getComputedStyle(progressBar).width);
        progressBar.style.width = `${widthBg - 5}px`;

      }
    });
});
}
addItemInTodoList();

todoList.todoForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  if (event.target[0].value === "" || todoList.todoError.style.display === "block") {
    todoList.todoError.innerHTML = "" + "Запрет на внесение повторных задач";
    return false;
  } else {
  tasks = [...tasks, {
    id: tasks.length ? tasks.at(-1).id + 1 : 1,
    text: event.target[0].value,
    isImportant: false,
    isDone: false,
  }]
  addItemInTodoList();
}
event.target[0].value = "";
});

todoList.todoField.addEventListener("input", (event)=>{
  if(tasks.some(item=> item.text.toUpperCase() === event.target.value.toUpperCase())){
    todoList.todoError.style.display = "block";
  } else {
    todoList.todoError.style.display = "none";
  }
});

