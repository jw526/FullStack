
function updateCustomerData(){
    //fetch to our GET
    fetch('http://localhost:3333/customer')
    .then(res=>res.json())
    .then(json=>{
        //do something
        const customerData = document.querySelector('#customerList');
        for(const cust of json){
            customerData.innerHTML += `
            <b>${cust.FirstName}</b>
            <b>${cust.LastName}</b>
            <br>
            `;
            
            // JSON.stringify(cust.FirstName);
        }

        // customerData.innerText = JSON.stringify(json);
    });
}

updateCustomerData();

function addNewCustomer(){
    
}
