/**
 * Created by apple on 2017/6/11.
 */
(function(Fly) {

    function Pipe(config) {
        this.imgTop = config.imgTop;
        this.imgBottom = config.imgBottom;
        this.ctx = config.ctx;
        this.x = config.x;

        this.imgW = this.imgTop.width;
        this.imgH = this.imgTop.height;
        this.space = 200;

        this.topY = 0;
        this.bottomY = 0;
        this.speed = 0.15;

        this.randomY();
    }

    Pipe.prototype = {

        constructor: Pipe,
        draw: function(delta) {

            this.x -= this.speed * delta;

            if (this.x < -this.imgW * 3) {
                this.x += this.imgW * 3 * 6;
                this.randomY();
            }
            //
            this.ctx.rect(this.x, this.topY, this.imgW, this.imgH)
            this.ctx.rect(this.x, this.bottomY, this.imgW, this.imgH)

            //this.ctx.fill();

            this.ctx.drawImage(this.imgTop, 0, 0, this.imgW, this.imgH, this.x, this.topY, this.imgW, this.imgH)
            this.ctx.drawImage(this.imgBottom, 0, 0, this.imgW, this.imgH, this.x, this.bottomY, this.imgW, this.imgH)
        },

        //���Y����
        randomY: function() {
            var num = Math.random() * 200 + 50;

            this.topY = num + this.space;
            this.bottomY = num - this.imgH;
        }
    }


    Fly.Pipe = Pipe;
})(Fly)