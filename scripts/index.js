/*
    Program: Staff Information Table
    Author: sina vahabi
    Copyright: 2023/07
*/


"use strict";

/* 
    Creating some counters:
        -"count": This variable is assigned to keep track of how many times "New Table" button is pressed and new table is created by it.
        -"counter": This variable in the other hand is assigned to keep track of how many times "New Row" button is pressed and new row is created and attached to previous table.
*/
let count = 1;
let counter = 1;

// Getting main elements of the static html page with DOM searching. 
const divElem = document.querySelector("#container");
const btnTable = document.getElementById("add-table");
const btnRow = document.getElementById("add-row");

// Using "addEventListener" to keep track of "New Table" and "New Row" buttons and add single number to "count" and "counter" variables as said above.
btnTable.addEventListener("click", () => {
    count++;
});

btnRow.addEventListener("click", () => {
    counter++;
});

// Disabling button for in order to avoid errors if user is trying to create a new row before the table is created itself. 
btnRow.disabled = true; 

// Creating a function to add a new table on the html document when user clicks on the related button.
const addTable = () => {
    const createTable = document.createElement("table");
    createTable.classList.add("tables" ,`table${count}`);
    // Adding following elements as table children.
    const tableHead = `
        <thead>
            <tr>
                <th class="name-head">First Name</th>
                <th class="last-name-head">Last Name</th>
                <th class="age-head">Age</th>
                <th class="gender-head">Gender</th>
                <th class-"work-record-head">Work Record</th>
                <th class="expertise-head">Expertise</th>
                <th class="expertise-level-head">Expertise Level</th>
                <th class="phone-head">Phone Number</th>
                <th class="address-head">Address</th>
                <th class="delete-btn-head">
                    <button class="btn btn-outline-danger" onclick="delTable(this)" id="del-table" title="delete table">
                        <img src="styles/icons/delete.png" alt="delete" id="deleteTable">
                    </button>
                </th>
            </tr>
        </thead>
    `;
    createTable.innerHTML = tableHead;
    // Creating and appending new div to each table as their previous sibling to make new created tables look better more clear on the page. 
    const createDiv = document.createElement("div");
    createDiv.innerHTML = "<hr>";
    divElem.append(createDiv);
    divElem.append(createTable);
    // Making button available.
    btnRow.disabled = false;
};

