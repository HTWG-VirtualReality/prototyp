function Box(width, height, depth) {
  var geometry = new THREE.BoxGeometry(width, height, depth, 2, 2, 2);
  var material = new THREE.MeshPhongMaterial({color: 0x4E33D4});
  var mesh = new THREE.Mesh(geometry, material);

  var wireframe =  new THREE.BoxHelper(mesh.clone());
  wireframe.material.color.set(0xffffff);

  var boundary = new THREE.Box3().setFromObject(mesh);

  this.added = function(element) {
    element.add(mesh);
    element.add(wireframe);
  };

  this.getDimension = function() {
    return boundary.size();
  };

  this.getPosition = function() {
    return mesh.position;
  };

  this.setPosition = function(x, y, z) {
    mesh.position.set(x, y, z);
    wireframe.position.set(x, y, z);
  }
}