// INDSTILLINGER - Rediger disse værdier
var modelURL = "https://teachablemachine.withgoogle.com/models/6yFjg-Itx/"
var klassificeringsDelay = 1500
var sikkerhedsTaerskel = 0.8
var visVideo = true

// KLASSER - Tilføj dine egne klasser og billeder her
var classes = {
  "Play": {
    "image": "assets/Play.png"
  },
  "Stop": {
    "image": "assets/Stop.png"
  },
  "Noting": {
    "image": "assets/Nothing.png"
  }
}

// SYSTEM VARIABLER
var classifier, video, previousClass = ""

function preload() {
  // Indlæs AI-modellen - p5 venter automatisk
  classifier = ml5.imageClassifier(modelURL + "model.json")
  console.log("Indlæser AI-model...")
}

function setup() {
  noCanvas()
  console.log("Model klar!")
  
  // Tænd webcam
  video = createCapture(VIDEO)
  video.size(224, 224)
  visVideo ? video.parent('videoDiv') : video.hide()

  // Start klassificering
  console.log("Starter klassificering...")
  console.log("   Delay: " + klassificeringsDelay + "ms")
  console.log("   Sikkerhed: " + (sikkerhedsTaerskel * 100) + "%")
  classify() 
}

function classify() {
  classifier.classify(getFlippedVideo(video), function (error, results) {
    if (error) {
      console.error(error);
      setTimeout(classify, klassificeringsDelay)
      return;
    }
    
    if (results && results[0]) {
      var label = results[0].label
      var confidence = results[0].confidence
      
      if (label !== previousClass && confidence > sikkerhedsTaerskel) {
        console.log("Fundet: " + label)
        shiftPage(label)
        previousClass = label
      } else if (label === previousClass) {
        console.log("Bekræfter: " + label)
      } else {
        console.log("Ser muligvis: " + label)
      }
    }
    
    setTimeout(classify, klassificeringsDelay)
  })
}

function shiftPage(className) {
  if (classes[className]) {
    select('#pageImage').attribute('src', classes[className].image)
    select('#pageView').style('display', 'flex')
  } else {
    console.log("Klassen '" + className + "' findes ikke")
  }
}

