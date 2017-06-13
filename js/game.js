/**
 * Created by apple on 2017/6/12.
 */
(function(Fly){

    function Game (config){
     this.ctx = config.ctx;
     this.imgSrc = config.imgSrc;
        this.lastTime = new Date();
        this.delta = 0 ;
        this.curTime = null;
        this.isStart = true;
        this.roles = [];

    }


    Game.prototype = {
        constructor : Game,
        start:function(){
            var that = this;
            Fly.loadImages(that.imgSrc,function(imgList){
                that.initRoles(imgList);
                that.render(imgList);
                that.bindEvent();
            })

        },
        //创建对象
        initRoles:function(imgList){
            var that = this;
            //        小鸟对象
            this.bird = Fly.factory("Bird",{
                img:imgList.birds,
                ctx:this.ctx
            });

            this.bird.addListener(function(){
                    that.isStart = false;
                })


//        两个天空对象
            for(var i = 0;i<2;i++){
                var sky = Fly.factory("Sky",{
                    img:imgList.sky,
                    ctx:this.ctx,
                    x: i*imgList.sky.width,
                })

                this.roles.push(sky);
            }

//        六组管道对象
            for(var i = 0;i < 6;i++){
                var pipe = Fly.factory("Pipe",{
                    imgTop:imgList.pipe1,
                    imgBottom:imgList.pipe2,
                    ctx:this.ctx,
                    x:300+i*imgList.pipe1.width*3
                })
                this.roles.push(pipe);
            }


//        四个陆地对象
            for(var i= 0 ;i<4;i++){
                var land = Fly.factory("Land",{
                    img:imgList.land,
                    ctx:this.ctx,
                    x: i * imgList.land.width,
                    y:imgList.sky.height - imgList.land.height
                })
                this.roles.push(land);
            }

        },

        render:function(imgList){
            var that =this;
            (function render(){

                that.curTime = new Date();
                delta  =  that.curTime -  that.lastTime;
                that.lastTime =  that.curTime;
                that.ctx.save();
                that.ctx.clearRect(0,0,that.ctx.canvas.width,that.ctx.canvas.height);
                that.ctx.beginPath();
                that.roles.forEach(function(value){
                    value.draw(delta);
                })


                that.bird.draw(delta);


                //if(that.bird.y<0||that.bird.y>imgList.sky.height -imgList.land.height || that.ctx.isPointInPath(that.bird.x,that.bird.y)){
                //    that.isStart = false;
                //}

                that.ctx.restore();

                if (that.isStart) {
                    requestAnimationFrame(render);
                }

            })();

        },

        bindEvent:function(){
            var that = this;
            cv.addEventListener("click",function(){
                that.bird.speed = -0.3;
            })
        }
    }

    var  instance ;

    Fly.getGame = function(config){
        if(instance == null){
            instance = new Game(config);
        }
        return instance;

    }
    //Fly.Game = Game;
})(Fly)