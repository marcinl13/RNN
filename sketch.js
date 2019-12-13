// The SketchRNN model
let model;
// Start by drawing
let previous_pen = "down";
// Current location of drawing
let x, y;
// The current "stroke" of the drawing
let strokePath;
//Enabled Models
let select;
let button;
let enableModels = ['alarm_clock',  'ambulance',  'angel',  'ant',  'antyoga',  'backpack',  'barn',  'basket',  'bear',  'bee',  'beeflower',  'bicycle',  'bird',  'book',  'brain',  'bridge',  'bulldozer',  'bus',  'butterfly',  'cactus',  'calendar',  'castle',  'cat',  'catbus',  'catpig',  'chair',  'couch',  'crab',  'crabchair',  'crabrabbitfacepig',  'cruise_ship',  'diving_board',  'dog',  'dogbunny',  'dolphin',  'duck',  'elephant',  'elephantpig',  'eye',  'face',  'fan',  'fire_hydrant',  'firetruck',  'flamingo',  'flower',  'floweryoga',  'frog',  'frogsofa',  'garden',  'hand',  'hedgeberry',  'hedgehog',  'helicopter',  'kangaroo',  'key',  'lantern',  'lighthouse',  'lion',  'lionsheep',  'lobster',  'map',  'mermaid',  'monapassport',  'monkey',  'mosquito',  'octopus',  'owl',  'paintbrush',
  'palm_tree',  'parrot',  'passport',  'peas',  'penguin',  'pig',  'pigsheep',  'pineapple',  'pool',  'postcard',  'power_outlet',  'rabbit',  'radioface',  'rain',  'rhinoceros',  'rifle',  'roller_coaster',  'sandwich',  'scorpion',  'sea_turtle',  'sheep',  'skull',  'snail',  'snowflake',  'speedboat',  'spider',  'squirrel',  'steak',  'stove',  'strawberry',  'swan',  'swing_set',  'the_mona_lisa',  'tiger',  'toothbrush',  'toothpaste',  'tractor',  'trombone',  'truck',  'whale',  'windmill',  'yoga',  'yogabicycle',  'everything',];

let modelChoosen = enableModels[0];

// For when SketchRNN is fixed
function preload() {
  // See a list of all supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
  model = ml5.sketchRNN(modelChoosen);
}

function setup() {
  createCanvas(640, 480);
  background(220);

  select = createSelect(10,10);

  //add some options to the select
  for (let i = 0; i < enableModels.length; i++) {
    select.option(enableModels[i]);
  }

  select.changed(onChangeBtn);

  // Button to reset drawing
  button = createButton("draw");
  button.mousePressed(startDrawing);
  button.style('background-color', 'Tomato');
  button.hide();
  
  // run sketchRNN
  startDrawing();
}

function onChangeBtn() {
  model = ml5.sketchRNN(select.value());
  startDrawing();
}

function modelReady() {
  console.log("model loaded");
  startDrawing();
}

// Reset the drawing
function startDrawing() {
  background(220);
  // Start in the middle
  x = width / 2;
  y = height / 2;
  model.reset();
  // Generate the first stroke path
  model.generate(gotStroke);
}

function draw() {
  // If something new to draw
  if (strokePath) {
	button.style('background-color', 'MediumSeaGreen');
	button.show();  
    // If the pen is down, draw a line
    if (previous_pen == "down") {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== "end") {
      strokePath = null;
      model.generate(gotStroke);
    }
  }
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}
