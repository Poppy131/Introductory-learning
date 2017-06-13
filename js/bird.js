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
            //������ײ�� Ҫȥ֪ͨ������
            if(this.y<0||this.y>488 || this.ctx.isPointInPath(this.x,this.y)){
                //this.isStart = false;
                //������Ϣ�ö�����ִ���������
                //������Ϸ������ ����һ��game���󴴽���һϵ�ж���
                //��ô��С������ײ��ʱ��Ҫ�������ӵ���
                //����Ϸ������  ��Ӷ��� һ��С�񷢲���Ϣ ִ�д���  ����isStart=false
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