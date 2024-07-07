// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
		metadata = data['metadata'];

    // Filter the metadata for the object with the desired sample number
		const selectedSample = metadata.find(md => md.id == sample); // using weak equals to match string (from names) to int (from metadata)

    // Use d3 to select the panel with id of `#sample-metadata`
		const dataPanel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
		dataPanel.html('');

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
		for (const key in selectedSample) {
			dataPanel.append('p').text(`${key.toUpperCase()}: ${selectedSample[key]}`);
		};
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
		samples = data['samples'];

    // Filter the samples for the object with the desired sample number
		const selectedSample = samples.find(s => s.id == sample); // using weak equals to match string (from names) to int (from metadata)

    // Get the otu_ids, otu_labels, and sample_values
		const otu_ids = selectedSample['otu_ids'];
		const otu_labels = selectedSample['otu_labels'];
		const sample_values = selectedSample['sample_values'];

    // Build a Bubble Chart
		const bubbleChartData = [
			{
				x: otu_ids,
				y: sample_values,
				mode: 'markers',
				marker: {
					size: sample_values,
					color: otu_ids,
					text: otu_labels
				}
			}
		];

		const bubbleChartLayout = {
			title: 'Bacteria Cultures Per Sample',
			showlegend: false,
			xaxis: {
				title: 'OTU ID'
			},
			yaxis: {
				title: 'Number of Bacteria'
			}
		};

    // Render the Bubble Chart
		Plotly.newPlot('bubble', bubbleChartData, bubbleChartLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
		// sort and reverse the values
		displayed_sample_values = sample_values.slice(0, 10).reverse();
		displayed_otu_ids = otu_ids.map(x => 'OTU ' + x).slice(0, 10).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
		const barChartData = [{
			x: displayed_sample_values, 
			y: displayed_otu_ids,
			orientation: 'h',
			hovertext: otu_labels,
			type: 'bar'
		}];

		const barChartLayout = {
			title: 'Top 10 Bacteria Cultures Found',
			xaxis: {
				title: 'Number of Bacteria'
			}
		};

    // Render the Bar Chart
		Plotly.newPlot('bar', barChartData, barChartLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
		const names = data['names'];

    // Use d3 to select the dropdown with id of `#selDataset`
		const dropdown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
		for (let i = 0; i < names.length; i++) {
			dropdown.append('option').text(names[i]);
		};

    // Get the first sample from the list
		firstSample = names[0];

    // Build charts and metadata panel with the first sample
		buildMetadata(firstSample);
		buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
	buildMetadata(newSample);
	buildCharts(newSample);
}

// Initialize the dashboard
init();
