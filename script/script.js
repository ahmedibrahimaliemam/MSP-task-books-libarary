let bookName=document.getElementById("name") ;
let bookDesc=document.getElementById("desc") ;
let bookRating=document.getElementById("rating") ;
let checkbox=document.getElementById("check") ;
let btn=document.getElementsByClassName("sub") ;
let image=document.getElementById("image") ;
let books=document.getElementById("books") ;
let form=document.getElementById("form") ;
let arr=JSON.parse(localStorage.getItem("books"))??[] ;
let ID=0 ;
window.onload=function(){
    FillData() ;
}
form.onreset=function(){
    arr=[] ;
    localStorage.clear() ;
    FillData();
}
form.onsubmit=function(e){
    e.preventDefault()
    if(bookDesc.value==""||bookName.value==""||image.value==""||bookRating.value==''){
        alert("You Must Fill All Data")
    } else{
        FillData();
    }
}
//function fill data
function FillData(){
    console.log(checkbox.checked);
    console.log(arr);
    books.innerHTML=`` ;
    if(bookDesc.value==""||bookName.value==""||image.value==""||bookRating.value==''){
        arr=arr ;
    }
    else{
    arr.push({id:++ID,name:bookName.value,description:bookDesc.value,url:source,stars:bookRating.value,check:checkbox.checked}) ;
    localStorage.setItem("books",JSON.stringify(arr))
    }
    for(let i=0 ;i<arr.length ;i++){
        books.innerHTML+=`<div class="book" id="book">
        <img id="images" src=${arr[i].url} alt="image1"/>
        <h1>${arr[i].name}</h1>
        <p class="desc">${arr[i].description}</p>
        <div id="icons">${generateStars(arr[i].stars)}</div>
        <div>${ifChecked(arr[i].check)}</div>
        <button onClick="Delete(${arr[i].id})">Delete</button>
        </div>`
    }
    console.log(arr);
    bookDesc.value="" ;
    bookName.value="";
    checkbox.checked=false ;
    bookRating.value='' ;
    image.value="" ;

}
//function make stars
function generateStars(numStars) {
    let starsHTML = '';
    for (let i = 0; i < numStars; i++) {
      starsHTML += '<i class="fa-solid fa-star"></i>';
    }
    return starsHTML;
  }
  //function check if checked
  function ifChecked(ifCheck){
    let x='' ;
    if(ifCheck){
        return x+=`<p>this book has been read</p>`

    }
    else{
        return x+=`<p>this book has no been read before</p>` ;
    }
  }
//make path of image as url
let source ;
image.addEventListener("change",
function UploadFile(){
    const reader=new FileReader()
    reader.onload=function(){
        source=this.result ;
    }
    reader.readAsDataURL(image.files[0]) ;
})
//function delete 
function Delete(id){
arr=arr.filter((ele)=>ele.id!=id) ;
console.log(arr);
localStorage.setItem("books",JSON.stringify(arr)) ;
if(arr.length==0){
    books.innerHTML="" ;
    localStorage.clear() ;
}
else{
FillData(); 
}

}





