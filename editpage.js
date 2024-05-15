// to get the URL and the querystring at the end of it 
const url = window.location.href;

// pass url into a new url object and get searchParams using searchParams
const searchParams = new URL(url).searchParams;

// this will extract the data in the form of entries in an array like object
const entries = new URLSearchParams(searchParams).values();

// passing array like object into an array to get make an array 
const array = Array.from(entries);

// accessing the one value 
const obj = JSON.parse(array[0]);
console.log("row to be edited = ",obj);

const appUrl = 'http://127.0.0.1:5500/crudApp.html?';
// console.log(entries);

let fullname = document.querySelector(".fullname input");
let email_id = document.querySelector(".email input");
let salary = document.querySelector(".salary input");
let city = document.querySelector(".city input");

let params = [fullname,email_id,salary,city];

let submitBtn = document.querySelector("button");


let table = document.querySelector("table");
let table_headings = document.querySelectorAll("th");
let table_columns = table_headings.length;
let table_array = [];



getdatafromLocalStorage();

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
function getdatafromLocalStorage()
{
    let data = localStorage.getItem("data");
    if(data)
    {
        table_array = JSON.parse(data);
        // console.log("data in local storage(get data)",data);
        for(const row of table_array)
        {
            createRow(row);
            
        }
        
    }

}
DisplayData();
function DisplayData()
{
    for(let i = 0 ; i < table_columns-1; i++)
    {
       params[i].value = table_array[obj][i];
    }
}

function ReplaceInArray(content)
{
    // console.log("pushing to array");
    // pushing entire array to an array 
    table_array[obj] = content;
    console.log(table_array);
    // createRow(content);
    localStorage.setItem("data",JSON.stringify(table_array));


}

submitBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    // console.log("submit button clicked");
    let fullnameVal = fullname.value;
    let emailVal = email_id.value;
    let salaryVal = salary.value;
    let cityVal = city.value;

    let content = [fullnameVal,emailVal,salaryVal,cityVal];
    
    ReplaceInArray(content); 
    
    window.location.href = appUrl;
      

});





