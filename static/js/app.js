// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
		console.log(`buildMetadata function: ${sample}`);

    // Filter the metadata for the object with the desired sample number

    // Use d3 to select the panel with id of `#sample-metadata`
		const dataPanel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
		dataPanel.html('');

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
		dataPanel.html('Hello panel world!');

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
		console.log(`buildCharts function: ${sample}`);


    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values


    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
	console.log('init function:');
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
		let names = data['names'];
		console.log(`names: ${names}`);

    // Use d3 to select the dropdown with id of `#selDataset`
		const dropdown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
		for (let i = 0; i < names.length; i++) {
			dropdown.append('option').text(names[i]);
		};

    // Get the first sample from the list
		let firstSample = data['metadata'][0];

    // Build charts and metadata panel with the first sample
		buildMetadata(firstSample);

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
	console.log(`optionChanged function: ${newSample}`);

}

// Initialize the dashboard
init();
