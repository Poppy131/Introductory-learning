/**
 * Created by apple on 2017/6/11.
 */
(function(Fly){

    function Land (config){

        this.img = config.img;
        this.ctx = config.ctx;
        this.x = config.x;
        this.y = config.y

        this.imgW = this.img.width;
        this.imgH = this.img.height;

        this.speed = 0.15;

    }

    Land.prototype = {
        constructor : Land,
        draw:function(delta){

            this.x -= this.speed * delta;

            if(this.x<=-this.imgW){
                this.x += this.imgW  *4
            }

            this.ctx.drawImage(this.img,0,0,this.imgW,this.imgH,this.x,this.y,this.imgW,this.imgH);
        }
    }

    Fly.Land = Land;
})(Fly)