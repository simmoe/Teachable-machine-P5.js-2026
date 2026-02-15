# Teachable Machine + P5.js Template

A simple template for using Google's Teachable Machine image models with P5.js.

## Quick Start

### 1. Train Your Model
- Go to [teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com)
- Create an **Image Project**
- Train your model with your images
- Click **Export Model** → **Upload my model**
- Copy the link (e.g., `https://teachablemachine.withgoogle.com/models/ABC123/`)

### 2. Update Your Settings

**Option A: Edit `sketch.js`** (easiest)
```javascript
var modelURL = "https://teachablemachine.withgoogle.com/models/YOUR-MODEL/"
var klassificeringsDelay = 1500
var sikkerhedsTaerskel = 0.8
var visVideo = true
```

**Option B: Edit `config.json`** (more flexible)
```json
{
  "settings": {
    "modelURL": "https://teachablemachine.withgoogle.com/models/YOUR-MODEL/",
    "klassificeringsDelay": 1500,
    "sikkerhedsTaerskel": 0.8,
    "visVideo": true
  }
}
```

### 3. Add Your Images
1. Put your images in the `assets/` folder
2. Name them after your classes (e.g., `Play.png`, `Stop.png`)

### 4. Configure Classes in `config.json`
```json
{
  "classes": {
    "YourClass1": {
      "image": "assets/YourClass1.png"
    },
    "YourClass2": {
      "image": "assets/YourClass2.png"
    }
  }
}
```

**Important:** Class names must match exactly what you named them in Teachable Machine!

### 5. Run It
- Open `index.html` in your browser
- Allow camera access when prompted
- Check the console (Cmd+Option+I on Mac, F12 on Windows) for feedback

## Settings Explained

- **modelURL**: Link to your Teachable Machine model
- **klassificeringsDelay**: Milliseconds between predictions (1000 = 1 second)
- **sikkerhedsTaerskel**: Confidence threshold (0.8 = 80%)
- **visVideo**: Show webcam preview (true/false)

## Troubleshooting

### Model too slow?
Increase the delay:
```javascript
var klassificeringsDelay = 2000  // Check every 2 seconds instead of 1.5
```

### Model too sensitive?
Increase the confidence threshold:
```javascript
var sikkerhedsTaerskel = 0.9  // Require 90% confidence instead of 80%
```

### Video not showing?
```javascript
var visVideo = true
```

## Tips for Better Performance

- Close other browser tabs (especially video streaming)
- Use good lighting
- Keep objects close to the camera
- Use Chrome browser for best performance
- Adjust `klassificeringsDelay` based on your computer's speed

## Console Output

The console shows only important messages (technical warnings are filtered out):

```
🤖 Loading AI model...
✅ Model ready!
✅ Starting classification...
   Delay: 1500ms
   Confidence: 80%
🎯 Found: Play (confidence: 95%)
```

---

Built with [ml5.js](https://ml5js.org) and [P5.js](https://p5js.org)
