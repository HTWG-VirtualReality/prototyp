THREE.AxisControls = function (element) {

  var positionX = 0;
  var positionY = 0;
  var mouseX = 0;
  var mouseY = 0;
  var speed = 0.5;

  document.addEventListener('mousedown', onMouseDown);

  function onMouseDown(event) {
    event.preventDefault();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', resetMouse);
    document.addEventListener('mouseout', resetMouse);

    positionX = element.position.x;
    positionY = element.position.y;
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  function onMouseMove(event) {
    var moveX = event.clientX - mouseX;
    var moveY = mouseY - event.clientY;

    element.position.x = positionX + moveX * speed;
    element.position.y = positionY + moveY * speed;
  }

  function resetMouse() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', resetMouse);
    document.removeEventListener('mouseout', resetMouse);
  }
};

THREE.AxisControls.prototype = Object.create(THREE.EventDispatcher.prototype);