// Creating a function to add a new row to recent created table when user clicks on the related button.
const addRow = () => {
    // Using 'try catch()' conditions to make sure user cannot add a new row when there is no table to attach to.
    try {
        const createRow = document.createElement("tr");
        createRow.classList.add("rows", `row${counter}`);
        createRow.setAttribute("onmouseover", "mouseOverRow(this)");
        createRow.setAttribute("onmouseout", "mouseOutRow(this)")

        // User input elements for each new row.
        const userInput = `
            <td>
                <div class="main" onmouseover="mouseOver(this)" onmouseout="mouseOut(this)">
                    <input name="name-input" type="text" class="user-input name-input">
                    <button class="save-btn" onclick="save(this)" title="save">
                        <i class='far fa-check-square'></i>
                    </button>
                    <button class="edit-btn" onclick="edit(this)" title="edit">
                        <i class='far fa-edit'></i>
                    </button>
                    <button class="clear-btn" onclick="clearValue(this)" title="delete">
                        <i class="fa fa-remove"></i>
                    </button>
                </div>    
            </td>
            <td>
                <div class="main" onmouseover="mouseOver(this)" onmouseout="mouseOut(this)">
                    <input name="last-name-input" type="text" class="user-input last-name-input">
                    <button class="save-btn" onclick="save(this)" title="save">
                        <i class='far fa-check-square'></i>
                    </button>
                    <button class="edit-btn" onclick="edit(this)" title="edit">
                        <i class='far fa-edit'></i>
                    </button>
                    <button class="clear-btn" onclick="clearValue(this)" title="delete">
                        <i class="fa fa-remove"></i>
                    </button>
                </div>     
            </td>
            <td>
                <div class="main space">
                    <input name="age-input" type="number" min="18" max="50" class="user-input age-input">
                </div>     
            </td>
            <td>
                <div class="main space">
                    Male
                    <input name=\`gender-input${counter}\` type="radio" class="user-input">
                    Female
                    <input name=\`gender-input${counter}\` type="radio" class="user-input">
                </div>     
            </td>
            <td>
                <div class="main space">
                    <input name="work-record-input" type="number" min="1" max="40" class="user-input work-record-input">
                    Years
                </div>     
            </td>
            <td>
                <div class="main input-group">
                    <select class="expertise form-select" name="expertise">
                        <option value="Choose" selected>Choose</option>
                        <option value="Back-end Developer">Back-end Developer</option>
                        <option value="Front-end Developer">Front-end Developer</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Tech Lead">Tech Lead</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="AI Expert">AI Expert</option>
                        <option value="Other">Other</option>
                    </select>
                </div>     
            </td>
            <td>
                <div class="main input-group">
                    <select class="expertise-level form-select" name="expertise-level">
                        <option value="Choose" selected>Choose</option>
                        <option value="Intern">Intern</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>     
            </td>
            <td>
                <div class="main" onmouseover="mouseOver(this)" onmouseout="mouseOut(this)">
                    <input name="phone-input" type="text" class="user-input phone-input">
                    <button class="save-btn" onclick="save(this)" title="save">
                        <i class='far fa-check-square'></i>
                    </button>
                    <button class="edit-btn" onclick="edit(this)" title="edit">
                        <i class='far fa-edit'></i>
                    </button>
                    <button class="clear-btn" onclick="clearValue(this)" title="delete">
                        <i class="fa fa-remove"></i>
                    </button>
                </div>     
            </td>
            <td>
                <div class="main" onmouseover="mouseOver(this)" onmouseout="mouseOut(this)">
                    <input name="address-input" type="text" class="user-input address-input">
                    <button class="save-btn" onclick="save(this)" title="save">
                        <i class='far fa-check-square'></i>
                    </button>
                    <button class="edit-btn" onclick="edit(this)" title="edit">
                        <i class='far fa-edit'></i>
                    </button>
                    <button class="clear-btn" onclick="clearValue(this)" title="delete">
                        <i class="fa fa-remove"></i>
                    </button>
                </div>     
            </td>
            <td>
                <button class="btn btn-outline-warning" onclick="delRow(this)" id="del-row" title="delete row">
                    <i class="material-icons" id="deleteRow">delete_sweep</i>
                </button>
            </td>
        `;
        createRow.innerHTML = userInput;
        // Getting last created table specifically in order to append new row to it.
        const tableElem = document.getElementsByClassName(`table${count-1}`)[0];
        tableElem.append(createRow);
    }
    catch(err) {
        // Responding properly to user wrong action.
        btnRow.disabled = true;
        alert("You need to create a new table first!");
    }
};

// Creating "save" function to help user for saving inserted input on the related row of the table, when the related button is clicked.
// In fact after user pressed the mentioned button, inserted input will be set to "readOnly". 
const save = (btn) => {
    // Getting created "save button" from html page with DOM navigation. 
    const nameInput = btn.parentNode.parentNode.getElementsByClassName("user-input")[0];
    nameInput.readOnly = true;
};

// Creating "edit" function to help user to edit saved data on the related row of the table.
// In fact after user pressed the mentioned button, saved data will exit the "readOnly" state.
const edit = (btn) => {
    // Getting created "edit button" from html page with DOM navigation.
    const nameInput = btn.parentNode.parentNode.getElementsByClassName("user-input")[0];
    nameInput.readOnly = false;
};

// Creating "clearValue" function to help user to clear saved data on the related row of the table.
// In fact after user pressed the mentioned button, value attribute will be set to nothing and inserted data will be deleted.
const clearValue = (btn) => {
    // Getting created "clear button" from html page with DOM navigation.
    const nameInput = btn.parentNode.parentNode.getElementsByClassName("user-input")[0];
    nameInput.readOnly = false;
    nameInput.value = "";
};

// Defining this function will make buttons visible nicely and slowly in that part ("td" element) of the table.
const mouseOver = (divElem) => {
    // Getting recent created button elements from html page with DOM searching and DOM navigation to modify some styles. 
    const saveBtn = divElem.getElementsByClassName("save-btn")[0];
    const editBtn = divElem.getElementsByClassName("edit-btn")[0];
    const clearBtn = divElem.getElementsByClassName("clear-btn")[0];
    const tableData = divElem.parentNode;
    tableData.style.padding = "10px 20px";
    saveBtn.style.display = "inline";
    editBtn.style.display = "inline";
    clearBtn.style.display = "inline";
}; 

