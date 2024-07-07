// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
		console.log(`buildMetadata function: ${sample}`);
		metadata = data['metadata'];

    // Filter the metadata for the object with the desired sample number
		let selectedSample = metadata.find(md => md.id == sample); // using weak equals to match string (from names) to int (from metadata)
		console.log(`(in buildMetadata) selectedSample contents: ${selectedSample}`);

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
		console.log(`buildCharts function: ${sample}`);
		samples = data['samples'];

    // Filter the samples for the object with the desired sample number
		let selectedSample = samples.find(s => s.id == sample); // using weak equals to match string (from names) to int (from metadata)
		console.log(`(in buildCharts) selectedSample contents: ${selectedSample}`);

    // Get the otu_ids, otu_labels, and sample_values
		const otu_ids = selectedSample['otu_ids'];
		const otu_labels = selectedSample['otu_labels'];
		const sample_values = selectedSample['sample_values'];
		console.log(`(in buildCharts) otu_ids contents: ${otu_ids}`);
		console.log(`(in buildCharts) otu_labels contents: ${otu_labels}`);
		console.log(`(in buildCharts) sample_values contents: ${sample_values}`);

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
		console.log(`X Values Before (sample_values): ${sample_values}`);	
		console.log(`Y Values Before (otu_ids): ${otu_ids}`);	

		displayed_sample_values = sample_values.slice(0, 10);
		displayed_otu_ids = otu_ids.slice(0, 10);

		console.log(`X Values AFTER (sample_values): ${displayed_sample_values}`);	
		console.log(`Y Values AFTER (otu_ids): ${displayed_otu_ids}`);	

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
		firstSample = names[0];
		console.log(`firstSample: ${firstSample}`);

    // Build charts and metadata panel with the first sample
		buildMetadata(firstSample);
		buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
	console.log(`optionChanged function: ${newSample}`);
	buildMetadata(newSample);
	buildCharts(newSample);
}

// Initialize the dashboard
init();
