int maxBalls = 50;
int ballIndex = 0;
float spring = 0.01;
float gravity = 0.01;
float friction = -0.9;
Ball[] balls = new Ball[maxBalls];

void setup() {
  size(640, 360);
  noStroke();
  fill(255, 204);
}

void createBall() {
  balls[ballIndex] = new Ball(100, random(width), random(height), random(30, 70), ballIndex, balls);
  ballIndex = (ballIndex + 1) % maxBalls;
}

void keyPressed() {
  createBall();
}

void draw() {
  background(0);
  for (int i = 0; i < maxBalls; i++) {
    if (balls[i] != null) {
      if (balls[i].age == 0)
        balls[i] = null;
      else {
        balls[i].collide();
        balls[i].move();
        balls[i].display();
      }
    }
  }
}

class Ball {

  float x, y;
  float diameter;
  float vx = 0;
  float vy = 0;
  int id;
  int age;
  int maxAge;
  int r;
  int g;
  int b;
  Ball[] others;

  Ball(int agein, float xin, float yin, float din, int idin, Ball[] oin) {
    age = agein;
    maxAge = agein;
    x = xin;
    y = yin;
    diameter = din;
    id = idin;
    others = oin;
    r = int(random(0,255));
    g = int(random(0,255));
    b = int(random(0,255));
  } 

  void collide() {
    for (int i = id + 1; i < maxBalls; i++) {
      if (others[i] != null) {
        float dx = others[i].x - x;
        float dy = others[i].y - y;
        float distance = sqrt(dx*dx + dy*dy);
        float minDist = others[i].diameter/2 + diameter/2;
        if (distance < minDist) { 
          float angle = atan2(dy, dx);
          float targetX = x + cos(angle) * minDist;
          float targetY = y + sin(angle) * minDist;
          float ax = (targetX - others[i].x) * spring;
          float ay = (targetY - others[i].y) * spring;
          vx -= ax;
          vy -= ay;
          others[i].vx += ax;
          others[i].vy += ay;
        }
      }
    }
  }

  void move() {
    vy += gravity;
    x += vx;
    y += vy;
    if (x + diameter/2 > width) {
      x = width - diameter/2;
      vx *= friction;
    }
    else if (x - diameter/2 < 0) {
      x = diameter/2;
      vx *= friction;
    }
    if (y + diameter/2 > height) {
      y = height - diameter/2;
      vy *= friction;
    } 
    else if (y - diameter/2 < 0) {
      y = diameter/2;
      vy *= friction;
    }
  }

  void display() {
    if (age == 0) {
      return;
    }
    age --;
    int alpha = int(((float) age / maxAge) * 255);
    fill(r, g, b, alpha);
    ellipse(x, y, diameter, diameter);
  }
}

