// INDSTILLINGER (sættes fra config.json)
var modelURL, klassificeringsDelay, sikkerhedsTaerskel, visVideo

// SYSTEM VARIABLER
var classifier, video, config, previousClass = ""

function preload() {
  //Hent config.json filen
  config = loadJSON("config.json")
  console.log("Indlæser AI-model...")
}

function setup() {
  noCanvas()
  
  // Hent indstillinger fra config.json
  modelURL = config.settings.modelURL
  klassificeringsDelay = config.settings.klassificeringsDelay
  sikkerhedsTaerskel = config.settings.sikkerhedsTaerskel
  visVideo = config.settings.visVideo
  
  // Indlæs AI-modellen
  classifier = ml5.imageClassifier(modelURL + "model.json")

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
  if (config.classes[className]) {
    select('#pageImage').attribute('src', config.classes[className].image)
    select('#pageView').style('display', 'flex')
  } else {
    console.log("Klassen '" + className + "' findes ikke i config.json")
  }
}

