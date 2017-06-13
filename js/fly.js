/**
 * Created by apple on 2017/6/11.
 */
(function(w){
    //整个游戏世界唯一的对象 不用创建了 直接
    var Fly = {

    }

    Fly.loadImages = function(imgSrc,callback){
        var count = 0,
            length = imgSrc.length,
            imgList = {};
        imgSrc.forEach(function(value){
            var img  = new Image();
            img.src = "./img/"+value+".png";
            img.onload=function(){
                count++;

                imgList[value] = img;
                if(count >= length){
                    callback(imgList);
                }
            }
        })
            
    }

    Fly.toRadian = function(angle){
        return angle * Math.PI / 180;
    }


    Fly.factory = function(type,config){
        switch (type){
            case "Bird":
                return new Fly.Bird(config);
            case "Sky":
                return new Fly.Sky(config);
            case "Land":
                return new Fly.Land(config);
            case "Pipe":
                return new Fly.Pipe(config);
        }
    }


    w.Fly = Fly;
})(window)