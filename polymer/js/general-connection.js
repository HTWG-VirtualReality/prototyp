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

    var start = {};
    if(toPos.x < fromPos.x) {
        start = {py: height1, ps: -10, pd: (this._isToGreater(toPos, fromPos) ? -1 : 1)} // end
    } else {
        start = {py: height1, ps: 10, pd: (this._isToGreater(toPos, fromPos) ? -1 : 1)} // start
    }

    return {
        l1: this._createPoint(0, yStart),
        l2: this._createPoint(0, yEnd),
        py: start.py,
        ps: start.ps,
        pd: start.pd
    };
};

GeneralConnection.prototype._horizontalCalculation = function(fromObj, toObj, fromPos, toPos) {
    var widthLeft = (toPos.x > fromPos.x) ? fromObj.width/2 : toObj.width/2;
    var widthRight = (toPos.x < fromPos.x) ? fromObj.width/2 : toObj.width/2;
    var rightX = this._absoluteSubtraction(fromPos.x, toPos.x) - widthRight;

    var width1 = (toPos.x > fromPos.x) ? fromObj.width/2 : rightX;
    var width2 = (toPos.x > fromPos.x) ? width1 + 10 : width1 - 10;
    var start = {};
    if(toPos.x < fromPos.x) {
        start = {py: width1, ps: -10, pd: (this._isToGreater(toPos, fromPos) ? -1 : 1)} // end
    } else {
        start = {py: width1, ps: 10, pd: (this._isToGreater(toPos, fromPos) ? -1 : 1)} // start
    }

    return {
        l1: this._createPoint(0, widthLeft),
        l2: this._createPoint(0, rightX ),
        py: start.py,
        ps: start.ps,
        pd: start.pd,
        angle: -1.5708 // 90 degrees
    };
};

GeneralConnection.prototype._diagonalCalculation = function(fromObj, toObj, fromPos, toPos) {
    var a = this._absoluteSubtraction(fromPos.x, toPos.x);
    var b = this._absoluteSubtraction(fromPos.y - fromObj.height/2, toPos.y - toObj.height/2);
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    var alpha = Math.atan(a/b);

    var fromAlpha = Math.atan(fromObj.width / fromObj.height); // right order? => I think so
    var toAlpha = Math.atan(toObj.width / toObj.height);

    var fromC, toC;
    if(alpha < fromAlpha) {
        fromC = (fromObj.height / 2) / Math.cos(alpha);
    } else {
        fromC = (fromObj.width / 2) / Math.sin(alpha);
    }

    if(alpha < toAlpha) {
      toC = (toObj.height / 2) / Math.cos(alpha);
    } else {
      toC = (toObj.width / 2) / Math.sin(alpha);
    }

    var yStart, yEnd;
    if(fromPos.x < toPos.x) {
      yStart = fromC;
      yEnd = c - toC;
    } else {
      yStart = toC;
      yEnd = c - fromC;
    }


    // // create points for polyline
    var line = {
        l1: this._createPoint(0, toIsGreater() ? yStart : -yStart),
        l2: this._createPoint(0, toIsGreater() ? yEnd : -yEnd)
    };

    // checks on which side the arrow should be printed.
    var start = {};
    if(toPos.x < fromPos.x) {
        start = {py: yEnd, ps: -10, pd: (toIsGreater() ? 1 : -1)} // end
    } else {
        start = {py: yStart, ps: 10, pd: (toIsGreater() ? 1 : -1)} // start
    }

    // combine line and startplacing points
    for(var attri in start) { line[attri] = start[attri] }

    // Add angle
    line.angle = toIsGreater() ? -alpha : alpha;
    return line;

    function pythagorasTheorem(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

    function calculateDiagonalPoints(alpha, height1, height2) {
        var h = (fromPos.x < toPos.x) ? height1 : height2;
        return {
            h: h,
            d: (a < b) ? Math.tan(alpha) * h : h / Math.sin(alpha)
        };
    }

    function toIsGreater() {
        return (toPos.x > fromPos.x) ? toPos.y > fromPos.y : toPos.y < fromPos.y;
    }
}

GeneralConnection.prototype._createPoint = function(x, y) {
    return { x: x, y: y };
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
