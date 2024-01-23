var inputBookName = document.getElementById('inputBookName');
var inputBookUrl = document.getElementById('inputBookUrl');
var tableBody = document.getElementById('tableBody');
var addbtn = document.getElementById('addbtn');
var updatebtn = document.getElementById('updatebtn');

//================================================================
var container ; 
if(localStorage.getItem('BookMarks') !=null)
{
    container=JSON.parse(localStorage.getItem('BookMarks'));
    bookDisplay(container);
}
else{
    container = [] ; 
}
//================================================================
function bookAdd(){
if(bookValidate(inputBookName.value)){
    var bookObject = {
        bookName:inputBookName.value,
        bookUrl:inputBookUrl.value,
    }
    container.push(bookObject);
    localStorage.setItem('BookMarks',JSON.stringify(container))
    bookClear();
    bookDisplay(container);
}
else {
    alert("invalid Name or URl");
}
}
//================================================================
function bookClear(){
    var bookObject = {
        bookName:inputBookName.value ="",
        bookUrl:inputBookUrl.value="",
    }
}
//================================================================

function bookDisplay(arr){
    cartona = `` ;
    for(var i = 0 ; i<arr.length; i++)
    {
        cartona+=`
        <tr>
        <td>${i+1}</td>
        <td>${arr[i].bookName}</td>
        <td><a href="${arr[i].bookUrl}"><button class="btn btn-success">visit</button></a></td>
        <td><button class="btn btn-warning" onclick="setBookUpdate(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="bookDelete(${i})">delete</button></td>
    </tr>        
        `
    }
    tableBody.innerHTML=cartona ;
}
//================================================================

function bookDelete(DeleteIndex){
    container.splice(DeleteIndex,1);
    localStorage.setItem('BookMarks',JSON.stringify(container))
    bookDisplay(container);
}

//================================================================

function BookSearch(searchterm){

    var searchResult =[];
    for(var i = 0 ; i <container.length ; i++)
    {
        if(container[i].bookName.toLowerCase().includes(searchterm.toLowerCase()))
        {
            searchResult.push(container[i]);
        }
    }
   bookDisplay(searchResult);
}

//================================================================
var update = 0 ; 

function setBookUpdate(updateIndex){
    update = updateIndex ; 
    inputBookName.value=container[updateIndex].bookName;
    inputBookUrl.value=container[updateIndex].bookUrl;

    addbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
}

function getBookUpdate(){

    container[update].bookName=inputBookName.value; 
    container[update].bookUrl=inputBookUrl.value; 
    localStorage.setItem('BookMarks',JSON.stringify(container))
    bookClear();
    bookDisplay(container);
    addbtn.classList.remove('d-none');
    updatebtn.classList.add('d-none');
}

//================================================================
function bookValidate(name){
    var regexName=/^[A-Z][a-z]{2}[a-z]+\s?$/;
    if(regexName.test(name)){
        inputBookName.classList.replace('is-invalid','is-valid');
        return true ; 
    }
    else 
    {
        inputBookName.classList.add('is-invalid');
    return false ; 
    }
}