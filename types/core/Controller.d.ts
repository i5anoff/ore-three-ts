import * as THREE from 'three';
import { Cursor } from './Cursor';
import * as ORE from '../scene/BaseScene';
export declare interface ControllerParam extends THREE.WebGLRendererParameters {
    retina?: boolean;
    silent?: boolean;
}
export declare interface GlobalProperties {
    renderer: THREE.WebGLRenderer;
    cursor: Cursor;
}
export declare class Controller {
    currentScene: ORE.BaseScene;
    renderer: THREE.WebGLRenderer;
    cursor: Cursor;
    clock: THREE.Clock;
    gProps: GlobalProperties;
    constructor(parameter: ControllerParam);
    private tick;
    bindScene(scene: ORE.BaseScene): void;
    unbindScene(): void;
    private onWindowResize;
    private onOrientationDevice;
    onTouchStart(e: MouseEvent): void;
    onTouchMove(e: MouseEvent): void;
    onTouchEnd(e: MouseEvent): void;
    onHover(): void;
    onWheel(e: WheelEvent): void;
}
