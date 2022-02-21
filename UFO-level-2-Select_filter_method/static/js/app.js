// from data.js
var tableData = data;
const defaultInstruction = "Choose..";

// ############### LOADING TABLE FUNCTION ##########################
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

// ############## LOADING FILTER OPTION FUNCTIONS #################
// define a function to get a list of options based on a provided key value
function getOptions(key){
    var arr =[defaultInstruction];
    tableData.forEach(row => {
        Object.entries(row).forEach(([rowKey,rowValue]) => {
            if (rowKey == key) {
                if (arr.includes(rowValue) == false){
                    arr.push(rowValue);
                };
            };
        });
    });
    return arr;
};

// define search criteria
var searchIds = ["#datetime", "#city", "#state", "#country", "#shape"];
var searchKeys = ["datetime", "city", "state", "country", "shape"];

// get drop down options for all selections
var dropdownButton;
var allOptions;
searchIds.forEach((searchId,searchIndex) => {
    // initialize the button
    dropdownButton = d3.select(searchId)
    .append('select');
    console.log(`initializing drop down button for: ${searchId}`);

    // populate options
    allOptions= getOptions(searchKeys[searchIndex]);

    // add options to each button
    dropdownButton
        .selectAll('myOptions')
        .data(allOptions)
        .enter()
        .append("option")
        .text(function (d) {return d;})
        .attr("value", function (d) {return d})
    });

// ############## LOADING TABLE #################
// load table with unfiltered data when the page finished loading
this.onload = renderTable(tableData);

// ############## EVENT LISTENER #################
// listen for events and search through the date/time column to find rows that match user input
var form = d3.select("form");
var button = d3.select("#filter-btn");
var clearButton = d3.select("#clear-filter-btn");
// // handle event when data was submitted through form or button was clicked
button.on("click", filterUFO);
form.on("submit", filterUFO);
clearButton.on("click", filterUFO);


// ############## FILTER TABLE DATA - FUNCTION #################
// design a function that filter data based on date
function filterUFO (){
    // prevent page from refreshing
    d3.event.preventDefault();
    
    // reset table data and search criteira
    tableData = data;
    var searchCriteria;

    console.log("---- FILTER STARTED -------")

    // loop through each input field and filter data by each criteria
    searchIds.forEach((searchId,index) => {
        console.log(`Examining filter criteria : ${searchId}`)
    
        // capture filter criteria from input field
        var inputValue = d3.select(searchId).select("select").property("value");
        console.log(`user's input value : ${inputValue}`);

        // check for type of button press, if it is clear, empty all filter criteria
        var buttonPressed = d3.select(this);
        if (buttonPressed.text() == "Clear Filter"){
            // clear inputdate
            console.log("clearing inputdate")
            inputValue = "";
        ;}
        
        console.log(`Rows before filter: ${tableData.length}`);
    
        // perform filtering data if the input field is not empty nor not chosen
        if (inputValue && inputValue != defaultInstruction) {
            tableData = tableData.filter(item => item[searchKeys[index]] == inputValue);
            
            //update search criteria for displaying filter summary on webpage
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
        
        console.log(`Rows after filter: ${tableData.length}`);
        console.log("-----------")
    });
    renderTable(tableData);
    
    // display filter summary
    if (searchCriteria) {
        d3.select("#search-results").text(`Filtered results: ${tableData.length} UFO sites ${searchCriteria}`);
    }
    else {
        d3.select("#search-results").text(`Cleared filter!  Total: ${tableData.length} UFO sites`);
    };
    console.log("--------- FILTER ENDED ------------")
};





