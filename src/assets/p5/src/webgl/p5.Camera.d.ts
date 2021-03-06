// This file was auto-generated. Please do not edit it.

import * as p5 from '../../index';

declare module '../../index' {
    class Camera {
        /**
         *   Sets a perspective projection. Accepts the same
         *   parameters as the global perspective(). More
         *   information on this function can be found there.
         */
        perspective(): void;

        /**
         *   Sets an orthographic projection. Accepts the same
         *   parameters as the global ortho(). More information
         *   on this function can be found there.
         */
        ortho(): void;

        /**
         *   Sets the camera's frustum. Accepts the same
         *   parameters as the global frustum(). More
         *   information on this function can be found there.
         */
        frustum(): void;

        /**
         *   Panning rotates the camera view to the left and
         *   right.
         *   @param angle amount to rotate camera in current
         *   angleMode units. Greater than 0 values rotate
         *   counterclockwise (to the left).
         */
        pan(angle: number): void;

        /**
         *   Tilting rotates the camera view up and down.
         *   @param angle amount to rotate camera in current
         *   angleMode units. Greater than 0 values rotate
         *   counterclockwise (to the left).
         */
        tilt(angle: number): void;

        /**
         *   Reorients the camera to look at a position in
         *   world space.
         *   @param x x position of a point in world space
         *   @param y y position of a point in world space
         *   @param z z position of a point in world space
         */
        lookAt(x: number, y: number, z: number): void;

        /**
         *   Sets the camera's position and orientation.
         *   Accepts the same parameters as the global
         *   camera(). More information on this function can be
         *   found there.
         */
        camera(): void;

        /**
         *   Move camera along its local axes while maintaining
         *   current camera orientation.
         *   @param x amount to move along camera's left-right
         *   axis
         *   @param y amount to move along camera's up-down
         *   axis
         *   @param z amount to move along camera's
         *   forward-backward axis
         */
        move(x: number, y: number, z: number): void;

        /**
         *   Set camera position in world-space while
         *   maintaining current camera orientation.
         *   @param x x position of a point in world space
         *   @param y y position of a point in world space
         *   @param z z position of a point in world space
         */
        setPosition(x: number, y: number, z: number): void;

        /**
         *   camera position value on x axis
         */
        eyeX: number;

        /**
         *   camera position value on y axis
         */
        eyeY: number;

        /**
         *   camera position value on z axis
         */
        eyeZ: number;

        /**
         *   x coordinate representing center of the sketch
         */
        centerX: number;

        /**
         *   y coordinate representing center of the sketch
         */
        centerY: number;

        /**
         *   z coordinate representing center of the sketch
         */
        centerZ: number;

        /**
         *   x component of direction 'up' from camera
         */
        upX: number;

        /**
         *   y component of direction 'up' from camera
         */
        upY: number;

        /**
         *   z component of direction 'up' from camera
         */
        upZ: number;
    }
    interface p5InstanceExtensions {
        /**
         *   Sets the camera position for a 3D sketch.
         *   Parameters for this function define the position
         *   for the camera, the center of the sketch (where
         *   the camera is pointing), and an up direction (the
         *   orientation of the camera). This function
         *   simulates the movements of the camera, allowing
         *   objects to be viewed from various angles.
         *   Remember, it does not move the objects themselves
         *   but the camera instead. For example when centerX
         *   value is positive, the camera is rotating to the
         *   right side of the sketch, so the object would seem
         *   like moving to the left.
         *
         *   See this example to view the position of your
         *   camera.
         *
         *   When called with no arguments, this function
         *   creates a default camera equivalent to camera(0,
         *   0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0,
         *   0, 1, 0);
         *   @param [x] camera position value on x axis
         *   @param [y] camera position value on y axis
         *   @param [z] camera position value on z axis
         *   @param [centerX] x coordinate representing center
         *   of the sketch
         *   @param [centerY] y coordinate representing center
         *   of the sketch
         *   @param [centerZ] z coordinate representing center
         *   of the sketch
         *   @param [upX] x component of direction 'up' from
         *   camera
         *   @param [upY] y component of direction 'up' from
         *   camera
         *   @param [upZ] z component of direction 'up' from
         *   camera
         *   @chainable
         */
        camera(
            x?: number,
            y?: number,
            z?: number,
            centerX?: number,
            centerY?: number,
            centerZ?: number,
            upX?: number,
            upY?: number,
            upZ?: number
        ): p5;

