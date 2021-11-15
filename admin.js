var list= document.getElementById('admin-user-list');
var deleteAll= document.getElementById('submit');
var search = document.getElementById('searchUser');
var edit=document.querySelectorAll('input');
var editSpan= document.getElementsByClassName('user');
console.log(deleteAll)
let users=[];
let filteredUser=[];
let currentUser=[];

//render the user list
function renderList(users,start, end, page){
    console.log(users);
    console.log(end);
    list.innerHTML="";
    if(!start){
        start=0;
    }
    if(!end){
        end=users.length;
    }
    for(let i=start;i<end; i++)
    {
        list.innerHTML=list.innerHTML+`
        <div class="admin-user">
            <div class="userInput"><input class="check page-${page}" id="check-${users[i].id}" type="checkbox" value="${users[i].id}"></div>
            <div class="userInput" id="${users[i].id}"><input type="text" id="${users[i].id}" value="${users[i].name}" readonly></div>
            <div class="userInput" id="${users[i].id}"><input type="email" id="${users[i].id}" value="${users[i].email}" readonly></div>
            <div class="userInput" id="${users[i].id}"><input type="text" id="${users[i].id}" value="${users[i].role}" readonly></div>
        
            <div id="action" class="userInput"> 
                <div id="${users[i].id}" class="edit"><i class="far fa-edit" onclick="editUser(${users[i].id})"></i></div>
                <div id="${users[i].id}" class="del"><i class="fas fa-trash-alt" onclick="deleteUser(${users[i].id})"></i></div>
            </div>
        </div>`
        currentUser.push(users[i]);
    }
    console.log(currentUser,'currentUser');
}

//API call to log the users
function fetchUsers(){
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    .then(function(response){
        console.log(response);
        const responseJSON= response.json();
        // console.log(responseJSON,'responseJSON');
        return responseJSON;
    }).then(function(data){
        console.log(data,'data');
        users=data;
        renderList(users,0,10);
    })
}

//delete user/users
function deleteUser(id){
    const newUsers= users.filter(function(user){
        return user.id != id;
    })
    users= newUsers;
    renderList(users);
}

//filter the user/users by name or role or email
function findUser(text){
    for(let i=0;i<currentUser.length;i++)
    {
        if(currentUser[i].name==text || currentUser[i].email==text || currentUser[i].role==text){
            filteredUser.push(currentUser[i]);
        }
    }
    renderList(filteredUser);
    // filteredUser=[];
    // console.log(filteredUser,'filteredUser');
}

//edit the userList
function editUser(id){
    var edit=document.querySelectorAll('input');
    console.log(edit,editSpan,'edit');
    for(let i=0;i<edit.length;i++)
    {
        if(edit[i].id==id)
        { 
            console.log('readonly false',edit[i]);
            edit[i].removeAttribute('readonly');
            edit[i].style.background= 'white'
        }
    }

}

//filter the user
function searchUser(){
    search.addEventListener('keypress',function(e){
        if(e.key==='Enter')
        {
            if(search.value.length>0)
            {
                findUser(search.value);
                filteredUser=[];
                
            }
        }
    })
}
//search the users
function searchUserButton(){
    if(search.value.length>0)
    {
        findUser(search.value);
        filteredUser=[];
    }
}

//ckeck the box
function deleteChecked(){
    if(document.getElementById('check')){
        console.log('checked');
        deleteAll.style.backgroundColor="red";
        for(let i=0;i<currentUser.length;i++)
        {
            document.getElementById(`check-${currentUser[i].id}`).checked= true;
        }
        console.log(currentUser,'checked');
    }
}
//delete all users
function deleteAllButton(){
    if(document.getElementById('check').checked==true && deleteAll.style.backgroundColor=="red"){
        // list.innerHTML="";
        document.getElementById('check').checked=false;
        deleteAll.style.backgroundColor= "grey";
        console.log('deleted')
        users.splice(currentUser[0].id-1,currentUser.length);
        renderList(users,0,10);
    }

}

//eventDelegation
function handleClick(e){
    const target= e.target;
    console.log(target);

    //uncheck the checkbox
    if(document.getElementById('check').checked==false){
        for(let i=0;i<currentUser.length;i++)
        {
            document.getElementById(`check-${currentUser[i].id}`).checked= false;
        }
        deleteAll.style.backgroundColor="grey";
    }

    //pagination
    if(target.className=='1'){
        target.style.fontWeight=700;
        currentUser=[];
        filteredUser=[];
        list.innerHTML="";
        renderList(users,0,10,1);
    }
    if(target.className=='2'){
        target.style.fontWeight=700;
        currentUser=[];
        filteredUser=[];
        list.innerHTML="";
        renderList(users,10,20,2);
    }
    if(target.className=='3'){
        target.style.fontWeight=700;
        currentUser=[];
        filteredUser=[];
        list.innerHTML="";
        renderList(users,20,30,3);
    }
    if(target.className=='4'){
        target.style.fontWeight=700;
        currentUser=[];
        filteredUser=[];
        list.innerHTML="";
        renderList(users,30,40,4);
    }
    if(target.className=='5'){
        target.style.fontWeight=700;
        currentUser=[];
        filteredUser=[];
        list.innerHTML="";
        renderList(users,40,50,5);
    }
        
}

//function calls
fetchUsers();
document.addEventListener('click',handleClick);
