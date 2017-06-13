/**
 * Created by apple on 2017/6/11.
 */
(function(Fly){

    function Bird(config){
        this.img  =  config.img;
        this.ctx = config.ctx;

        this.imgW = this.img.width/3;
        this.imgH = this.img.height;

        this.frame = 0;
        this.x = 100;
        this.y = 100;
        this.a = 0.0005;
        this.speed = 0;
        this.maxSpeed = 0.3;
        this.maxAngle =45;
        this.curAngle=0;
    }

    Bird.prototype = {
        constructor:Bird,

        draw:function(delta){

            this.speed += this.a*delta;
            this.y += this.speed*delta + 1/2*this.a*Math.pow(delta,2);

            this.curAngle = this.speed/this.maxSpeed*this.maxAngle;

            if(this.speed < -this.maxSpeed){
                this.curAngle = -this.maxAngle;
            }else if(this.speed > this.maxSpeed){
                this.curAngle = this.maxAngle;
            }
            
            this.ctx.translate(this.x,this.y);
            this.ctx.rotate(Fly.toRadian(this.curAngle));

            this.ctx.drawImage(this.img,this.imgW*this.frame++,0,this.imgW,this.imgH,-1/2*this.imgW,-1/2*this.imgH,this.imgW,this.imgH);
            this.frame %= 3;

            this.isDie();
        },

        isDie :function(){
            //发生碰撞了 要去通知订阅者
            if(this.y<0||this.y>488 || this.ctx.isPointInPath(this.x,this.y)){
                //this.isStart = false;
                //发布消息让订阅者执行自身代码
                //整个游戏世界中 还有一个game对象创建了一系列对象
                //那么当小鸟发生碰撞的时候要让他们子调用
                //在游戏对象中  添加订阅 一旦小鸟发布消息 执行代码  就是isStart=false
                this.Listener.forEach(function(fn){
                    fn();
                })
            }

        },

        Listener : [],
        addListener:function(fn){
            this.Listener.push(fn);
        }
    }

    Fly.Bird = Bird;

})(Fly)