require('./rect');
require('./text');

scene.Component.prototype.toZplForLine = function(bounds, lineColor, borderThickness, orientation) {
  var {
    left,
    top,
    width,
    height
  } = bounds;

  var commands = [
    ['^FO'+left, top],
    ['^GD' + width, height, borderThickness, lineColor, orientation],
    ['^FS']
  ];

  return commands.map(command => {
    return command.join(',')
  }).join('\n') + '\n\n';
};

scene.Line.prototype.toZpl = function() {
  var bounds = this.labelingBounds;
  var zpl;

  if(bounds.width == 0 || bounds.height == 0) {
    zpl = this.toZplForRect(
      bounds,
      this.lineColor,
      this.borderThickness,
      0
    );
  } else {

    var {
      x1,
      x2,
      y1,
      y2
    } = this.model;

    var p1 = this.transcoordS2T(x1, y1);
    var p2 = this.transcoordS2T(x2, y2);

    var orientation;

    if(p1.x <= p2.x && p1.y <= p2.y)
      orientation = 'L';
    else if(p1.x >= p2.x && p1.y >= p2.y)
      orientation = 'L';
    else if(p1.x >= p2.x && p1.y <= p2.y)
      orientation = 'R';
    else if(p1.x <= p2.x && p1.y >= p2.y)
      orientation = 'R';

    zpl = this.toZplForLine(bounds, this.lineColor, this.borderThickness, orientation);
  }

  // build text command
  if(this.text)
    zpl += this.toZplForText();

  console.log(zpl);
  return zpl;
}

exports.Line = scene.Line;

