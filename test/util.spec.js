import Util from '../src/util';
// import Chart from 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.js';

describe('util.js', function(){
    it('objects changed,', function() {
        const originData = { data: [1, 2] };
        const nextTickData = { data: [1, 3] };
        expect(Util.isChanged(originData, nextTickData)).toBe(true);
    })

    it('deepCloned obejcts be the same', () => {
        const originData = { data: [1, 2] };
        expect(Util.isChanged(Util.deepClone(originData), originData)).toBe(false);
    })

    it('getJSON service works', () => {
        const jsonURL = '../assets/countries.geojson';
        Util.getJSON(jsonURL)
        .then((json) => {
            console.log(`json data len: ${json.length}`);
            expect(JSON.parse(json)).toBe(undefined);
        });
    })

    it('set Icon image', () => {
        const iconContainer = document.createElement('div');
        Util.setIconDiv(iconContainer, 'airfield-15');
        expect(iconContainer.querySelector('img') instanceof HTMLImageElement).toBe(true);
    })

    it('get file type from URI', () => {
        expect(Util.getFiletype('../assets/drone.png')).toBe('img');
    })

    it('set resource to domContainer', () => {
        const domContainer = document.createElement('div');
        Util.setResource(domContainer, ['../assets/drone.png']);
        expect(domContainer.querySelector('img') instanceof HTMLImageElement).toBe(true);
    })

    // it('set chart to domContainer', () => {
    //     const chartContainer = document.createElement('div');
    //     Util.setChart(chartContainer, { labels: ['type1', 'type2'], data: [22, 43] }, 'bar', 100);
    //     expect(chartContainer.querySelector('canvas') instanceof HTMLCanvasElement).toBe(true);
    // })

    it('random points and circle', () => {
        const data = Util.rdObjs(1, [121, 30]);
        expect(data[data.length - 1].name).not.toBe('');
    })

})
