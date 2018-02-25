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

    static deepClone(obj) {
        let cloned = {};
        if (typeof obj !== 'object') return null;
        for(let k in obj){
            if (obj.hasOwnProperty(k) && typeof obj[k] !== 'object') {
                cloned[k] = obj[k];
            } else if (obj[k].constructor.toString().indexOf("Object") > 0) {
                cloned[k] = this.deepClone(obj[k]);
            } else if (Array.isArray(obj[k])) {
                cloned[k] = obj[k].map((ele) => {
                    // let ret = null;
                    if (typeof ele !== 'object') return ele;
                    else return this.deepClone(ele);
                });
                // cloned[k] = [].concat(obj[k]);
            }
        }
        return cloned;
    }

    static isChanged(lastData, data) {
        if (JSON.stringify(lastData) == JSON.stringify(data))
            return false;
        else {
            console.warn('chartData changed..')
            return true;
        }
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

    /**
     * add img, video element to domContainer.
     * @param {*domEle} dom, dom container..
     * @param {*Array} res, urls of img/video loaded to dom. 
     */
    static setResource(dom, res) {
        if (!(res instanceof Array)) return;
        for (let i = 0; i < res.length; i ++) {
            let filetype = this.getFiletype(res[i]);
            if (filetype !== "") {
                let ele = document.createElement(filetype);
                ele.style.width = ele.style.height = dom.style.width = dom.style.height = '60px';
                ele.style.borderRadius = "50%";
                ele.src = res[i];
                dom.style.borderRadius = "50%";
                dom.appendChild(ele);
            } 
            if (filetype == 'video') {
                ele.setAttribute('autoplay', true);
            }
        }
    }

    static getFiletype(uri) {
        let isIMG = uri.match(/\.(jpg)|(png)|(gif)/g) ? true: false;
        let isMP4 = uri.match(/\.mp4\?+/g) ? true: false;
        if (isIMG) return 'img';
        else if (isMP4) return 'video';
        else {
            console.log(`filetype of ${uri} is not supported`);
            return '';
        }
    }

    static setChart(dom, data, type, height) {
        if (Chart == undefined) {
            console.warn(`Chart module ${Chart.toString()} not defined or data invalid: ${data.toString()}`);
            return;
        }
        let canv = document.createElement('canvas'),
            ctx = canv.getContext('2d');
        let piechart = new Chart(ctx, {
                type: type,
                data: data,
                options: {
                    legend: {
                        display: false
                    }
                }
            });
        canv.height = height; canv.style.height = canv.height + 'px';
        canv.width = height; canv.style.width = canv.width + 'px';
        dom.appendChild(canv);
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
            image.src = url;
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
