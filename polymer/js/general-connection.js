function GeneralConnection(fromObj, toObj) {
    this.fromObj = fromObj;
    this.toObj = toObj;
}

GeneralConnection.prototype.render = function() {
    var fromObj = this.fromObj;
    var toObj = this.toObj;
    var fromPos = fromObj.obj.position;
    var toPos = toObj.obj.position;

    var points = {};
    if(this._isVertical(fromPos, toPos)) {
        points = this._verticalCalculation(fromObj, toObj, fromPos, toPos);
    } else if (this._isHorizontal(fromPos, toPos)) {
        points = this._horizontalCalculation(fromObj, toObj, fromPos, toPos);
    } else {
        points = this._diagonalCalculation(fromObj, toObj, fromPos, toPos);
    }

    // startpoint
    points.start = this._createPoint((toPos.x < fromPos.x) ? toPos.x : fromPos.x,
        (toPos.x < fromPos.x) ? toPos.y - toObj.height/2 : fromPos.y - fromObj.height/2);

    return points;
};

GeneralConnection.prototype._verticalCalculation = function(fromObj, toObj, fromPos, toPos) {
    var y = this._absoluteSubtraction(fromPos.y, toPos.y);
    var yStart =  this._isToGreater(toPos, fromPos) ? -(fromObj.height/2) : fromObj.height/2;
    var yEnd = this._isToGreater(toPos, fromPos) ? -(y-toObj.height/2) : y - toObj.height/2;

    // start placing
    var height1 = this._isToGreater(toPos, fromPos) ? -(fromObj.height/2) : (fromObj.height/2);
    var height2 = this._isToGreater(toPos, fromPos) ? height1 - 10 : height1 + 10;

    return {
        l1: this._createPoint(0, yStart),
        l2: this._createPoint(0, yEnd),
        p1: this._createPoint(10, height2),
        p2: this._createPoint(0, height1),
        p3: this._createPoint(-10, height2)
    };
};

GeneralConnection.prototype._horizontalCalculation = function(fromObj, toObj, fromPos, toPos) {
    var widthLeft = (toPos.x > fromPos.x) ? fromObj.width/2 : toObj.width/2;
    var widthRight = (toPos.x < fromPos.x) ? fromObj.width/2 : toObj.width/2;
    var rightX = this._absoluteSubtraction(fromPos.x, toPos.x);

    var width1 = (toPos.x > fromPos.x) ? fromObj.width/2 : this._absoluteSubtraction(fromPos.x, toPos.x) - fromObj.width/2;
    var width2 = (toPos.x > fromPos.x) ? width1 + 10 : width1 - 10;
    return {
        l1: this._createPoint(widthLeft, 0),
        l2: this._createPoint(rightX , 0),
        p1: this._createPoint(width2, 10),
        p2: this._createPoint(width1, 0),
        p3: this._createPoint(width2, -10)
    };
};

GeneralConnection.prototype._diagonalCalculation = function(fromObj, toObj, fromPos, toPos) {
    // For better understanding see the picture
    // vr-connection-calculation-base.png in /docs
    // cathetes of the big tirangle
    var a = this._absoluteSubtraction(fromPos.x, toPos.x);
    var b = this._absoluteSubtraction(fromPos.y - fromObj.height/2, toPos.y - toObj.height/2);

    // Hypotenuse of the big triangle
    var c = pythagorasTheorem(a, b);

    // b <) c
    var alpha = Math.atan((a / b));

    // smallTriangle is the red triangle in the picture
    // calculateDiagonalPoints calculates the cathetes(d, h) of the small triangles
    // remember the center of the leftmost element is the startpoint
    var smallTriangleStart, smallTriangleEnd;

    if(a < b) {
      smallTriangleStart = calculateDiagonalPoints(alpha, fromObj.height/2, toObj.height/2);
      smallTriangleEnd = calculateDiagonalPoints(alpha, toObj.height/2, fromObj.height/2);
    } else {
      smallTriangleStart = calculateDiagonalPoints2(alpha, fromObj.width/2, toObj.width/2);
      smallTriangleEnd = calculateDiagonalPoints2(alpha, toObj.width/2, fromObj.width/2);
    }
    var yStart = pythagorasTheorem(smallTriangleStart.h, smallTriangleStart.d);
    var yEnd = this._absoluteSubtraction(c, pythagorasTheorem(smallTriangleEnd.h, smallTriangleEnd.d));

    // create points for polyline
    var line = {
        l1: this._createPoint(0, toIsGreater() ? yStart : -yStart),
        l2: this._createPoint(0, toIsGreater() ? yEnd : -yEnd)
    };

    // checks on which side the arrow should be printed.
    var start = {};
    if(toPos.x < fromPos.x) {
        start = createDiagonalPolygonPoint(0, yEnd, -10, this); // end
    } else {
        start = createDiagonalPolygonPoint(0, yStart, 10, this); // start
    }

    // combine line and startplacing points
    for(var attr in start) { line[attr] = start[attr] }

    // Add angle
    line.angle = toIsGreater() ? -alpha : alpha;

    console.log(a)
    console.log(b)
    console.log(alpha)
    console.log(line);

    // console.log(toPos)

    return line;

    function createDiagonalPolygonPoint(x, y, summand, context) {
        return {
            p1: context._createPoint(x - 10, (y + summand) * (toIsGreater() ? 1 : -1)),
            p2: context._createPoint(x, toIsGreater() ? y : -y),
            p3: context._createPoint(x + 10, (y + summand) * (toIsGreater() ? 1 : -1))
        };
    }

    function pythagorasTheorem(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

    function calculateDiagonalPoints(alpha, height1, height2) {
        var h = (fromPos.x < toPos.x) ? height1 : height2;
        return {
            h: h,
            d: Math.tan(alpha) * h
        };
    }

    function calculateDiagonalPoints2(alpha, height1, height2) {
        var h = (fromPos.x < toPos.x) ? height1 : height2;
        return {
            h: h,
            d: (h / Math.sin(alpha))
        };
    }

    function toIsGreater() {
        return (toPos.x > fromPos.x) ? toPos.y > fromPos.y : toPos.y < fromPos.y;
    }
}

GeneralConnection.prototype._createPoint = function(x, y) {
    return {
        x: x,
        y: y
    };
}

GeneralConnection.prototype._isToGreater = function(toPos, fromPos) {
    return (toPos.x > fromPos.x) ? toPos.y > fromPos.y : toPos.y < fromPos.y;
};

GeneralConnection.prototype._absoluteSubtraction = function(num1, num2) {
    return Math.abs(num1-num2);
};

GeneralConnection.prototype._isVertical = function(fromPos, toPos) {
    return fromPos.x == toPos.x;
}

GeneralConnection.prototype._isHorizontal = function(fromPos, toPos) {
    return fromPos.y == toPos.y; // TODO: change condition a little bit
}
