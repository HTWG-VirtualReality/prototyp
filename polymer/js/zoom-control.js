THREE.ZoomControl = function (element, dom) {
  dom.addEventListener('wheel', onWheel);

  var speed = 5;

  function onWheel(e) {
    element.position.setZ(element.position.z + e.deltaY * speed);
  }
};

THREE.ZoomControl.prototype = Object.create(THREE.EventDispatcher.prototype);