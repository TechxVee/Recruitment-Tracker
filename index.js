// Hold saved urls
let mySaves = []

// Get DOM elements for manual input
const manualInput = document.getElementById("input")
const manualBtn = document.getElementById("manual-btn")

// Get DOM element for tab input
const tabBtn = document.getElementById("tab-btn")

// Get DOM element for delete button
const deleteBtn = document.getElementById("delete-btn")

// Get DOM element for url list
const listEl = document.getElementById("list")

// Get list from local storage database
const savesFromLocalDatabase = JSON.parse(localStorage.getItem("mySaves"))

/* Check if theirs a local database */
if (savesFromLocalDatabase) {
    // Assign local database to save array
    mySaves = savesFromLocalDatabase
}

// Function to display list of saved urls
function render(saves) {
    let listItems = ""

    // Loop through saved items and display items with hyperlink
    for (let i = 0; i < saves.length; i++) {
        listItems += `<li> <a target = _blank href='${saves[i]}'> ${saves[i]} </a></li>`
    }
    listEl.innerHTML = listItems
}

// Manual Button 
manualBtn.addEventListener("click", function() {
    // Add manual input into saved url array
    mySaves.push(manualInput.value)

    // Clear manual input from display once entered
    manualInput.value = ""

    // Store the manual input in local database
    localStorage.setItem("mySaves", JSON.stringify(mySaves)) //requires string input

    // Call function to display saved url
    render(mySaves)
})

// Tab Button
tabBtn.addEventListener("click", function() {
    // Chrome API
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Add url from tab into saved url array
        mySaves.push(tabs[0].url)

        // Store item in local database
        localStorage.setItem("mySaves", JSON.stringify(mySaves)) // requires string input
        
        // Call function to display saved url
        render(mySaves)
    })
})

// Delete Button
deleteBtn.addEventListener("dblclick", function() {
    // Clear local database
    localStorage.clear()

    // Clear save url array
    mySaves = []

    // Display cleared list
    render(mySaves)
})

