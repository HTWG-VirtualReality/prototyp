(function (THREE, window, document) {
  var container = document.createElement( 'div' );
	document.body.appendChild( container );

  var renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 40, 40, 200 );
  scene.add( camera );
  var light = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( light );

  var group = new THREE.Group();
  group.rotation.x = Math.PI * 0.1;
	scene.add( group );

  function createSquare(width, height) {
	  var squareShape = new THREE.Shape();
	  squareShape.moveTo( 0,0 );
	  squareShape.lineTo( 0, width );
	  squareShape.lineTo( height, width );
	  squareShape.lineTo( height, 0 );
	  squareShape.lineTo( 0, 0 );
    return squareShape;
  }
  function createText(text, font) {
    return new THREE.TextGeometry( text, {
		  font: font,
      weight: 'regular',
		  size: 6,
		  height: 4,
		  curveSegments: 0,
		  material: 0,
		  extrudeMaterial: 1
	  });
  }
  function addShape( shape, amount, color, x, y, z, rx, ry, rz, s ) { 
    var extrudeSettings = { amount: amount, bevelEnabled: true, bevelSegments: 2, bevelSize: 1, bevelThickness: 1 }; 
    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	  var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
	  mesh.position.set( x, y, z );
	  mesh.rotation.set( rx, ry, rz );
	  mesh.scale.set( s, s, s );
	  group.add( mesh );
  }

  function addText(text, color, x, y, z, rx, ry, rz, s ) {
    var material = new THREE.MeshPhongMaterial( { color: color } );
    var mesh = new THREE.Mesh( text, material);
	  mesh.position.set( x, y, z );
	  mesh.rotation.set( rx, ry, rz );
	  mesh.scale.set( s, s, s );
	  group.add( mesh );
  }
  
  addShape( createSquare(94, 80), 10, 0x4E33D4,  0, 0, 0, 0, 0, 0, 1);
  addShape( createSquare(20, 90), 2, 0xFFAF22,  -5, 30, -5, Math.PI * 0.5, 0, 0, 1);
  addShape( createSquare(20, 90), 2, 0xFFAF22,  -5, 80, -5, Math.PI * 0.5, 0, 0, 1);

  var loader = new THREE.FontLoader();
  loader.load( 'helvetiker_regular.typeface.js', function ( font ) {
    addText( createText('User', font), 0xffffff, 30, 85, 10, 0, 0, 0, 1);
    addText( createText('-name : string', font), 0xffffff, 3, 68, 10, 0, 0, 0, 1);
    addText( createText('-password : string', font), 0xffffff, 3, 58, 10, 0, 0, 0, 1);
    addText( createText('-lastLogin : datetime', font), 0xffffff, 3, 48, 10, 0, 0, 0, 1);
    addText( createText('-loginStatus : string', font), 0xffffff, 3, 38, 10, 0, 0, 0, 1);
    addText( createText('+verifyLogin() : bool', font), 0xffffff, 3, 16, 10, 0, 0, 0, 1);
    addText( createText('+logout() : bool', font), 0xffffff, 3, 6, 10, 0, 0, 0, 1);
  });

  var targetRotation = 0;
	var targetRotationOnMouseDown = 0;
	var mouseX = 0;
	var mouseXOnMouseDown = 0;
  var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

  function render() {
    requestAnimationFrame( render );
    group.rotation.y = ( targetRotation - group.rotation.y ) * 0.40;
    renderer.render( scene, camera );
  }
  render();

  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  function onDocumentMouseDown( event ) {
		event.preventDefault();

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener( 'mouseout', onDocumentMouseOut, false );

		mouseXOnMouseDown = event.clientX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
  }
  function onDocumentMouseMove( event ) {
		mouseX = event.clientX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
	}

  function onDocumentMouseUp( event ) {
	  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
  }

  function onDocumentMouseOut( event ) {
	  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
  }

}(THREE, window, document));
