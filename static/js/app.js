// import data from data.js
const tableData = data;


//declare (empty) lists that will populate each filter
var dates = [];
var cities = [];
var states = [];
var countries = [];
var shapes = [];

// Reference the HTML table using d3
var tbody = d3.select("tbody");


function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");

    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");

         // Loop through each field in the dataRow and add
         // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
	});
}

// create each filter list looping through the initial data (data.js)

function buildLists(data){

      data.forEach((ufo)=> {
              if (!(dates.includes(ufo["datetime"]))) {
                        dates.push(ufo["datetime"]);
                      }
              if (!(cities.includes(ufo["city"]))) {
                        cities.push(ufo["city"]);
                      }
              if (!(states.includes(ufo["state"]))) {
                        states.push(ufo["state"]);
                      }
              if (!(countries.includes(ufo["country"]))) {
                        countries.push(ufo["country"]);
                      }  
              if (!(shapes.includes(ufo["shape"]))) {
                        shapes.push(ufo["shape"]);
                      }              
      })
      cities.sort();
      states.sort();
      countries.sort();
      shapes.sort();
}

// create each dropdown filter
function buildFilter(id, list) {
      let selectedData = d3.select(id);

      selectedData.insert("option").attr("value", "").html(""+ "</option>")

      list.forEach((element) => {
        selectedData.insert("option").attr("value", element).html(element + "</option>") 
    }); 
    console.log(states);  
}


buildLists(tableData);
buildFilter("#datetime", dates);
buildFilter("#city", cities);
buildFilter("#state", states);
buildFilter("#country", countries);
buildFilter("#shape", shapes);



// updating eavch filter to filter the table
function updateFilters() {
  
  // declare filters in the function so we can re-filter without recharging the page
  var filters = {};
  // Save the element, value, and id of the filter that was changed
  let date = d3.select("#datetime").property("value");
  let city = d3.select("#city").property("value");
  let state = d3.select("#state").property("value");
  let country = d3.select("#country").property("value");
  let shape = d3.select("#shape").property("value");
 
  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (date) {
    filters.datetime = date
  };
  if (city) {
    filters.city = city
  };
  if (state) {
    filters.state = state
  };
  if (country) {
    filters.country = country
  };
  if (shape) {
    filters.shape = shape
  };
  // Call function to apply all filters and rebuild the table
  filterTable(filters);
}


// filter the table
function filterTable(filters) {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  
  if (filters) {
    
    //console.log(filters);
     
    for (let key in filters) {
        console.log(`the key is ${key} and value is ${filters[key]}`);
   
       switch (key){
           case "datetime": 
                filteredData = filteredData.filter(row => row.datetime === filters.datetime) 
                break;
            case "city":
                filteredData = filteredData.filter(row => row.city === filters.city)
                break;
            case "state":
                filteredData = filteredData.filter(row => row.state === filters.state)
                break;
            case "country":
                filteredData = filteredData.filter(row => row.country === filters.country)
                break;
            case "shape":
                filteredData = filteredData.filter(row => row.shape === filters.shape)
                break;               
        }
    } 
   };
  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}


//different reset functions that reset each filter, and function resetAll that calls them all

function resetDate() { 
  //clears all the guardians with the specified id 
  document.getElementById("datetime").innerHTML = 
      null; 
  buildFilter("#datetime", dates);    
} 

function resetCity() { 
  //clears all the guardians with the specified id 
  document.getElementById("city").innerHTML = 
      null; 
  buildFilter("#city", cities);     
} 

function resetState() { 
  //clears all the guardians with the specified id 
  document.getElementById("state").innerHTML = 
      null; 
  buildFilter("#state", states);    
} 

function resetCountry() { 
  //clears all the guardians with the specified id 
  document.getElementById("country").innerHTML = 
      null; 
  buildFilter("#country", countries);    
} 

function resetShape() { 
  //clears all the guardians with the specified id 
  document.getElementById("shape").innerHTML = 
      null; 
  buildFilter("#shape", shapes);    
} 

function resetAll() {
  resetDate();
  resetCity();
  resetState();
  resetCountry();
  resetShape();
}


d3.selectAll(".filter").on("click", updateFilters);
d3.selectAll("#filter-btn-reset").on("click", resetAll);


// Build the table when the page loads
buildTable(tableData);

