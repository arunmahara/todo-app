let input = document.querySelector('#text');
let btn = document.querySelector('#btn');
let list = document.querySelector('#list');
let rmtask = document.querySelector('#rmtasks');
let clear = document.querySelector('#clear');


userList();
btn.addEventListener('click', () => {
    let txt = input.value;
    if (txt === ""){
        alert("write something");
    }
    else{
        let storage = localStorage.getItem("New Todo");
        if(storage == null){
            listArr = [];
        }else{
            listArr = JSON.parse(storage);
        }
        listArr.push(txt);
        localStorage.setItem("New Todo", JSON.stringify(listArr));
        userList();
    }    
});
input.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.keyCode === 13) {
        btn.click();
    }
});


function userList(){
    let storage = localStorage.getItem("New Todo");
    if(storage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(storage); 
    }
    rmtasks.textContent = listArr.length;
  
    let newList = "";
    listArr.forEach((element, index) => {
        newList += `<li> ${element} <span onclick="deleteList(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    list.innerHTML = newList;
    input.value = "";
}

function deleteList(index){
    let storage = localStorage.getItem("New Todo");
    listArr = JSON.parse(storage); 
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    userList();

}
clear.onclick = () => {
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    userList();

}
