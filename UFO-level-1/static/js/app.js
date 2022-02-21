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

// design a function that filter data based on date
function filterUFO (){
    // prevent page from refreshing
    d3.event.preventDefault();
    
    // select input element
    var inputElement = d3.select("#datetime");
    
    // capture date from input field
    var inputDate = inputElement.property("value");
    
    // check for type of button press
    var buttonPressed = d3.select(this);
    if (buttonPressed.text() == "Clear Filter"){
        // clear inputdate
        inputDate = "";
        console.log(inputElement.attr("placeholder"));
        // inputElement.text("1/11/2011");
    ;}
    
    // filter data according to the date
    console.log(`Rows before filter: ${tableData.length}`);

    // filter data if the input field is not empty
    if (inputDate) {
        tableData = data.filter(item => item.datetime == inputDate);

        // write number of result found
        d3.select("#search-results").text(`Filtered results: ${tableData.length} UFO sites on ${inputDate}`);
    } 
    else {
        tableData = data;        
        d3.select("#search-results").text(`Cleared filter!  Total: ${tableData.length} UFO sites`);
    };

    console.log(`Rows filtered: ${tableData.length}`);

    renderTable(tableData);
};





