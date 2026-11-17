let bgImg;
let charImg;

// 背景捲動與串接相關變數
let bgX = 0;
let bgWidth;
let totalBgWidth;

// 角色 1 相關變數
let charX;
let charY;
let charW, charH;
let charSpeed = 4; // 角色移動速度

function preload() {
  // 載入 1/bg.png 背景圖片與角色圖片
  bgImg = loadImage('1/bg.png');
  charImg = loadImage('char.png'); // 請替換成你實際的角色圖片檔名
}

function setup() {
  createCanvas(800, 600);
  
  // 依據背景圖片原本的尺寸比例，計算填滿畫布高度時的寬度
  bgWidth = height * (bgImg.width / bgImg.height);
  totalBgWidth = bgWidth * 3; // 三張圖串接的總寬度

  // 1. 角色 1 高度設定為整個畫布的 1/3
  charH = height / 3;
  // 2. 角色 1 寬度依照原本圖片的寬高比例做修正
  charW = charH * (charImg.width / charImg.height);
  
  // 初始化角色位置（預設放在畫布水平中央偏下方）
  charX = width / 2 - charW / 2;
  charY = height - charH - 20; 
}

function draw() {
  background(220);

  // 判斷背景是否已到達最左或最右邊界
  let isAtLeftEdge = (bgX >= 0);
  let isAtRightEdge = (bgX <= width - totalBgWidth);

  // --- 按鍵互動與移動邏輯 ---
  if (keyIsDown(RIGHT_ARROW)) {
    // 按下右鍵：背景還沒到最右邊時，背景往左捲動
    if (!isAtRightEdge) {
      bgX -= 6; // 背景捲動速度
      if (bgX < width - totalBgWidth) {
        bgX = width - totalBgWidth; // 限制不超過最右邊界
      }
    } else {
      // 背景到底了，暫停背景捲動，改由角色 1 往右移動
      charX += charSpeed;
      if (charX > width - charW) {
        charX = width - charW; // 限制角色不出右側畫面
      }
    }
  } 
  else if (keyIsDown(LEFT_ARROW)) {
    // 按下左鍵：背景還沒到最左邊時，背景往右捲動
    if (!isAtLeftEdge) {
      bgX += 6; // 背景捲動速度
      if (bgX > 0) {
        bgX = 0; // 限制不超過最左邊界
      }
    } else {
      // 背景到起點了，暫停背景捲動，改由角色 1 往左移動
      charX -= charSpeed;
      if (charX < 0) {
        charX = 0; // 限制角色不出左側畫面
      }
    }
  }

  // --- 繪製三張串接的背景圖片（左、中、右無縫連接） ---
  image(bgImg, bgX, 0, bgWidth, height);
  image(bgImg, bgX + bgWidth, 0, bgWidth, height);
  image(bgImg, bgX + (bgWidth * 2), 0, bgWidth, height);

  // --- 繪製角色 1 ---
  image(charImg, charX, charY, charW, charH);
}