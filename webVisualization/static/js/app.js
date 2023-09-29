function init() {
    // gathering elements for selDataset dropdown
    var selected = d3.select("#selDataset");
    d3.json("http://127.0.0.1:5000/api/gen").then((data) => {
        console.log(data.gens)
        var sampleGens = data.gens;
        sampleGens.forEach((sample) => {
            selected
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // building the initial charts
        var testGen = sampleGens[0];
        console.log(testGen);
        boxPlot1(testGen)
        barPlot2(testGen)
        barPlot1(testGen)
        PokemonImage(testGen)
        PokemonImageMin(testGen)
    });
}
// running the initial dashboard
init();

function optionChanged(newSample) {
    // go for new data at every new sample selected

    boxPlot1(newSample);
    barPlot2(newSample);
    barPlot1(newSample);
    PokemonImage(newSample);
    PokemonImageMin(newSample);
}

function barPlot1(gen){
    let name = gen
    let title = `${name} Generation`

    d3.json("http://127.0.0.1:5000/api/gentypes").then((data)=>{
        var genTypes=data.genTypes

        console.log(genTypes)
        var genTypesGen= genTypes.filter(genTypesObj => genTypesObj.G == gen)
        console.log(genTypesGen)
        var sortedByCount = genTypesGen.sort((a, b) => b.count - a.count);
        var top5 = sortedByCount.slice(0, 5);
        var typeValues = top5.map(Obj => Obj.T)
        console.log(typeValues)
        var countValues = top5.map(Obj => Obj.count)
        console.log(countValues)

        
        let trace1 = {
            x: typeValues,
            y: countValues,
            type: 'bar'
        };

        let barData = [trace1];

        let layout = {
            title:{
                text: title,  
                font:{size:12}
            },
            width: 450, // Set the desired width here
            height: 450, // Set the desired height here
            xaxis: {
                showticklabels: true // Hide x-axis labels
            },
            margin: {
                l: 30, // Left margin
                r: 20, // Right margin
                b: 25, // Bottom margin
                t: 50, // Top margin
                pad: 4 // Padding between the plot and the container
            }
        
        };
            Plotly.newPlot("barChart1", barData, layout);
    });
}



function barPlot2(gen) {
    let name = gen
    let title = `${name} Generation`

    d3.json("http://127.0.0.1:5000/api/gen2types").then((data) => {
        var gen2Types = data.gen2Types
        console.log(gen2Types)
        var gen2TypesGen = gen2Types.filter(gen2TypesObj => gen2TypesObj.G == gen  )
        var type2Exist = gen2TypesGen.filter(gen2TypesObj => gen2TypesObj.T[1]!= "none")
       
        console.log(type2Exist)

        var sorted2ByCount = type2Exist.sort((a, b) => b.count - a.count);
        var topTwo5 = sorted2ByCount.slice(0, 5);
        var type2Values = topTwo5.map(Obj => Obj.T);
        console.log(type2Values)
        var combinedList = type2Values.map(arr => arr.join(', '));
        console.log(combinedList)
        var count2Values = topTwo5.map(Obj => Obj.count);
        console.log(count2Values)


        let trace1 = {
            x: combinedList,
            y: count2Values,
            type: 'bar', 
            
        };

        let bar2Data = [trace1];

        let layout = {
            title: {
                text: title,
                font: { size: 12 }
            },
            width: 450, // Set the desired width here
            height: 450, // Set the desired height here
            xaxis: {
                showticklabels: true // Hide x-axis labels
            },
            margin: {
                l: 30, // Left margin
                r: 20, // Right margin
                b: 70, // Bottom margin
                t: 50, // Top margin
                pad: 4 // Padding between the plot and the container
            }

        };
        Plotly.newPlot("barChart2", bar2Data, layout);
    });
}


function boxPlot1(gen) {
    d3.json("http://127.0.0.1:5000/api/total").then((data) => {
        var scatterTotal = data.total;
        var scatterGenFilter = scatterTotal.filter(genFilterObj => genFilterObj.gen == gen);
        var scatterData = scatterGenFilter.map(Obj => Obj.data);
        console.log(scatterData);
        
        const scatData = {
            datasets: [{
                label: 'Pokemon',
                data: scatterData,
                backgroundColor: 'red', // Change this color
                borderColor: 'red', // Change this color
                borderWidth: 1
            }]
        };

        const config = {
            type: 'scatter',
            data: scatData,
            options: {
                scales: {
                    xAxis: {
                        type: 'category',
                        position: 'bottom',
                        ticks:{
                            display:false
                        }
                    }
                }
            }
        };

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, config);
    });
}

function PokemonImage(gen){
    console.log("hello world")
    d3.json("http://127.0.0.1:5000/api/max").then((data) =>{
    var maxData = data.max
    console.log(maxData)
    var maxGenFilter = maxData.filter(genFilterObj => genFilterObj.G == gen)
    var imageUrl = maxGenFilter[0].ImageUrl
    var imageContainer = document.getElementById("imageUrlMax");
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Displayed Image" />`
    
    });
}

function PokemonImageMin(gen) {
    console.log("hello world")
    d3.json("http://127.0.0.1:5000/api/min").then((data) => {
        var minData = data.min
        console.log(minData)
        var minGenFilter = minData.filter(genFilterObj => genFilterObj.G == gen)
        var imageUrlMin = minGenFilter[0].ImageUrl
        var imageContainer = document.getElementById("imageUrlMin");
        imageContainer.innerHTML = `<img src="${imageUrlMin}" alt="Displayed Image" />`

    });
}
