function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
var app = new Vue({
    el: '#app',
    data: {
        successValue: 1.25,
        lastSuccessValue: 0,
        lastNum: 0,
        user: "Rouzy",
        score: Cookies.get('score'),
        minValue: 799999,
        maxValue: 200000,
        chance: 80,
        sum: 1,
        success: false,
        fail: false,
        money: false,
        oneruble: false,
        lastGames: [
            {},{},{},{},{},{},{},{},{},{},{},{},{},{}
        ]
    },
    watch: {
        chance: function() {
            this.successValue = (this.sum * 100 / this.chance).toFixed(2);
            this.minValue = this.chance != "" ? (this.chance * 10000 - 1).toFixed(0) : 0;
            this.maxValue = this.chance != "" ? (999999 - (this.chance * 10000 - 1)).toFixed(0) : 999999;
            this.chance > 95 ? this.chance = 95 : true;
            if(this.chance.length != 0) {
                let arr = this.chance.split('.');
                if(arr[1] != undefined) {
                    if(arr[1].length > 2) {
                        console.log(arr[0]+'.'+arr[1].substr(0,2));
                        this.chance = arr[0]+'.'+arr[1].substr(0,2);
                    }
                }
            }
        },
        sum: function() {
            this.successValue = (this.sum * 100 / this.chance).toFixed(2);
            this.sum > 1000000 ? this.sum = 1000000 : true;
            if(this.sum.length != 0) {
                let arr = this.sum.split('.');
                if(arr[1] != undefined) {
                    if(arr[1].length > 2) {
                        console.log(arr[0]+'.'+arr[1].substr(0,2));
                        this.sum = arr[0]+'.'+arr[1].substr(0,2);
                    }
                }
            }
        }
    },
    methods: {
        playSmaller: function() {
            this.oneruble = false;
            this.money = false;
            this.fail = false;
            this.success = false;
            if(this.sum <= this.score ) {
                if(this.sum >= 1) {
                    var num = getRandomArbitrary(0, 1000000).toFixed(0);
                    this.score -= this.sum;
                    if(num <= Number(this.minValue)) {
                        this.score += Number(this.successValue);
                        this.score = (this.score).toFixed(2);
                        od.update(this.score);
                        od2.update(this.score);
                        Cookies.set('score', this.score, { expires: 7 });
                        this.success = true;
                        this.lastSuccessValue = this.successValue;
                        this.lastGames.unshift({
                            user: this.user,
                            sum: this.sum,
                            coef: "x"+(this.successValue / this.sum).toFixed(2),
                            result: this.lastSuccessValue,
                            color: "#3bbc73",
                            show: true
                        });
                        this.lastGames.pop();
                    } else {
                        this.fail = true;
                        this.lastNum = num;
                        this.lastGames.unshift({
                            user: this.user,
                            sum: this.sum,
                            coef: "x"+(this.successValue / this.sum).toFixed(2),
                            result: 0,
                            color: "#000",
                            show: true
                        });
                        this.lastGames.pop();
                        od.update(this.score);
                        od2.update(this.score);
                        Cookies.set('score', this.score, { expires: 7 });
                    }
                } else {
                    this.oneruble = true;
                }
            } else {
                this.money = true;
            }
        },
        playBigger: function() {
            this.oneruble = false;
            this.money = false;
            this.fail = false;
            this.success = false;
            if(this.sum <= this.score) {
                if(this.sum >= 1) {
                    var num = getRandomArbitrary(0, 1000000).toFixed(0);
                    this.score -= this.sum;
                    if(num >= Number(this.maxValue)) {
                        this.score += Number(this.successValue);
                        this.score = (this.score).toFixed(2);
                        od.update(this.score);
                        od2.update(this.score);
                        Cookies.set('score', this.score, { expires: 7 });
                        this.success = true;
                        this.lastSuccessValue = this.successValue;
                        this.lastGames.unshift({
                            user: this.user,
                            sum: this.sum,
                            coef: "x"+(this.successValue / this.sum).toFixed(2),
                            result: this.lastSuccessValue,
                            color: "#3bbc73",
                            show: true
                        });
                        this.lastGames.pop();
                    } else {
                        this.fail = true;
                        this.lastNum = num;
                        this.lastGames.unshift({
                            user: this.user,
                            sum: this.sum,
                            coef: "x"+(this.successValue / this.sum).toFixed(2),
                            result: 0,
                            color: "#000",
                            show: true
                        });
                        this.lastGames.pop();
                        od.update(this.score);
                        od2.update(this.score);
                        Cookies.set('score', this.score, { expires: 7 });
                    }
                } else {
                    this.oneruble = true;
                }
            } else {
                this.money = true;
            }
        },
        update: function(num) {
            this.score = Number(num) + Number(this.score);
            od.update(this.score);
            od2.update(this.score);
            Cookies.set('score', this.score, { expires: 7 });
        }
    }
});
window.OdometerOptions = {
    duration: 1000
}
od = new Odometer({
    el: document.querySelectorAll('.odometer')[0],
    value: app.score
});
od2 = new Odometer({
    el: document.querySelectorAll('.odometer')[1],
    value: app.score
});