/**
 * https://github.com/wearefractal/captchagen
 *
 * (MIT License)
 * Copyright (c) 2012 Fractal contact@wearefractal.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function (window, document) {
     var Captchagen = function(options) {

        // stock middleware
        var drawBackground = function(canvas, opt) {
            var ctx = canvas.getContext('2d');

            var colors = getColors(2);

            var gradient = ctx.createLinearGradient(0, 0, opt.width, 0);
            gradient.addColorStop(0, colors[0].css);
            gradient.addColorStop(1, colors[1].css);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, opt.width, opt.height);
            return canvas;
        };

        var drawLines = function(canvas, opt) {
            var ctx = canvas.getContext('2d');
            var colors = getColors(randomBetween(1, 4));

            colors.forEach(function(color) {
                ctx.beginPath();
                ctx.moveTo(randomBetween(0, opt.width), randomBetween(0, opt.height));
                ctx.bezierCurveTo(randomBetween(0, opt.height), randomBetween(0, opt.height), randomBetween(0, opt.width), randomBetween(0, opt.height), randomBetween(0, opt.width), randomBetween(0, opt.height));

                ctx.fillStyle = ctx.strokeStyle = color.css;
                ctx.lineWidth = randomBetween(2, 5);
                return ctx.stroke();
            });
            return canvas;
        };

        var drawText = function(canvas, opt) {
            var ctx = canvas.getContext('2d');

            var colors = getColors(opt.text.length);

            var x = 3;

            opt.text.split('').forEach(function(letter, idx) {
                var color = colors[idx];

                // set font
                var size = getFontSize(opt.height, opt.width, opt.font);
                ctx.font = '' + size + 'px ' + opt.font;
                ctx.textBaseline = 'top';
                var te = ctx.measureText(letter);
                var y = Math.floor(((Math.random() * opt.height - size) / 100) + size / 3);

                // set color
                ctx.fillStyle = color.css;

                // set font rotation
                var rot = getFontRotation();
                ctx.rotate(rot);

                // draw text
                ctx.fillText(letter, x, y);

                // unset rotation for next letter
                ctx.rotate(-rot);

                // space the x-axis for the next letter
                x += te.width+1;
            });
            return canvas;
        };

        // utils
        var generateText = function() {
            return (((1 + Math.random()) * 0x10000000) | 0).toString(32);
        };

        var randomColor = function() {
            return randomBetween(0, 255);
        };

        var getColors = function(count) {
            var colors = [];
            for (var i = 0; i < count; i++) {
                var color = {
                    r: randomColor(),
                    g: randomColor(),
                    b: randomColor()
                };
                color.css = 'rgb('+color.r+','+color.g+','+color.b+')';
                colors.push(color);
            }
            return colors;
        };

        var getFontRotation = function() {
            return (Math.random() * -0.4) + 0.2;
        };

        var getFontSize = function(height, width, font) {
            var max = height * 0.50; // max is 50% of height
            var min = height * 0.40; // min is 40% of height
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var randomBetween = function (from, to) {
            return Math.floor(Math.random()*(to-from))+from;
        };

        // defaults
        this.options = options || {};
        if (!this.options.width) this.options.width = 300;
        if (!this.options.height) this.options.height = 150;
        if (!this.options.text) this.options.text = generateText();
        if (!this.options.font) this.options.font = 'sans';

        this._middleware = [];
        // add middle stack
        this.use(drawBackground);
        this.use(drawLines);
        this.use(drawText);
        this.use(drawLines);
        // util global
        this.generateText = generateText;
    };

    Captchagen.prototype = {
        use: function(fn) {
            this._middleware.push(fn);
        }
       ,reset: function() {
            this.canvas = document.getElementById('canvas');
            this.canvas.setAttribute('width', this.options.width);
            this.canvas.setAttribute('height', this.options.height);

            this.canvas.getContext('2d').clearRect(0,0, this.options.width, this.options.height);
        }
       ,generate: function() {
            this.reset();
            var self = this;
            this._middleware.forEach(function(fn){
                fn(self.canvas, self.options);
            });
        }
       ,refresh: function(string){
            if(typeof string == "string"){
                this.options.text = string;
            } else {
                this.options.text = this.generateText();
            }
            this.generate();
        }
       ,text: function() {
            return this.options.text;
        }
       ,font: function() {
            return this.options.font;
        }
       ,height: function() {
            return this.options.height;
        }
       ,width: function() {
            return this.options.width;
        }
       ,uri: function() {
            return this.canvas.toDataURL.apply(this.canvas, arguments);
        }
       ,buffer: function() {
            return this.canvas.toBuffer.apply(this.canvas, arguments);
        }
       ,stream: function(type) {
            if (!type) type = 'png';
            type = type.toLowerCase();

            if (type === 'png') {
                return this.canvas.createPNGStream();
            } else if (type === 'jpeg') {
                return this.canvas.createJPEGStream();
            } else {
                throw new Error('Invalid stream type');
            }
        }
    };

    window.Captchagen = Captchagen || {};

}(window, document));