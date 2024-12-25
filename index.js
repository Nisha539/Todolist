
let todolistContEl = document.getElementById("todolistCont");

let userInEl = document.getElementById("userIn");

let errorMsgEl = document.getElementById("errorMsg");




// let todolist = [

//     {
//         title : "HTML",
//          id : 1
//     },

//     {
//         title : "CSS",
//         id : 2
//     },

//     {
//         title : "JAVASCRIPT",
//         id : 3
//     }

// ]


// ----------------------------------STEP 4-----------------------------------------------


   function onGetParsedTodo(){

      let myTodolist =  localStorage.getItem( "myTodolist" );

      if( myTodolist === null ){

        return [];

      }

      else{

        let parseTodo = JSON.parse( myTodolist );

        return parseTodo;

      }

   }
   

      let todolist = onGetParsedTodo();

//  ----------------------------------------------------------------------------------------------------------------------------------------------

    function onStatusChanged( checkBoxId , titleId , todoId ){

        let checkboxEl = document.getElementById(checkBoxId);

        let titleEl = document.getElementById(titleId);

        if( checkboxEl.checked === true ){

             titleEl.classList.add("checked");

        }

        else {  

            titleEl.classList.remove("checked");

        }

        
        let  newTodo = todoId.slice( 4 );

        let index = todolist.findIndex( ( each )=> each.id == newTodo );
 

        for( i = 0; i < todolist.length; i++){

            if(index === i ){


                if(todolist[i].isChecked === false){

                    todolist[i].isChecked === true;

                }

                else{

                    todolist[i].isChecked === false;
                }
            }
        }

       

    }

    // --------------------------------------------STEP 5-------------------------------------------------


    function onDeleteTodo(todoId){

        let myTodo = document.getElementById(todoId);

        todolistContEl.removeChild(myTodo);
        
        let  newTodo = todoId.slice( 4 );

        let index = todolist.findIndex( ( each )=> each.id == newTodo );
  
        todolist.splice( index , 1 ); 
        
    
    }



// --------------------------------------------------STEP-2----------------------------------------------------------

function createAndAppendTodo( todo ){

    let checkBoxId = "myCheckBox" + todo.id;
    let titleId = "myTitle" + todo.id;
    let todoId = "todo" + todo.id;
     


    let listCont = document.createElement("li");
    listCont.classList.add("list-cont");
    listCont.id = todoId;
    todolistContEl.appendChild(listCont);


    let checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.id = checkBoxId;
    if( todo.isChecked === true){
        checkboxEl.checked = true;
    }
    checkboxEl.onclick = function(){    

     onStatusChanged( checkBoxId , titleId ,todoId );

    }
    listCont.appendChild(checkboxEl);

    let labelEl = document.createElement("label");
    labelEl.classList.add("label-card");
    labelEl.htmlFor = checkBoxId ;
    listCont.appendChild(labelEl);

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;
    if( todo.isChecked === true ){

        titleEl.classList.add("checked");

    }
    labelEl.appendChild(titleEl);

    let deleteBtnEl = document.createElement("button");
    deleteBtnEl.classList.add("delete-btn");
    deleteBtnEl.onclick = function(){

        onDeleteTodo(todoId);

    }
    labelEl.appendChild(deleteBtnEl);

    let trashIconEl =  document.createElement("i");
    trashIconEl.classList.add("fa-solid" , "fa-trash");
    deleteBtnEl.appendChild(trashIconEl);

}
// ---------------------------------------------------------------------------------------------


//--------------------------------------- STEP 1 ------------------------------------------

for( each of todolist){



    createAndAppendTodo( each );

}
// ----------------------------------------------------------------------------------------


// -----------------------STEP-3-------------------------

function onAddTodo(){

    let date = new Date();

    let uniqueId = Math.ceil( Math.random() * date.getTime());


    let newTodo = {

        title : userInEl.value ,
        id : uniqueId,
        isChecked : false
    }

    if( userInEl.value === ""){

        errorMsgEl.textContent = "Please Provide Valid Input!!!!!";

    }

    else{
        
        createAndAppendTodo( newTodo );
        todolist.push(newTodo);
        errorMsgEl.textContent = "";
        userInEl.value = "";

    }
    
}

// --------------------------------save function-----------------------------------




function onSaveTodo(){

    let stringyFyTodo = JSON.stringify( todolist );

    localStorage.setItem( "myTodolist" , stringyFyTodo );

}