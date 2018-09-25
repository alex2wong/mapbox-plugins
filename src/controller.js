import Drone from './drone';
// import { deprecate } from 'core-decorators';
import { CanvasOverlayer} from './layers/canvasOverlay';

const interval = 25;
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
        // bind key event with drone..
        drone.u=drone.r=drone.d=drone.l=0;onkeydown=(e)=>t(e,1);onkeyup=(e)=>t(e);
        let t=(e,v,l,i)=>{
            for(i in l={u:[38,90,87],r:[39,68],d:[40,83],l:[37,65,81]})
            if(l[i].includes(e.keyCode))
            drone[i]=v
        }
        setInterval(()=>{
            if (drone.u) drone.accelerate();
            if (drone.d) drone.brake();
            if (drone.r) drone.turnRight();
            if (drone.l) drone.turnLeft();
        }, interval);
        console.log("gameControl register success.");
    }

    /**
     * pickupObj control, need to bind with canvasOverlay, to fetch the objs drawn
     * each moveEnd, rebuild the pixList depend on objs in viewport!
     * pixList's index is vital for pickUp performance.
     */
    static pickupControl(canvasOverlay) {
        if (canvasOverlay instanceof CanvasOverlayer) {
            // establish pixList storing objs' location. canvasOverlay.source.lon, lat
            let pix = canvasOverlay.lnglat2pix(canvasOverlay.source[0].lon,
                canvasOverlay.source[1].lat);
        }
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
    static dashBoard(drone, ele) {
        if ((drone instanceof Drone) !== true ) {
            console.error("dashBoard must bind with a drone instance.");
            return;
        }
        try {
            setInterval( function(){
                ele.innerHTML = drone.name + "<br> coords: " +
                     drone.lon.toFixed(1) + ", " +
		             drone.lat.toFixed(1) + "<br>" +
                     'speed: ' + drone.speed + "<br>" +
                     'direction: ' + (drone.direction%(360)).toFixed(1)
            }, 200);

        } catch(e) {
            console.error(e);
        }        
        console.log("dashBoard register success.");
    }

    /** create refreshable features list.  */
    static featureList(containerId) {
        if (containerId == undefined || typeof containerId !== "string") {
            console.warn("invalid containerId..");
            return null;
        }
        // var miniRefresh = new MiniRefresh({
        //     container: '#' + containerId,
        //     down: {
        //         callback: function() {
        //             // 下拉事件
        //             console.log("list dragged ..");
        //         }
        //     },
        //     up: {

        //         callback: function() {
        //             // 上拉事件
        //         }
        //     }
        // });
        // return miniRefresh;
    }
}
