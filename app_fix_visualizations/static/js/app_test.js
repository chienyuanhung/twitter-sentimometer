d3.json("impeachment_tweets_score.json", function(error, data){
  console.log(data);
  
  var usernames = []
  var clean_tweets = []
  var impeachmentScores = []
  var likes = []
  var retweets =[]
  var new_score
  

  data.forEach(function(d){
      //console.log(d.score)

      new_score = 2*(+d.score-0.5)
      tweet = d.clean_tweets
      like = +d.likes
      retweet = +d.retweets
      username = d.username

      usernames.push(username)
      clean_tweets.push(tweet)
      impeachmentScores.push(new_score)
      likes.push(like)
      retweets.push(retweet)
      
  });

  console.log(usernames)
  console.log(clean_tweets)
  console.log(impeachmentScores)
  console.log(likes)
  console.log(retweets)
  
  var xValues = usernames;
  //console.log(XValues)
  var yValues = impeachmentScores;
  var markerSize = impeachmentScores * 50;
  var markerColors = impeachmentScores;
  var textValues = clean_tweets;

  var trace = {
    x: xValues,
    y: yValues,
    mode: "markers",
    type: "scatter",
    marker: {
      color: markerColors,   //markerColors,
      size: markerSize,
      colorscale: "Magma"   //"Viridis"
      //sizemode: "area",
      //showscale: true
    },
    text: textValues
    //text: `(${markerColors[0]}, ${markerSize[0]}) <br> ${textValues[0]}`
  };

  var data = [trace];

  var layout = {
    xaxis: {
      title: "<b>Tweets With Keyword Impeachment</b>",
      automargin: true
    },
    yaxis: {
      title: "<b>Tweet Sentiment Score</b>",
      autorange: true,
      automargin: true
    },
    title: "Impeachment Sentiment"
  };

  Plotly.newPlot("scatter", data, layout)


}); 





function buildMetadata(tweet) {

  // Use `d3.json` to fetch the metadata for a sample
  var metUrl = "impeachment_tweets_score.json";
  d3.json(metUrl).then((tweets) => { 
    //console.log(tweets)
    tweets.forEach((tweet) => {
    //console.log("url");
    //console.log(metUrl);
    //console.log("first sample");
    //console.log(tweet);
   })

    // Use d3 to select the panel with id of `#sample-metadata`
    var meta_sample = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    meta_sample.html("");
    //console.log("meta sample");
    //console.log(meta_sample);

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(tweet).forEach(function ([key, value]) {
      // loop and use d3 to append new tags for each key-value in the metadata.
      var row = meta_sample.append("p");
      row.text(`${key}: ${value}`);
      //console.log("row");
      //console.log(row);
      //console.log("key, value");
      //console.log(key, value);
    })
  });
};



// d3.json("../../db/impeachment_tweets_score.json").then((idNames) => {
//   console.log(idNames)
//   idNames.forEach((tweets) => {
//     console.log(tweets)
//     console.log(tweets.username)
//     selector
//       .append("option")
//       .text(tweets.username)
//       .property("value", tweets.username);
//   });


// function buildMetadata(id) {

//   // Use `d3.json` to fetch the metadata for a sample
//   var metUrl = `../../db/impeachment_tweets_score.json/${id}`;
//   d3.json(metUrl).then(function (id) {
//     console.log("url");
//     console.log(metUrl);
//     console.log("first sample");
//     console.log(id);


//     // Use d3 to select the panel with id of `#sample-metadata`
//     var meta_sample = d3.select("#sample-metadata");

//     // Use `.html("") to clear any existing metadata
//     meta_sample.html("");
//     console.log("meta sample");
//     console.log(meta_sample);

//     // Use `Object.entries` to add each key and value pair to the panel
//     Object.entries(id).forEach(function ([key, value]) {
//       // loop and use d3 to append new tags for each key-value in the metadata.
//       var row = meta_sample.append("p");
//       row.text(`${key}: ${value}`);
//       console.log("row");
//       console.log(row);
//       console.log("key, value");
//       console.log(key, value);
//     })
//   });
// };


