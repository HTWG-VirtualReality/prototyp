function Box(width, height, depth) {
  var geometry = new THREE.BoxGeometry(width, height, depth, 2, 2, 2);

  var material = new THREE.MeshPhongMaterial({color: 0x4E33D4});
  var mesh = new THREE.Mesh(geometry, material);

  var wireframe =  new THREE.BoxHelper(mesh.clone());
  wireframe.material.color.set(0xffffff);

  var group = new THREE.Group();
  group.add(mesh);
  group.add(wireframe);

  var boundary = new THREE.Box3().setFromObject(group);

  this.added = function(element) {
    element.add(group);
  };

  this.getDimension = function() {
    return boundary.size();
  };

  this.getPosition = function() {
    return group.position;
  };

  this.setPosition = function(x, y, z) {
    group.position.set(x, y, z);
  };

  this.add = function(element) {
    element.added(group);
    return this;
  }
}