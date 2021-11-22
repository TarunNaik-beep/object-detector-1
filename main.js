img = "";
myStatus = "";
objects = [];


function preload() {
    
    img = loadImage("hi.png");
}

function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}

function draw() {
    image(img,0,0,640,420);
    if(myStatus!="") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: detecting objects";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log(modelLoaded);
    myStatus = true;
    object_detector.detect(img,gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results
    }
}