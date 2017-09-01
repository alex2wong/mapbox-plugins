import Drone from './drone';
import { deprecate } from 'core-decorators';

export default class controllers {
    /**
     * GameController bind with a drone instance.. 
     * After start this controller, use WSAD to move drone.
     */
    static gameControl(drone) {
        if ((drone instanceof Drone) !== true ) {
            console.error("gameControl must bind with a drone instance.");
            return;
        }
        document.body.addEventListener('keydown', function(e) {
            if (e.which === 37||e.which === 65) {
                drone.turnLeft();
            }
            if (e.which === 39||e.which === 68) {
                drone.turnRight();
            }
            if (e.which === 38 ||e.which === 87) { // faster
                drone.accelerate();
            }
            if (e.which === 40||e.which === 83) { // slower
                drone.brake();
            }
            if (e.which === 32) {
                drone.fire();
            }
        });
        console.log("gameControl register success.");
    }

    /**
     * Calculate bullets location based on drones.
     */
    static bulletCalculator(drones) {
        if (Array.isArray(drones)) {
            for(let i = 0;i < drones.length; i ++) {
                let curDrone = drone[i];
                let curBullets = curDrone.bullets;
                // Calculate bullets coords
                if (curDrone.firing && curBullets) {

                } else {
                    
                }
            }
        }
    }

    
    /**
     * Add AI robots shooting at player..
     * @input num: number. how many robots to create. 
     */
    static addRobots(num) {
        let robot = new Drone({});
        return robot;
    }


    /**
     * Dashboard bind with a drone instance and div element... 
     * After start this controller, use WSAD to move drone.
     */
    // @deprecate
    static dashBoard(drone, ele) {
        if ((drone instanceof Drone) !== true ) {
            console.error("dashBoard must bind with a drone instance.");
            return;
        }
        try {
            setInterval( function(){
                ele.innerHTML = drone.name + "<br> coords: " +
                     drone.point.coordinates[0].toFixed(1) + ", " +
		             drone.point.coordinates[1].toFixed(1) + "<br>" +
                     'speed: ' + drone.speed + "<br>" +
                     'direction: ' + ((drone.direction%(Math.PI*2))*180/Math.PI).toFixed(1)
            }, 200);

        } catch(e) {
            console.error(e);
        }        
        console.log("dashBoard register success.");
    }
}
