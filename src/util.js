import Const from './const';

export default class util {

    static getAnimationFrame() {
        
    }

    /**
     * use promise to implement xmlHttpRequest process
     * promise.then receive 2 params.(resolve func, reject func)
     */
    // static xhr(){
    //     // promise will excute immediately after init.
    //     let promise = new Promise(() => {

    //     })
    // }

    /**
     * Promise.prototype.then()
     * receive resolve callback and reject callback.
     * SO important, if series of Async Process is required, 
     * Promise is better than callback hell !
     * 
     * xhr().then(data => { // resolve actions.. }, 
     *          err => { // reject actions.. }
     *      ).then()
     * 
     */

    /**
     * return promise obj.
     */
    static getJSON(url, resolve, reject) {
        let promise = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onreadystatechange = handler;
            xhr.responseType = "json";
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send();

            function handler() {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status === 200) {
                    // if server response success
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            };
        })

        return promise;
    }

    /**
     * return iconposition style by iconName
     */
    static setIconDiv(dom, iconName) {        
        let icons = Const.Sprites;
        if (iconName && icons[iconName]) {
            let iconStyle = icons[iconName],
                iconDiv = document.createElement("div");
            iconDiv.style.width = iconStyle.width + "px";
            iconDiv.style.height = iconStyle.height + "px";
            iconDiv.style.overflow = 'hidden';
            let iconImg = document.createElement("img");
            iconImg.src = Const.SpritesUrl + ".png";
            iconImg.style.marginLeft = "-" + iconStyle.x + "px";
            iconImg.style.marginTop = "-" + iconStyle.y + "px";
            iconDiv.appendChild(iconImg);
            dom.appendChild(iconDiv);
        }
    }

    // random point objs with given number
    static rdObjs(num, mapCenter) {
        var objs = [], index = 0;
        if (!mapCenter) return objs;
        for(var i=0;i<num;i++) {
            objs.push({
                name: "line" + i.toString(),
                lon: parseInt(((Math.random()*8)+mapCenter[0]-4).toFixed(2)),
                lat: parseInt(((Math.random()*4)+mapCenter[1]-2).toFixed(2)),
                color: 'rgba(10,200,'+ (Math.random()*251).toFixed(0) +',0.7)',
            });
        }
        objs.push({
            name: "circle1",
                lon: mapCenter[0],
                lat: mapCenter[1],
                radius: parseInt(Math.random()*10),
                color: 'rgba(251,200,20,0.6)',
        });
        return objs;
    }

    /**
     * getJSON("somedata.json").then((data) => {
     *      console.log("got data: " + data);
     * })
     * .catch((err) => {
     *      console.error("encounter error..");
     * })
     */

    /**
     * compared with traditional imageload. what is the advantage ?
     */
    static loadImageAsync(url, resolve, reject) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = path;
        })
    }

    /**
     * This decorator func.
     */
    static readonly(target, name, descriptor) {
        descriptor.writable = false;
        return descriptor;
    }

    /**
     * target.descriptor..
     * this decorator used for log before calling target function.
     */
    static log(target, name, descriptor) {
        let oldValue = descriptor.value;

        descriptor.value = function() {
            console.log(`Calling "${name}" with`, arguments);
            // descriptor.value refer to the target itself.. func or attri
            return oldValue.apply(null, arguments);
        }
    }

    /**
     * @param fn {Function}
     * @param delay {Number}
     * @return {Function}
     */
    static debounce(fn, delay) {
        let timer;
        // timer is closure in mem.. returned function is the listener..
        return function() {
            var context = this;
            var args = arguments;
            // clear the previous timer to prevent the function call.
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, delay);
        }
    }
    
}
