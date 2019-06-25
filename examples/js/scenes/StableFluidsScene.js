import * as ORE from '../../../src/';
import * as THREE from 'three';

import frag from './glsl/stableFluidsView.fs';

export default class StableFluidScene extends ORE.BaseScene {

	constructor( renderer ) {

		super( renderer );

		this.name = "StableFluidsScene";
		
		this.init();

		this.onResize( this.width, this.height );

	}

	init() {
		
		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		//create stable fluids
		this.fluid = new ORE.StableFluids( this.renderer, new THREE.Vector2( 512, 512 ) );
		this.fluid.parameter.pointerSize = 0.5;
		
		//create element
		this.dom = document.createElement('div');
		this.dom.classList.add('dom-glsl');
		document.body.insertBefore(this.dom,document.querySelector('#canvas'));

		//create domGLSL
		this.param = {
			dom: this.dom,
			fragmentShader: frag,
			uniforms: {
				time: { value: 0 },
				texture: { value: null },
			}
		};

		this.domglsl = new ORE.DomGLSL( this.param );

		this.scene.add( this.domglsl );

	}

	animate() {

		//update fluid
		let vec = new THREE.Vector2( this.cursor.hoverDelta.x, -this.cursor.hoverDelta.y );
		let pos = this.cursor.getRelativePosition( this.dom, true, true);

		if( pos ){			

			pos.y = 1 - pos.y;
			
			this.fluid.setPointer( pos, vec );

		}else{

			this.fluid.setPointer( new THREE.Vector2(0,0), vec );
			
		}

		this.fluid.update();

		//update dom size and position
		this.domglsl.updateDom();

		//update uniform
		this.param.uniforms.time.value = this.time;
		this.param.uniforms.texture.value = this.fluid.getTexture();

		this.cursor.update();
		this.renderer.render( this.scene, this.camera );

	}

	onResize( width, height ) {

		super.onResize( width, height );

		this.fluid.parameter.screenAspect = 1.0;

	}

	onTouchStart( e ) {}

	onTouchMove( e ) {}

	onTouchEnd( e ) {}

	onWheel( e ) {}

}
