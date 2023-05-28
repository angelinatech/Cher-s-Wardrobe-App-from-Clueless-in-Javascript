/* ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* Video Intro on Pageload *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */

let cherVideo = document.getElementById('cherVideo');
let app = document.getElementById('app');

cherVideo.addEventListener('canplay', function() {
  cherVideo.play().catch(function(error) {
    console.error('Failed to play the video:', error);
  });
});

cherVideo.onended = function() {
  cherVideo.style.display = 'none';
  app.style.display = 'block';
};

document.addEventListener('DOMContentLoaded', function() {
  cherVideo.style.display = 'block';
});

/* ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* Change Colour Animation *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */

let animatedTop = document.getElementById('cherTop');
let animatedSkirt = document.getElementById('cherSkirt');

// alternative colours for different screen 

// let Colour = [
//   { label: 'blue', color: { saturate: 310, contrast: 110, hueRotate: 0, brightness: 100 } },
//   { label: 'pink', color: { saturate: 310, contrast: 120, hueRotate: 90, brightness: 80 } },
//   { label: 'orange', color: { saturate: 320, contrast: 120, hueRotate: 170, brightness: 100 } },
//   { label: 'yellow', color: { saturate: 340, contrast: 130, hueRotate: 200, brightness: 130 } },
//   { label: 'green', color: { saturate: 310, contrast: 120, hueRotate: 240, brightness: 110 } },
//   { label: 'cyan', color: { saturate: 330, contrast: 130, hueRotate: 310, brightness: 110 } },
//   { label: 'purple', color: { saturate: 350, contrast: 120, hueRotate: 60, brightness: 85 } },
//   { label: 'red', color: { saturate: 300, contrast: 130, hueRotate: 135, brightness: 80 } }
// ];
let Colour = [
  { label: 'blue', color: { saturate: 160, contrast: 110, hueRotate: 360, brightness: 100 } },
  { label: 'pink', color: { saturate: 160, contrast: 110, hueRotate: 50, brightness: 100 } },
  { label: 'orange', color: { saturate: 160, contrast: 110, hueRotate: 90, brightness: 100 } },
  { label: 'yellow', color: { saturate: 160, contrast: 110, hueRotate: 280, brightness: 120 } },
  { label: 'green', color: { saturate: 212, contrast: 105, hueRotate: 144, brightness: 120 } },
  { label: 'cyan', color: { saturate: 160, contrast: 110, hueRotate: 330, brightness: 100 } },
  { label: 'purple', color: { saturate: 160, contrast: 110, hueRotate: 30, brightness: 100 } },
  { label: 'red', color: { saturate: 230, contrast: 105, hueRotate: 95, brightness: 90 } } 
];

function randomColour() {
  const random = Math.floor(Math.random() * Colour.length);
  return Colour[random];
}


animatedTop.addEventListener('animationiteration', () => {
  const randomValue = randomColour();
  const {saturate, contrast, hueRotate, brightness} = randomValue.color;
  const label = randomValue.label;
  animatedTop.setAttribute('data-label', label);
  animatedTop.style.filter = `contrast(${contrast}%) hue-rotate(${hueRotate}deg) saturate(${saturate}%) brightness(${brightness}%) drop-shadow(6px 6px 5px black)`;
});

animatedSkirt.addEventListener('animationiteration', () => {
  const randomValue = randomColour();
  const {saturate, contrast, hueRotate, brightness} = randomValue.color;
  const label = randomValue.label;
  animatedSkirt.setAttribute('data-label', label);
  animatedSkirt.style.filter = `contrast(${contrast}%) hue-rotate(${hueRotate}deg) saturate(${saturate}%) brightness(${brightness}%) drop-shadow(6px 6px 5px black)`;
});


/* ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* Controlling animation with buttons *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */

const topBackBtn = document.getElementById('topBackBtn');
const topForwardButton = document.getElementById('topFwdBtn');
const topPlayButton = document.getElementById('topPlayBtn');
const cherTop = document.getElementById('cherTop');
const skirtBackBtn = document.getElementById('skirtBackBtn');
const skirtForwardButton = document.getElementById('skirtFwdBtn');
const skirtPlayButton = document.getElementById('skirtPlayBtn');
const cherSkirt = document.getElementById('cherSkirt');


let isAnimationPlaying = false;
let isReverseAnimationPlaying = false;

// ~*~*~*~*~*~* top buttons *~*~*~*~*~*~ 

topPlayButton.addEventListener('click', () => {
  if (cherTop.style.animationPlayState === 'running') {
    cherTop.style.animationPlayState = 'paused';
    isAnimationPlaying = false;
    if (!isAnimationPlaying && cherSkirt.style.animationPlayState === 'paused') {
      compareColours(); 
    }
  } else {
    cherTop.style.animationPlayState = 'running';
    isAnimationPlaying = true;
  }
});

topForwardButton.addEventListener('mousedown', () => {
  if (!isAnimationPlaying) {
    cherTop.style.animationPlayState = 'running';
    isAnimationPlaying = true;
  }
});

topForwardButton.addEventListener('mouseup', () => {
  if (isAnimationPlaying) {
    cherTop.style.animationPlayState = 'paused';
    isAnimationPlaying = false;
  }
});

