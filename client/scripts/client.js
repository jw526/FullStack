const { json } = require("body-parser");

function updateCustomerData(){
    //fetch to our GET
    fetch(url)
    .then(res=>json())
    .then(json=>{
        //do something
    });
    const customerData = document.querySelector('#customerList');
    customerData.innerText = "blah";
}

updateCustomerData();
