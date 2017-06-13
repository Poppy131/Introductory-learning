/**
 * Created by apple on 2017/6/11.
 */
(function(Fly){

    function Sky(config){

        this.img = config.img;
        this.ctx = config.ctx;
        this.x = config.x;
        this.y =0;

        this.imgW = this.img.width;
        this.imgH = this.img.height;

        this.speed = 0.15;


    }

    Sky.prototype = {
        constructor:Sky,

        draw:function(delta){

            this.x -= this.speed *delta;

            if(this.x <= -this.imgW){
                this.x += this.imgW*2;
            }

            this.ctx.drawImage(this.img,0,0,this.imgW,this.imgH,this.x,this.y,this.imgW,this.imgH);
        }
    }

    Fly.Sky = Sky;
})(Fly)