topBackBtn.addEventListener('mousedown', () => {
  if (!isReverseAnimationPlaying) {
    cherTop.style.animationPlayState = 'running';
    cherTop.style.animationDirection = 'reverse';
    isAnimationPlaying = true;
    isReverseAnimationPlaying = true;
  }
});

topBackBtn.addEventListener('mouseup', () => {
  if (isReverseAnimationPlaying) {
    cherTop.style.animationPlayState = 'paused';
    cherTop.style.animationDirection = 'normal';
    isAnimationPlaying = false;
    isReverseAnimationPlaying = false;
  }
});

// ~*~*~*~*~*~* same for skirt buttons *~*~*~*~*~*~ 

skirtPlayButton.addEventListener('click', () => {
  if (cherSkirt.style.animationPlayState === 'running') {
    cherSkirt.style.animationPlayState = 'paused';
    isAnimationPlaying = false;
    if (!isAnimationPlaying && cherTop.style.animationPlayState === 'paused') {
      compareColours();
    }
  } else {
    cherSkirt.style.animationPlayState = 'running';
    isAnimationPlaying = true;
  }
});

skirtForwardButton.addEventListener('mousedown', () => {
  if (!isAnimationPlaying) {
    cherSkirt.style.animationPlayState = 'running';
    isAnimationPlaying = true;
  }
});

skirtForwardButton.addEventListener('mouseup', () => {
  if (isAnimationPlaying) {
    cherSkirt.style.animationPlayState = 'paused';
    isAnimationPlaying = false;
  }
});

skirtBackBtn.addEventListener('mousedown', () => {
  if (!isReverseAnimationPlaying) {
    cherSkirt.style.animationPlayState = 'running';
    cherSkirt.style.animationDirection = 'reverse';
    isAnimationPlaying = true;
    isReverseAnimationPlaying = true;
  }
});

skirtBackBtn.addEventListener('mouseup', () => {
  if (isReverseAnimationPlaying) {
    cherSkirt.style.animationPlayState = 'paused';
    cherSkirt.style.animationDirection = 'normal';
    isAnimationPlaying = false;
    isReverseAnimationPlaying = false;
  }
});


/* ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* Compare the top to the skirt *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */

function compareColours() {
  const topColorLabel = animatedTop.getAttribute('data-label');
  const skirtColorLabel = animatedSkirt.getAttribute('data-label');
  const mismatchNotification = document.getElementById('mismatch');

  if (topColorLabel === skirtColorLabel) {
    console.log("Match!");
    localStorage.setItem('colorLabel', topColorLabel);
    setColors()
  } else {
    console.log("Mis-Match!");
    mismatchNotification.classList.add('show');
    setTimeout(() => {
      mismatchNotification.classList.remove('show');
    }, 2000);
  }
}

/* ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* Dress me option *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */


let moveButton = document.querySelector('.dressMeBtn');
let items = document.querySelectorAll('.loadingCher .dresspic');
let toHide = document.querySelector('#images');


let docElemStyle = document.documentElement.style;
let animationProp = typeof docElemStyle.animation === 'string' ?
  'animation' : 'WebkitAnimation';

moveButton.onclick = function() {
  console.log(toHide);
  toHide.classList.remove('opacity');
  toHide.classList.add('noOpacity');

  setTimeout(function() {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      item.style[animationProp + 'Delay'] = (i * 0.5) + 's';

      if (i === 0 || i === 2) {
        item.classList.toggle('is-moved');
      } else {
        item.classList.toggle('is-appeared');
      }
    }

    var recentColorLabel = localStorage.getItem('colorLabel');
    setColors(recentColorLabel);
  }, 0);
};



/* ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* Set Colour to Dress *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */

function setColors(recentColorLabel) {
  const jacketOn = document.getElementById('jacketOn');
  const jacketAndSkirtOn = document.getElementById('jacketAndSkirtOn');
  const fullOutfit = document.getElementById('fullOutfit');

  if (jacketOn && jacketAndSkirtOn && fullOutfit) {
    const matchingColor = Colour.find(function(color) {
      return color.label === recentColorLabel;
    });

    if (matchingColor) {
      jacketOn.style.filter = `
        saturate(${matchingColor.color.saturate}%)
        contrast(${matchingColor.color.contrast}%)
        hue-rotate(${matchingColor.color.hueRotate}deg)
        brightness(${matchingColor.color.brightness}%)
      `;

      jacketAndSkirtOn.style.filter = `
        saturate(${matchingColor.color.saturate}%)
        contrast(${matchingColor.color.contrast}%)
        hue-rotate(${matchingColor.color.hueRotate}deg)
        brightness(${matchingColor.color.brightness}%)
      `;

      fullOutfit.style.filter = `
        saturate(${matchingColor.color.saturate}%)
        contrast(${matchingColor.color.contrast}%)
        hue-rotate(${matchingColor.color.hueRotate}deg)
        brightness(${matchingColor.color.brightness}%)
      `;
    } else {
      console.log('Matching color not found');
    }
  } else {
    console.log('One or more elements not found');
  }
}



/* ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* Restart *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */

let browseBtn = document.querySelector('.browseBtn');

browseBtn.onclick = function() {
  location.reload(); 
};