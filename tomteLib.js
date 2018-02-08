console.log("***tomteLib loaded***");

var test;

function tomteManager() {
  this.draw = function() {
    for (w of windows) {
      if (w.visible) {
        w.show();
      }
    }
    for (b of buttons) {
      if (b.visible) {
        b.show();
      }
      b.update();
    }
  }
  this.clear = function() {
    buttons = [];
    windows = [];
  }
}

/**
 * @method mouseOverRect
 * @param {Number} x      // X position
 * @param {Number} y      // Y position
 * @param {Number} xs     // Width of the rectangle
 * @param {Number} ys     // Height of the rectangle
 * @param {String} [mode] // rectMode [CENTER] or [CORNER]
 * @param {Boolean} false // Check if equal or not
 * @return {p5}
 */
p5.prototype.mouseOverRect = function(x, y, xs, ys, mode, equal) {
  // This checks if the mouse is inside the specified rectangle
  mode = mode || "corner";
  equal = equal;

  if (mode == "center") {
    if (!equal) {
      if (mouseX >= x-xs/2 && mouseX <= x+xs/2 && mouseY >= y-ys/2 && mouseY <= y+ys/2) {
        return true;
      }
    } else {
      if (mouseX > x-xs/2 && mouseX < x+xs/2 && mouseY > y-ys/2 && mouseY < y+ys/2) {
        return true;
      }
    }
  }
  if (mode == "corner") {
    if (!equal) {
      if (mouseX >= x && mouseX <= x+xs && mouseY >= y && mouseY <= y+ys) {
        return true;
      }
    } else {
      if (mouseX > x && mouseX < x+xs && mouseY > y && mouseY < y+ys) {
        return true;
      }
    }
  }
}

/**
 * @method mouseOverEllipse
 * @param {Number} x  // X position
 * @param {Number} y  // Y position
 * @param {Number} r  // Radius of the ellipse
 * @return {p5}
 */
p5.prototype.mouseOverEllipse = function(x, y, r) {
  // This checks if the mouse is inside the specified ellipse
  if (dist(mouseX, mouseY, x, y) < r) {
    return true;
  }
}

/**
 * @method mouseOverRectObj
 * @param {Number} object  // Object to pass through
 * @param {String} mode    // rectMode [CENTER] or [CORNER]
 * @return {p5}
 */
p5.prototype.mouseOverRectObj = function(obj, mode) {
  mode = mode || "corner";

  if (mode == "center") {
    if (mouseX >= obj.pos.x-obj.size/2 && mouseX <= obj.pos.x+obj.size/2 && mouseY >= obj.pos.y-obj.size/2 && mouseY <= obj.pos.y+obj.size/2) {
      return true;
    }
  }
  if (mode == "corner") {
    if (mouseX >= obj.pos.x && mouseX <= obj.pos.x+obj.size && mouseY >= obj.pos.y && mouseY <= obj.pos.y+obj.size) {
      return true;
    }
  }
}

/**
 * @method button
 * @param {String} name // Name to be displayed on the button
 * @param {Number} x    // X position
 * @param {Number} y    // Y position
 * @param {Number} xs   // Width of the button
 * @param {Number} ys   // Height of the button
 * @param {Number} r    // The radius of the corners on the button
 * @return {p5}
 */
p5.prototype.tomteButton = function(name, x, y, xs, ys, r) {
  // This creates a new button with ability to be pressed
  name = name || "Button";
  r = r || 0;

  push();
  rectMode(CENTER);
  noStroke();
  fill(0, 0, 0, 100)
  rect(x+5, y+5, xs, ys, r);
  if (mouseOverRect(x, y, xs, ys, "center")) {
    fill(200); // Make button darker when mousedOver
  } else {
    fill(255);
  }
  stroke(0);
  if (mouseOverRect(x, y, xs, ys, "center")) {
    rect(x+2, y+2, xs, ys, r); // Move button when mousedOver
  } else {
    rect(x, y, xs, ys, r);
  }

  textAlign(CENTER, CENTER);
  textSize(xs/8+ys/8);
  fill(0);
  if (mouseOverRect(x, y, xs, ys, "center")) {
    text(name, x+2, y+2); // Move button if mousedOver
  } else {
    text(name, x, y);
  }
  pop();

  if (mouseOverRect(x, y, xs, ys, "center")) {
    return true;
  }
}

/**
 * @method clock
 * @param {Number} x      // X position
 * @param {Number} y      // Y position
 * @param {Number} size   // Text size
 * @param {Number} col    // The grayscale of the text
 * @param {Constant} font // Font for the text
 * @param {Boolean} date // Show date or not
 * @return {p5}
 */
