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
    } else if (this._isHorizontal(fromObj.height, toObj.height, fromPos, toPos)) {
        points = this._horizontalCalculation(fromObj, toObj, fromPos, toPos);
    } else {
        points = this._diagonalCalculation(fromObj, toObj, fromPos, toPos);
    }

    points.coord = this._createPoint(fromPos.x, fromPos.y - fromObj.height/2);
    return points;
};

GeneralConnection.prototype._verticalCalculation = function(fromObj, toObj, fromPos, toPos) {
    var yEnd = this._absoluteSubtraction(fromPos.y, toPos.y) - (toObj.height/2);

    return {
        lines: [this._createPoint(0, fromObj.height/2), this._createPoint(0, yEnd)],
        distance: yEnd - (fromObj.height/2),
        angle: (fromPos.y > toPos.y) ? 3.1416 : 0 // 180 degrees
    };
};

GeneralConnection.prototype._horizontalCalculation = function(fromObj, toObj, fromPos, toPos) {
    var rightX = this._absoluteSubtraction(fromPos.x, toPos.x) - toObj.width/2;

    return {
        lines: [this._createPoint(0, fromObj.width/2), this._createPoint(0, rightX)],
        distance: rightX - fromObj.width/2,
        angle: (fromPos.x < toPos.x) ? -1.5708 : 1.5708 // 90 degrees
    };
};

GeneralConnection.prototype._diagonalCalculation = function(fromObj, toObj, fromPos, toPos) {
    var a = this._absoluteSubtraction(fromPos.x, toPos.x);
    var b = this._absoluteSubtraction(fromPos.y - fromObj.height/2, toPos.y - toObj.height/2);
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    var alpha = Math.atan(a/b);

    var fromC = calculateSmallC(Math.atan(fromObj.width / fromObj.height), fromObj);
    var toC = calculateSmallC(Math.atan(toObj.width / toObj.height), toObj);

    var line = {lines: []};
    line.lines.push(this._createPoint(0, fromC));
    line.lines.push(this._createPoint(0, c - toC));
    line.distance = this._absoluteSubtraction(line.lines[0].y, line.lines[1].y);
    line.angle = getAngle();
    return line;


    function calculateSmallC(beta, obj) {
        if(alpha < beta) {
            return (obj.height / 2) / Math.cos(alpha);
        } else {
            return (obj.width / 2) / Math.sin(alpha);
        }
    }

    function getAngle() {
        var fromPosY = fromPos.y - fromObj.height/2;
        var toPosY = toPos.y - toObj.height/2;
        if(fromPos.x < toPos.x && fromPosY < toPosY) {
            return -alpha;
        } else if(fromPos.x < toPos.x && fromPosY > toPosY) {
            return calculateAngle(alpha, 180);
        } else if (fromPos.x > toPos.x && fromPosY < toPosY) {
            return alpha;
        } else {
            return calculateAngle(-alpha, 180);
        }
    }

    function calculateAngle(alpha, angle) {
        var deg = alpha * (180/Math.PI);
        return ((deg + angle) % 360) * (Math.PI/180);
    }

    function pythagorasTheorem(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }
}

GeneralConnection.prototype._createPoint = function(x, y) {
    return { x: x, y: y };
}

GeneralConnection.prototype._absoluteSubtraction = function(num1, num2) {
    return Math.abs(num1-num2);
};

GeneralConnection.prototype._isVertical = function(fromPos, toPos) {
    return fromPos.x == toPos.x;
}

GeneralConnection.prototype._isHorizontal = function(fromHeight, toHeight, fromPos, toPos) {
    return (fromPos.y - fromHeight/2) == (toPos.y - toHeight/2);
}
