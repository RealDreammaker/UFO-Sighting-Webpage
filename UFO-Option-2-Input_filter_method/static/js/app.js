// from data.js
var tableData = data;

// appends a table to web page and then adds new rows of data for each UFO sighting
function renderTable(data) {
    // Assign table body to a variable
    var tableBody = d3.select("tbody");
    
    // clear table data on the web
    tableBody.html("");
    
    // loop through data array
    data.map(item => {
        // add row for each document
        var row  = tableBody.append("tr");

        // add data to each column
        Object.values(item).forEach(field => {
            row.append("td").text(field);
        })
    });
};
// load table with unfiltered data when the page finished loading
this.onload = renderTable(tableData);

// listen for events and search through the date/time column to find rows that match user input
var form = d3.select("form");
var button = d3.select("#filter-btn");
var clearButton = d3.select("#clear-filter-btn");
// // handle event when data was submitted through form or button was clicked
button.on("click", filterUFO);
form.on("submit", filterUFO);
clearButton.on("click", filterUFO);

var searchIds = ["#datetime", "#city", "#state", "#country", "#shape"];
var searchKeys = ["datetime", "city", "state", "country", "shape"];
// design a function that filter data based on date
function filterUFO (){
    // prevent page from refreshing
    d3.event.preventDefault();
    
    // reset table data and search criteira
    tableData = data;
    var searchCriteria;

    // loop through each input field and filter data by each criteria
    searchIds.forEach((searchId,index) =>{
        console.log(searchId);
        // select input element
        var inputElement = d3.select(searchId);
        
        // capture date from input field
        var inputValue = inputElement.property("value");

        // perform conversion to input value
        inputValue = inputValue.toLowerCase();
        console.log(`input value : ${inputValue}`);

        // check for type of button press, if it is clear, empty all filter criteria
        var buttonPressed = d3.select(this);
        if (buttonPressed.text() == "Clear Filter"){
            // clear inputdate
            inputValue = "";
            console.log(inputElement.attr("placeholder"));
            
        ;}
        
        console.log(`Rows before filter: ${tableData.length}`);
    
        // perform filtering data if the input field is not empty
        if (inputValue) {
            tableData = tableData.filter(item => item[searchKeys[index]] == inputValue);
            
            //update search criteria for displaying filter summary
            if (searchCriteria) {
                searchCriteria += `${searchKeys[index]}: ${inputValue} \n`
            }
            else{
                searchCriteria = `\n${searchKeys[index]}: ${inputValue} \n`
            };
        } 
        else {
            tableData = tableData;        
        };
        
        console.log(`Rows filtered: ${tableData.length}`);
        console.log("---------------")
    });
    renderTable(tableData);

    // display filter summary
    if (searchCriteria) {
        d3.select("#search-results").text(`Filtered results: ${tableData.length} UFO sites ${searchCriteria}`);
    }
    else {
        d3.select("#search-results").text(`Cleared filter!  Total: ${tableData.length} UFO sites`);
    };
    console.log("---------filter ended------------")
};