p5.prototype.tomteClock = function(x, y, size, col, font, date) {
  // This creates a clock and date at give position
  size = size || 12;
  col = col || 0;
  font = font || 0;
  date = date || false;
  size = size || 12;
  if (size == 0) {
    size = 12;
  }
  push();
  let h = hour();
  let min = minute();
  let d = day();
  let m = month();
  let yr = year();
  fill(col);
  if (font != 0) {
    textFont(font);
  }
  textSize(size);
  textAlign(CENTER, CENTER);
  if (h < 10 && min < 10) {
    text("0" + h + ":" + "0" + min, x, y-25);
  } else if (h >= 10 && min < 10) {
    text(h + ":" + "0" + min, x, y-25);
  } else if (h < 10 && min >= 10) {
    text("0" + h + ":" + min, x, y-25);
  } else if (h >= 10 && min >= 10) {
    text(h + ":" + min, x, y-25);
  }
  if (date) {
    if (m < 10 && d < 10) {
      text(yr + "-" + "0" + m + "-" + "0" + d, x, y-8);
    } else if (m >= 10 && d < 10) {
      text(yr + "-" + m + "-" + "0" + d, x, y-8);
    } else if (m < 10 && d >= 10) {
      text(yr + "-" + "0" + m + "-" + d, x, y-8);
    } else if (m >= 10 && d >= 10) {
      text(yr + "-" + m + "-" + d, x, y-8);
    }
  }
  pop();
}

/**
 * @method error
 * @param {String} message  // Error message
 * @return {p5}
 */
p5.prototype.error = function(message) {
  console.error(message);
}

buttons = [];

p5.prototype.newButton = function(name) {
  var button = new Button(name);

  buttons.push(button);
  return button;
}

function Button(name) {
  this.x = 100;
  this.y = 100;
  this.xs = 100;
  this.ys = 50;
  this.r = 0;
  this.transX = 0;
  this.transY = 0;
  this.label = name || " ";
  this.mousedOver = false;
  this.visible = true;
  this.parent = null;

  this.update = function() {
    if (mouseOverRect(this.x+this.transX, this.y+this.transY, this.xs, this.ys, "center") && this.visible) {
      this.mousedOver = true;
    } else {
      this.mousedOver = false;
    }
    if (this.parent != null) {
      this.visible = this.parent.visible;
    }
  }

  this.show = function() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(0, 0, 0, 100)
    rect(this.x+5, this.y+5, this.xs, this.ys, this.r);
    if (this.mousedOver) {
      fill(200); // Make button darker when mousedOver
    } else {
      fill(255);
    }
    stroke(0);
    if (this.mousedOver) {
      rect(this.x+2, this.y+2, this.xs, this.ys, this.r); // Move button when mousedOver
    } else {
      rect(this.x, this.y, this.xs, this.ys, this.r);
    }

    textAlign(CENTER, CENTER);
    textSize(this.xs/8+this.ys/8);
    fill(0);
    if (this.mousedOver) {
      text(this.label, this.x+2, this.y+2); // Move button if mousedOver
    } else {
      text(this.label, this.x, this.y);
    }
    pop();
  }

  this.size = function(xs, ys) {
    this.xs = xs;
    this.ys = ys;
  }
  this.position = function(x, y) {
    this.x = x;
    this.y = y;
  }
  this.setLabel = function(name) {
    this.label = name;
  }
  this.radius = function(r) {
    this.r = r;
  }
  this.translate = function(x, y) {
    this.transX = x;
    this.transY = y;
  }
  this.setParent = function(obj) {
    this.visible = obj.visible;
    this.parent = obj;
  }
}

var windows = [];

p5.prototype.newWindow = function(name) {
  var window = new Window(name)

  windows.push(window);
  return window;
}

function Window(name) {
  this.x = 500;
  this.y = 250;
  this.xs = 500;
  this.ys = 350;
  this.label = name || "Window";
  this.visible = true;
  this.mousedOver = false;

  this.update = function() {
    if (mouseOverRect(this.x, this.y-this.ys/2+15, this.xs, 30, "center") && this.visible) {
      this.mousedOver = true;
    } else {
      this.mousedOver = false;
    }
  }

  this.show = function() {
    push();
    rectMode(CENTER);
    fill(150);
    rect(this.x, this.y, this.xs, this.ys);
    fill(255);
    rect(this.x, this.y-this.ys/2+15, this.xs, 30);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(0);
    text(this.label, this.x, this.y-this.ys/2+15);
    pop();
  }
  this.size = function(xs, ys) {
    this.xs = xs;
    this.ys = ys;
  }
  this.position = function(x, y) {
    this.x = x;
    this.y = y;
  }
  this.setLabel = function(name) {
    this.label = name;
  }
}

p5.prototype.tomteFPS = function() {
  push();
  textSize(12);
  if (frameRate() > 30) {
    fill(50, 255, 50);
  } else {
    fill(255, 50, 50);
  }
  text("FPS: " + floor(frameRate()), 10, 20);
  pop();
}
