function barPlot1(){
let name = '1st Generation'

let title = `${name}'s Plotly Chart`

let books = ["The Visual Display of Quantitative Information", "Automate the Boring Stuff", "Data Science from Scratch"]

let timesRead = [100, 50, 25]

let trace1 = {
    x: books,
    y: timesRead,
    type: 'bar'
};

let data = [trace1];

let layout = {
    title:{
        text: title,  
        font:{size:12}
    },
    width: 450, // Set the desired width here
    height: 300, // Set the desired height here
    xaxis: {
        showticklabels: false // Hide x-axis labels
    },
    margin: {
        l: 30, // Left margin
        r: 20, // Right margin
        b: 25, // Bottom margin
        t: 50, // Top margin
        pad: 4 // Padding between the plot and the container
    }
};

    Plotly.newPlot("barChart1", data, layout);
}

barPlot1()

function barPlot2() {
    let name = '1st Generation'

    let title = `${name}'s Plotly Chart`

    let books = ["The Visual Display of Quantitative Information", "Automate the Boring Stuff", "Data Science from Scratch"]

    let timesRead = [100, 50, 25]

    let trace1 = {
        x: books,
        y: timesRead,
        type: 'bar'
    };

    let data = [trace1];

    let layout = {
        title: {
            text: title,
            font: { size: 12 }
        },
        width: 450, // Set the desired width here
        height: 300, // Set the desired height here
        xaxis: {
            showticklabels: false // Hide x-axis labels
        },
        margin: {
            l: 30, // Left margin
            r: 20, // Right margin
            b: 25, // Bottom margin
            t: 50, // Top margin
            pad: 4 // Padding between the plot and the container
        }
    };

    Plotly.newPlot("barChart2", data, layout);
}
barPlot2()

function boxPlot1() {
    let name = '1st Generation'

    let title = `${name}'s Plotly Chart`

    let books = ["The Visual Display of Quantitative Information", "Automate the Boring Stuff", "Data Science from Scratch"]

    let timesRead = [100, 50, 25]

    let trace1 = {
        x: books,
        y: timesRead,
        type: 'bar'
    };

    let data = [trace1];

    let layout = {
        title: {
            text: title,
            font: { size: 12 }
        },
        width: 450, // Set the desired width here
        height: 300, // Set the desired height here
        xaxis: {
            showticklabels: false // Hide x-axis labels
        },
        margin: {
            l: 30, // Left margin
            r: 20, // Right margin
            b: 25, // Bottom margin
            t: 50, // Top margin
            pad: 4 // Padding between the plot and the container
        }
    };

    Plotly.newPlot("boxChart1", data, layout);
}
boxPlot1()