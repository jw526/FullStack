
function updateEmployeeData(){
    //fetch to our GET
    fetch('http://localhost:3333/employee')
    .then(res=>res.json())
    .then(json=>{
        
        const divTag = document.querySelector('div#editableTable');
        let html = '<table class="striped"><thead><th>First Name</th><th>LastName</th><th>Email</th><th>Double Click to edit</th></thead><tbody>';
        for(const emp of json){
            html += `
            <tr>
                <td class="hidden_id">${emp.EmployeeId}</td>
                <td>${emp.FirstName}</td>
                <td>${emp.LastName}</td>
                <td>${emp.Email}</td>
                <td><button class="update">Update</button><button class="delete" value=${emp.EmployeeId}>Delete</button></td>
            </tr>
            `;
            
            // JSON.stringify(cust.FirstName);
        }
        divTag.innerHTML = html + '</tbody></table>';
        addEventListeners();
        document.querySelector('#employeeTab').click();
        
    });
}
//display employee data on the webpage
updateEmployeeData();

document.querySelector('#add').addEventListener('click', addEmployee);
//using form submit instead of button

function addEventListeners()
{
    const tdTags = document.querySelectorAll('td');
    const updateBtns = document.querySelectorAll('.update');
    const deleteBtns = document.querySelectorAll('.delete');
    //edit person info
    for(const tdTag of tdTags){
    
        tdTag.addEventListener('dblclick', editInfo);
    }
    //update button
    for(const updateBtn of updateBtns){
    
        updateBtn.addEventListener('click', updateEmployee);
    }
    //delete button
    for(const deleteBtn of deleteBtns){
    
        deleteBtn.addEventListener('click', deleteEmployee);
    }
}


function addEmployee(event)
{
    event.preventDefault();
    
    //grab the info from the form
    const fd = new FormData(document.querySelector('form'));
    
    //post the info to our server
    fetch('http://localhost:3333/employee',{method:'post', body:fd});
    
    updateEmployeeData();

}
function editInfo(event)
{
    // event.preventDefault();
    event.target.setAttribute('contenteditable',true);
    //grad the info from the form
    // alert('hey');
}
function updateEmployee(event)
{
    
    const allTds = event.target.parentElement.parentElement.children;
    let updateJson = {};
    const empID = allTds[0].textContent;

    updateJson['FirstName'] = allTds[1].textContent;
    updateJson['LastName'] = allTds[2].textContent;
    updateJson['Email'] = allTds[3].textContent;
    
    updateJson = JSON.stringify(updateJson);
    console.dir(updateJson);
    fetch('http://localhost:3333/employee/'+empID, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'put', 
        body:updateJson
    });
    updateEmployeeData();
}

function deleteEmployee(event)
{
    console.log(event);

    fetch('http://localhost:3333/employee/'+event.target.value, {
        method:'delete', 
    });
    updateEmployeeData();
}
