class Orientation {
  constructor (f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
    this.f0 = f0 // right orientation, offset moving hexagons right within their render window
    this.f1 = f1 // left orientation, offset moving hexagons left within their render window
    this.f2 = f2 // south orientation offset, so moving the hexagons down
    this.f3 = f3 // north orientation offset, so moving the hexagons up
    this.b0 = b0
    this.b1 = b1
    this.b2 = b2
    this.b3 = b3
    this.startAngle = startAngle // start angle is the angle of the hexagons, .5 is point facing north, 1 is a flat part at the top
  }
}

export default Orientation
