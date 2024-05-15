let fullname = document.querySelector(".fullname input");
let email_id = document.querySelector(".email input");
let salary = document.querySelector(".salary input");
let city = document.querySelector(".city input");

let submitBtn = document.querySelector("button");


let table = document.querySelector("table");
let table_headings = document.querySelectorAll("th");


let table_columns = table_headings.length;

let table_array = [];

getdatafromLocalStorage();

function getdatafromLocalStorage()
{
    let data = localStorage.getItem("data");
    if(data)
    {
        table_array = JSON.parse(data);
        console.log("data in local storage(get data)",data);
        for(const row of table_array)
        {
            createRow(row);
        }
    }

}

function pushtoArray(content)
{
    // pushing entire array to an array 
    table_array.push(content);
    console.log(table_array);
    createRow(content);
    localStorage.setItem("data",JSON.stringify(table_array));


}

function removefromlocalStorage(r)
{
//   remove 1 element at index r-1
   table_array.splice(r-1,1);
   localStorage.setItem("data",JSON.stringify(table_array));
}
// url of edit page to append index to 
const url = 'http://127.0.0.1:5500/editpage.html?';
// creating and new urlsearchparams obj
const searchParams = new URLSearchParams();

function editPage(r)
{
    // i will have the index of the row that needs to be edited 
    let i = r.parentNode.parentNode.rowIndex;
    console.log("row = ",i);
    console.log(table_array[i-1]);
    // searchParams.append('v1',JSON.stringify(table_array[i-1]));
    // append index(number)
    searchParams.append('index',i-1);
    // shows the number of parameters searchParams contains 
    //in this case only one 
    console.log("Search params",searchParams);
 
    // index gets appended with it so 
    // index = 1 shows on top 
    // toString helps extract actual query string from searchParams
    const queryString = searchParams.toString();
    console.log("Query string = ",queryString);
    // window.location.href = url + queryString

    window.location.href = url + queryString;
}

function removeRow(r)
{

    let i = r.parentNode.parentNode.rowIndex;
    console.log("r",r) //input element
    console.log("r.parentNode",r.parentNode); //td element
    console.log("r.parentNode.parentNode",r.parentNode.parentNode); //tr element
    console.log(i); //row number 
    table.deleteRow(i);
    removefromlocalStorage(i);
 
}
function actionBtns()
{
    const Actiontd = document.createElement("td");
    Actiontd.innerHTML = '<td><input type="button" value="Edit" style="margin-right:5px;margin-left:5px;" onclick = "editPage(this)"></td>' + '<td><input type="button" value="Delete" onclick = "removeRow(this)"></td>' ;

    return Actiontd;
}

function createRow(content)
{
    const row = document.createElement("tr");
    for(let i = 0 ; i < table_columns-1 ; i++)
    {
        let row_content = document.createElement("td");
        row_content.textContent = content[i];
        row.appendChild(row_content);


    }

    // actionBtns();
    row.appendChild(actionBtns());
    table.appendChild(row);
    
    
}


submitBtn.addEventListener("click", (evt) => {
    // evt.preventDefault();
    let fullnameVal = fullname.value;
    let emailVal = email_id.value;
    let salaryVal = salary.value;
    let cityVal = city.value;

    let content = [fullnameVal,emailVal,salaryVal,cityVal];
    
   pushtoArray(content);    
      

});


