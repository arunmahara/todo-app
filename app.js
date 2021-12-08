/*getting required objects*/
let input = document.querySelector('#text');
let btn = document.querySelector('#btn');
let list = document.querySelector('#list');
let rmtask = document.querySelector('#rmtasks');
let clear = document.querySelector('#clear');


userList();
btn.addEventListener('click', () => {   /*function to add todo list on button click */
    let txt = input.value; 
    if (txt === ""){   /* checking if user input is null*/
        alert("write something");
    }
    else{
        let storage = localStorage.getItem("Todo"); /*getting localStorage in browser */
        if(storage == null){
            listArr = [];  /*empty array*/
        }else{
            listArr = JSON.parse(storage); /*changing JSON string into js object*/
        }
        listArr.push(txt); /*pushing user input list in array*/
        localStorage.setItem("Todo", JSON.stringify(listArr)); /*changing js objects into JSON string */
        userList();
    }    
});
input.addEventListener('keyup', e => {   /*function to add todo list on enter key press */
    e.preventDefault();
    if (e.keyCode === 13) {
        btn.click();
    }
});


function userList(){    /*function to stores user input locally on the browser */
    let storage = localStorage.getItem("Todo"); /*getting localStorage in browser */
    if(storage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(storage); 
    }
    rmtasks.textContent = listArr.length;  /*counting pending tasks */
  
    let newList = "";
    listArr.forEach((element, index) => {   
        newList += `<li> ${element} <span onclick="deleteList(${index})";><i class="fas fa-trash"></i></span></li>`;
    }); /*creating user inputed li tag */
    list.innerHTML = newList;
    input.value = "";
}

function deleteList(index){  /* function to delete individual todo list */
    let storage = localStorage.getItem("Todo");
    listArr = JSON.parse(storage); 
    listArr.splice(index, 1);
    localStorage.setItem("Todo", JSON.stringify(listArr));
    userList();

}
clear.onclick = () => {  /*function to delete all the lists at once */
    listArr = [];
    localStorage.setItem("Todo", JSON.stringify(listArr));
    userList();

}
