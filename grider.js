(function(global){
  var Grider = {
    VERSION: "0.0.1"
  };

  // Utilities

  function extend (destintation, source) {
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        destintation[key] = source[key];
      }
    }
    return destintation;
  };

  function copy(obj) {
    return extend({}, obj);
  };

  // Private Methods

  function triangle (base, height, x, y) {
    var points, transform;
    var triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    if (( x + 2 ) % 2 === 0) {
      points = base / 2 + ',' + 0 + ' ' + 0 + ',' + height + ' ' + base + ',' + height;
    } else {
      points = base / 2 + ',' + height + ' ' + base + ',' + 0 + ' ' + 0 + ',' + 0;
    }

    if (( y + 2 ) % 2 === 0) {
      transform = 'translate(' + ((x * (base / 2)) - (base / 2)) +', ' + y * height + ')';
    } else {
      transform = 'translate(' + ((x * (base / 2)) - (base)) +', ' + y * height + ')';
    }

    triangle.setAttribute('points', points);
    triangle.setAttribute('transform', transform);
    triangle.style.fill = 'black';

    return triangle;
  }
  
  // Public Methods

  function drawGrid (width, height, columns) {
    var element;
    var base = width / columns;
    var triHeight = base / 2;
    var rows = parseInt(height / triHeight);
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'viewBox',  '0 0 ' + width + ' ' + height);
    svg.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMin slice');

    for (var y = 0; y < rows + 1; ++y) {
      for (var x = 0; x < columns * 2 + 2; ++x) {
        element = triangle(base, triHeight, x, y);
      
        svg.appendChild(element);
      }
    }
    return svg;
  }

  // Initialize

  function _init_ () {
    return extend(Grider, {
      drawGrid: drawGrid
    });
  };

  if (global.Grider) {
    throw new Error('Grider has already been defined');
  } else {
    global.Grider = _init_();
  };
})(typeof window === 'undefined' ? this : window);