// // Bubble Chart
function buildCharts(tweet) {
//   var tweetUrl = "../../db/impeachment_tweets_score.json";
//   d3.json(tweetUrl).then(function (data) {
//     console.log(data)

//     var xValues = data.id;
//     //console.log(XValues)
//     var yValues = data.model_score;
//     var markerSize = data.model_score;
//     var markerColors = data.model_score;
//     var textValues = data.tweet;

//     var trace = {
//       x: xValues,
//       y: yValues,
//       //mode: "markers",
//       type: "scatter",
//       marker: {
//         color: markerColors,   //markerColors,
//         size: markerSize,
//         colorscale: "Viridis"
//         //sizemode: "area",
//         //showscale: true
//       },
//       text: textValues
//       //text: `(${markerColors[0]}, ${markerSize[0]}) <br> ${textValues[0]}`
//     };

//     var data = [trace];

//     var layout = {
//       xaxis: {
//         title: "<b>Tweets With Keyword Impeachment</b>"
//       },
//       yaxis: {
//         title: "<b>Tweet Sentiment Score</b>",
//         autorange: true
//       },
//       title: "Impeachment Sentiment"
//     };

//     Plotly.newPlot("scatter", data, layout)
//   });



  // GAUGE PLOT
  // Adapted Gauge Chart from <https://plot.ly/javascript/gauge-charts/>
  // Weekly Washing Frequency 0-9 increment by 1
  // `/metadata/<sample>`route
  // buildGauge(data.WFREQ);




  var metUrl = "impeachment_tweets_score.json";
  d3.json(metUrl).then((data) => { 
    console.log(data)
    data.forEach((score) => {
    //console.log("data");
    //console.log(score)
    var score = 2*(score.score-0.5);
    //console.log("score");
    //console.log(score)
    
    // Enter a washing freq between 0 and 180  (180/9= 20; "20" is the scaling factor that must me multipied to wash freq to make it work)
    var level = parseFloat(score) * 180;

    // Trig to calc meter point
    var degrees = 180 - level,
      radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [{
      type: 'scatter',
      x: [0], y: [0],
      marker: { size: 28, color: '850000' },
      showlegend: false,
      name: 'Tweet Model Score',
      // need to divide by 20 to get the correct model_score value on hover
      text: level / 180,
      hoverinfo: 'text+name'
    },
    {
      values: [50 / 2, 50 / 2, 50],
      rotation: 90,
      text: ['Positive', 'Negative', ''],
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ['rgba(14, 70, 0, .5)', 'rgba(248, 226, 202, .5)',
          'rgba(255, 255, 255, 0)']
      },
      labels: ['0.5-1', '0-0.5', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes: [{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
      title: '<b>Tweet Sentiment Score</b> <br> 0 - 0.5 = Negative Sentiment <br> 0.5 - 1.0 = Positive Sentiment',
      height: 500,    // resize to fit
      width: 500,     // resize to fit
      xaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      },
      yaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      }
    };

    // DIV id="gauge"  #gauge to insert into HTML in the correct DIV
    Plotly.newPlot("gauge", data, layout);
  })
  })
};


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("impeachment_tweets_score.json").then((idNames) => {
    //console.log(idNames)
    idNames.forEach((tweet) => {
      //console.log(tweets)
      //console.log(tweets.username)
      var user = tweet.username
      selector
        .append("option")
        .text(user)
        .property("value", user);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = idNames[899];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  d3.json("impeachment_tweets_score.json").then((data) => {
  // Fetch new data each time a new sample is selected
  for(i=0; i <= data.length; i++){
    if (data[i].username == newSample){
      buildCharts(data[i]);
      buildMetadata(data[i]);
    }
  }
  })
}

// Initialize the dashboard
init();


// d3.json("../../db/impeachment_tweets_score.json").then((idNames) => {
//   idNames.forEach((tweet) => {
//     selector
//       .append("option")
//       .text(tweet)
//       .property("value", tweet);
//   });