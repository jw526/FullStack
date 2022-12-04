
function updateCustomerData(){
    //fetch to our GET
    fetch('http://localhost:3333/customer')
    .then(res=>res.json())
    .then(json=>{
        //do something
        const divTag = document.querySelector('div#editableTable');
        let html = '<table class="striped"><thead><th>First Name</th><th>LastName</th><th>Email</th><th>Double Click to edit</th></thead><tbody>';
        for(const cust of json){
            html += `
            <tr>
                <td class="hidden_id">${cust.CustomerId}</td>
                <td>${cust.FirstName}</td>
                <td>${cust.LastName}</td>
                <td>${cust.Email}</td>
                <td><button class="update">Update</button><button class="delete">Delete</button></td>
            </tr>
            `;
            
            // JSON.stringify(cust.FirstName);
        }
        divTag.innerHTML = html + '</tbody></table>';
        addEventListeners();
        // customerData.innerText = JSON.stringify(json);
    });
}
//display customer data on the webpage
updateCustomerData();

document.querySelector('#add').addEventListener('click', addCustomer);
//using form submit instead of button
// document.querySelector('form').addEventListener('submit', addCustomer);
function addEventListeners()
{
    const tdTags = document.querySelectorAll('td');
    const updateBtns = document.querySelectorAll('.update');
    
    for(const tdTag of tdTags){
    
        tdTag.addEventListener('dblclick', editInfo);
    }
    for(const updateBtn of updateBtns){
    
        updateBtn.addEventListener('click', updateCustomer);
    }
}


function addCustomer(event)
{
    event.preventDefault();
    
    //grab the info from the form
    const fd = new FormData(document.querySelector('form'));
    
    //post the info to our server
    fetch('http://localhost:3333/customer',{method:'post', body:fd});
    
    updateCustomerData();

}
function editInfo(event)
{
    // event.preventDefault();
    event.target.setAttribute('contenteditable',true);
    //grad the info from the form
    // alert('hey');
}
function updateCustomer(event)
{
    
    const allTds = event.target.parentElement.parentElement.children;
    let updateJson = {};
    const custID = allTds[0].textContent;

    updateJson['FirstName'] = allTds[1].textContent;
    updateJson['LastName'] = allTds[2].textContent;
    updateJson['Email'] = allTds[3].textContent;
    
    updateJson = JSON.stringify(updateJson);
    console.dir(updateJson);
    fetch('http://localhost:3333/customer/'+custID, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'put', 
        body:updateJson
    });
    updateCustomerData();
}
