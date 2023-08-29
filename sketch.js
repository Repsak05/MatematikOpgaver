//////////////////////////////////
//MOVE BACKARDS TO SEE THE PLANE//
//////////////////////////////////


//Variables for movement
let moveSpeed = 15;
let rotSpeed = 3;
let camX = 0;
let camY = 0;
let camZ = 0;
let angleX = 0;
let angleY = 0;

//Parameterfremstilling af et plan
let punkt1 = [5,-4,-2];
let punkt2 = [2,3,4];
let punkt3 = [1,4,-2];
let skalar1 = 6;
let skalar2 = 2;
let sphereSize = 20;

//Slider
let slider1;
let slider2;

function setup() 
{
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  slider1 = createSlider(0, 360, 60, 40);
  slider1.position(10, 10);
  slider1.style('width', '80px');

  slider2 = createSlider(0, 360, 60, 40);
  slider2.position(10, 40);
  slider2.style('width', '80px');
}

function draw() 
{
  background(220);
  Parameterfremstilling(punkt1,punkt2,punkt3,skalar1,skalar2);

  //Movement
  WASD(); //Move with WASD
  Rotate(); //Rotate with arrow
  UpDown(); //Go up and down with shift and space
  //camera pos/view/rot
  camera(camX, camY, camZ, 
    camX + cos(angleY) * cos(angleX), camY + sin(angleX), camZ + sin(angleY) * cos(angleX), 
    0, 1, 0);
}


function Parameterfremstilling(p1, p2,p3,s1,s2)
{
  let val1 = slider1.value();
  let val2 =slider2.value();


  for(let j = 0; j<val1;j+=sphereSize/2)
  {
    s1 = j;
    for(let k = 1; k<val2;k+=sphereSize/2)
    {
      s2 = k;

      vp1p2 = [p2[0] - p1[0], 
              p2[1] - p1[1],
              p2[2] - p1[2]
              ];

      vp1p3 = [p3[0] - p1[0], 
              p3[1] - p1[1],
              p3[2] - p1[2]
              ];

      TranslateValue = [
                    p1[0] + (vp1p2[0] * s1) + (vp1p3[0] * s2),
                    p1[1] + (vp1p2[1] * s1) + (vp1p3[1] * s2),
                    p1[2] + (vp1p2[2] * s1) + (vp1p3[2] * s2)
                    ];

      push();

      translate(TranslateValue[0],TranslateValue[1],TranslateValue[2]-100);
      sphere(sphereSize);
      pop();
    }
  }
}

function WASD()
{
  if (keyIsDown(87)) // W key
  { 
    camX += moveSpeed * cos(angleY);
    camZ += moveSpeed * sin(angleY);
  }
  if (keyIsDown(83)) // S key
  { 
    camX -= moveSpeed * cos(angleY);
    camZ -= moveSpeed * sin(angleY);
  }
  if (keyIsDown(65)) // A key
  { 
    camX += moveSpeed * cos(angleY - 90);
    camZ += moveSpeed * sin(angleY - 90);
  }
  if (keyIsDown(68)) // D key
  { 
    camX += moveSpeed * cos(angleY + 90);
    camZ += moveSpeed * sin(angleY + 90);
  }
}
function Rotate()
{
  if (keyIsDown(UP_ARROW)) 
  {
    angleX -= rotSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) 
  {
    angleX += rotSpeed;
  }
  if (keyIsDown(LEFT_ARROW)) 
  {
    angleY -= rotSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) 
  {
    angleY += rotSpeed;
  }  
}
function UpDown()
{
  if (keyIsDown(32)) // Space key
  { 
    camY -= moveSpeed;
  }
  if (keyIsDown(SHIFT)) // Shift key
  { 
    camY += moveSpeed;
  }
}