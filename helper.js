// ============================================
// HJÆLPEFUNKTIONER
// ============================================
// Dette script håndterer tekniske detaljer
// så eleverne kan fokusere på selve projektet

(function() {
  // Spejlvend video automatisk så det matcher Teachable Machine
  var style = document.createElement('style');
  style.textContent = '#videoDiv video { transform: scaleX(-1); }';
  document.head.appendChild(style);
  
  // Global funktion til at få spejlvendt video til klassificering
  var mirrorCanvas = null;
  var mirrorContext = null;
  
  window.getFlippedVideo = function(videoElement) {
    if (!mirrorCanvas) {
      mirrorCanvas = document.createElement('canvas');
      mirrorCanvas.width = 224;
      mirrorCanvas.height = 224;
      mirrorContext = mirrorCanvas.getContext('2d', { willReadFrequently: true });
    }
    
    // Spejlvend og tegn video på canvas
    mirrorContext.save();
    mirrorContext.scale(-1, 1);
    mirrorContext.drawImage(videoElement.elt, -224, 0, 224, 224);
    mirrorContext.restore();
    
    return mirrorCanvas;
  };

  // Patch canvas.getContext() for at tilføje willReadFrequently automatisk
  var originalGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(type, options) {
    if (type === '2d') {
      options = options || {};
      options.willReadFrequently = true;
    }
    return originalGetContext.call(this, type, options);
  };

  // Gem de originale console funktioner
  var originalWarn = console.warn;
  var originalError = console.error;
  var originalLog = console.log;

  // Liste over tekster der skal filtreres væk
  var filterList = [
    'backend was already registered',
    'Platform browser has already been set',
    'Initialization of backend',
    'WebGL is not supported',
    'Canvas2D',
    'Multiple readback operations',
    'getImageData',
    'willReadFrequently',
    'concept-canvas-will-read-frequently'
  ];

  // Hjælpefunktion til at tjekke om en besked skal filtreres
  function shouldFilter(message) {
    var msgStr = String(message);
    for (var i = 0; i < filterList.length; i++) {
      if (msgStr.indexOf(filterList[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  // Overskriver console.warn
  console.warn = function() {
    if (!shouldFilter(arguments[0])) {
      originalWarn.apply(console, arguments);
    }
  };

  // Overskriver console.error
  console.error = function() {
    if (!shouldFilter(arguments[0])) {
      originalError.apply(console, arguments);
    }
  };
  
  // Overskriver console.info
  var originalInfo = console.info;
  console.info = function() {
    if (!shouldFilter(arguments[0])) {
      originalInfo.apply(console, arguments);
    }
  };

  // Filtrerer ml5.js banner
  console.log = function() {
    var msg = String(arguments[0]);
    if (msg.indexOf('🌈') === -1 && msg.indexOf('Thank you for using ml5.js') === -1 && 
        msg.indexOf('ml5js.org') === -1 && msg.indexOf('community statement') === -1) {
      originalLog.apply(console, arguments);
    }
  };
})();