// Defining this function will make buttons hidden nicely and slowly in that part ("td" element) of the table.
const mouseOut = (divElem) => {
    // Getting recent created button elements from html page with DOM searching and DOM navigation to modify some styles.
    const saveBtn = divElem.getElementsByClassName("save-btn")[0];
    const editBtn = divElem.getElementsByClassName("edit-btn")[0];
    const clearBtn = divElem.getElementsByClassName("clear-btn")[0];
    const tableData = divElem.parentNode;
    tableData.style.padding = "10px 15px";
    saveBtn.style.display = "none";
    editBtn.style.display = "none";
    clearBtn.style.display = "none";
};

// By creating following function we make sure user is capable to delete the exact row their desire, when they press "Del Row" button beside each row.
const delRow = (rowValue) => {
    // Getting created row from html page with DOM navigation to remove the node when user decides.
    const selectedRow = rowValue.parentNode.parentNode;
    selectedRow.remove();
};

// By creating following function we make sure user is capable to delete the exact table their desire, when they press "Del Table" button beside each table.
const delTable = (tableValue) => {
    // Getting created table from html page with DOM navigation to remove the node when user decides.
    const selectedTable = tableValue.parentNode.parentNode.parentNode.parentNode;
    const selectedDiv = tableValue.parentNode.parentNode.parentNode.parentNode.previousSibling;
    selectedTable.remove(); 
    selectedDiv.remove();
};

// Adding this function will make sure that when ever mouse hovers on each row, all related inputs will show a placeholder text to user.
// And also it will set inputs with 'type="number"' as their default when they were created.
const mouseOverRow = (thisRow) => {
    // Getting created row input elements from html page with DOM navigation modify some attributes for the time user mouse hovers on a single row.
    const nameInput = thisRow.childNodes[1].childNodes[1].childNodes[1];
    const lastNameInput = thisRow.childNodes[3].childNodes[1].childNodes[1];
    const ageInput = thisRow.childNodes[5].childNodes[1].childNodes[1];
    const workRecordInput = thisRow.childNodes[9].childNodes[1].childNodes[1];
    const phoneInput = thisRow.childNodes[15].childNodes[1].childNodes[1];
    const addressInput = thisRow.childNodes[17].childNodes[1].childNodes[1];
    nameInput.placeholder = "name";
    lastNameInput.placeholder = "last name";
    phoneInput.placeholder = "+98-912-899-94-80";
    addressInput.placeholder = "Tehran City-Pasdaran St-Davoud Eslami St-Ghoba Alley-Block 1-Unit 3";
    ageInput.name = "age-input";
    ageInput.type = "number";
    ageInput.min = 18;
    ageInput.max= 50;
    ageInput.classList.add("user-input", "age-input");
    workRecordInput.name = "work-record-input";
    workRecordInput.type = "number";
    workRecordInput.min = 1;
    workRecordInput.max = 40;
    workRecordInput.classList.add("user-input", "work-record-input");
};

// Adding this function will make sure that when ever mouse hovers out of a row, all related inputs will stop showing a placeholder text to user.
// And also it will change inputs type attribute value from "number" to "text" in order to remove extra filled space (because of input with 'type="number"') and, show inside text exactly in center of the input field.
const mouseOutRow = (thisRow) => {
    // Getting created row input elements from html page with DOM navigation modify some attributes for the time user mouse hovers out from a single row.
    const nameInput = thisRow.childNodes[1].childNodes[1].childNodes[1];
    const lastNameInput = thisRow.childNodes[3].childNodes[1].childNodes[1];
    const ageInput = thisRow.childNodes[5].childNodes[1].childNodes[1];
    const workRecordInput = thisRow.childNodes[9].childNodes[1].childNodes[1];
    const phoneInput = thisRow.childNodes[15].childNodes[1].childNodes[1];
    const addressInput = thisRow.childNodes[17].childNodes[1].childNodes[1];
    nameInput.placeholder = "";
    lastNameInput.placeholder = "";
    phoneInput.placeholder = "";
    addressInput.placeholder = "";
    ageInput.name = "age-input";
    ageInput.type = "text";
    ageInput.classList.add("user-input", "age-input");
    workRecordInput.name = "work-record-input";
    workRecordInput.type = "text";
    workRecordInput.classList.add("user-input", "work-record-input");
};