        /**
         *   Sets a perspective projection for the camera in a
         *   3D sketch. This projection represents depth
         *   through foreshortening: objects that are close to
         *   the camera appear their actual size while those
         *   that are further away from the camera appear
         *   smaller. The parameters to this function define
         *   the viewing frustum (the truncated pyramid within
         *   which objects are seen by the camera) through
         *   vertical field of view, aspect ratio (usually
         *   width/height), and near and far clipping planes.
         *   When called with no arguments, the defaults
         *   provided are equivalent to perspective(PI/3.0,
         *   width/height, eyeZ/10.0, eyeZ10.0), where eyeZ is
         *   equal to ((height/2.0) / tan(PI60.0/360.0));
         *   @param [fovy] camera frustum vertical field of
         *   view, from bottom to top of view, in angleMode
         *   units
         *   @param [aspect] camera frustum aspect ratio
         *   @param [near] frustum near plane length
         *   @param [far] frustum far plane length
         *   @chainable
         */
        perspective(fovy?: number, aspect?: number, near?: number, far?: number): p5;

        /**
         *   Sets an orthographic projection for the camera in
         *   a 3D sketch and defines a box-shaped viewing
         *   frustum within which objects are seen. In this
         *   projection, all objects with the same dimension
         *   appear the same size, regardless of whether they
         *   are near or far from the camera. The parameters to
         *   this function specify the viewing frustum where
         *   left and right are the minimum and maximum x
         *   values, top and bottom are the minimum and maximum
         *   y values, and near and far are the minimum and
         *   maximum z values. If no parameters are given, the
         *   default is used: ortho(-width/2, width/2,
         *   -height/2, height/2).
         *   @param [left] camera frustum left plane
         *   @param [right] camera frustum right plane
         *   @param [bottom] camera frustum bottom plane
         *   @param [top] camera frustum top plane
         *   @param [near] camera frustum near plane
         *   @param [far] camera frustum far plane
         *   @chainable
         */
        ortho(left?: number, right?: number, bottom?: number, top?: number, near?: number, far?: number): p5;

        /**
         *   Sets a perspective matrix as defined by the
         *   parameters. A frustum is a geometric form: a
         *   pyramid with its top cut off. With the viewer's
         *   eye at the imaginary top of the pyramid, the six
         *   planes of the frustum act as clipping planes when
         *   rendering a 3D view. Thus, any form inside the
         *   clipping planes is visible; anything outside those
         *   planes is not visible.
         *
         *   Setting the frustum changes the perspective of the
         *   scene being rendered. This can be achieved more
         *   simply in many cases by using perspective().
         *   @param [left] camera frustum left plane
         *   @param [right] camera frustum right plane
         *   @param [bottom] camera frustum bottom plane
         *   @param [top] camera frustum top plane
         *   @param [near] camera frustum near plane
         *   @param [far] camera frustum far plane
         *   @chainable
         */
        frustum(left?: number, right?: number, bottom?: number, top?: number, near?: number, far?: number): p5;

        /**
         *   Creates a new p5.Camera object and tells the
         *   renderer to use that camera. Returns the p5.Camera
         *   object.
         *   @return The newly created camera object.
         */
        createCamera(): Camera;

        /**
         *   Sets rendererGL's current camera to a p5.Camera
         *   object. Allows switching between multiple cameras.
         *   @param cam p5.Camera object
         */
        setCamera(cam: Camera): void;
    }
}
