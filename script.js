let toRads =  function(x){ return x* Math.PI/180;}; 
    
var Canvas = function(id){ 
  let el =document.getElementById(id);  
	var c = {
    tfrStack:[], 
    fill: false,
    setFillStyle:function(color) {this.ctx.fillStyle = color;},
    strokeWidth : function(width){this.ctx.lineWidth = width;},
    startShape: function(){this.ctx.beginPath();},
    endShape  : function(){this.ctx.closePath();},
    pushTransform: function(){
      
      this.tfrStack.push(this.ctx.getTransform());
      
    },
    popTransform: function(){
      let t = this.tfrStack;
      if(t){
        this.ctx.setTransform(t); 
      }else{
        console.error("no transform to pop!"); 
      }
    },
    width: el.offsetWidth,
    height:el.offsetHeight, 
		ctx: el.getContext("2d"),
		translate :function(x, y){this.ctx.translate(x, y);},
    rotate: function(x){this.ctx.rotate(x)}, 
    strokeColor: function(color){
      this.ctx.strokeStyle = color;  
    },
		rect:function(x,y,w,h){
			if(!this.fill){
        this.ctx.strokeRect(x,y,w,h);
		  }else{
        this.ctx.fillRect(x,y,w,h); 
      }
    },
		ellipse:function(){
      /* 
        x, y, radiusX, radiusY, rotation, startAngle, endAngle
      */
			var args = arguments;
			this.ctx.beginPath();
      if(args.length == 3){
        this.ctx.ellipse(args[0], args[1], args[2],  args[2], 0,0,2*Math.PI);
      }else 
			if( args.length == 9){
				this.ctx.ellipse(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
			}else if(args.length == 4 ){
				this.ctx.ellipse(args[0], args[1], args[2], args[3],0,0,360);
			}else{ 
			console.error("ellipse takes ether 3, 4 arguments or 9")
			}
			this.ctx.stroke();
		},
		arc:function(){
			/**ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);*/
			this.ctx.beginPath();
			if(arguments.length == 3){
				this.ctx.arc(arguments[0],arguments[1],arguments[2],0,2*Math.PI);
			}else if( arguments.length == 5){
				this.ctx.arc(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);	
			}else if(arguments.length == 6){
				this.ctx.arc(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],true);	
			}
			this.ctx.stroke();
		},
		setLineDash: function(lineDash){ 
			if(Array.isArray(arguments[0])){
				this.ctx.setLineDash(arguments[0]); 
			}else if(arguments.length == 1){
				this.ctx.setLineDash([arguments[0],0]);
			}else{
				this.ctx.setLineDash(arguments);
			}
		},
		line:function(x1,y1,x2,y2){
			this.ctx.moveTo(x1, y1);
			this.ctx.lineTo(x2, y2); 
			this.ctx.stroke();
		},
		triangle:function(x1,y1,x2,y2,x3,y3, color){
			let region = new Path2D(); 
      region.moveTo(x1, y1);
      region.lineTo(x2, y2);
      region.lineTo(x3, y3);
      
      region.closePath();

      if(this.fill){ 
       this.ctx.fill(region, 'evenodd');
      }else{
        this.ctx.stroke(region); 
      }
        
		}
	}	
	return  c;
}
let abs = Math.abs;
const PI = Math.PI; 
function calcAngle(opposite, adjacent) {
  return Math.atan(opposite / adjacent);
}
let drawArrow = function(x,y,r,d,m){
  
  m.pushTransform(); 
  m.translate(x,y); 
  m.rotate(d);
  m.line(0,0,+r,+r);
  m.line(0,0,-r,+r);
  m.popTransform();
  
}
let cancon = Canvas("main_canvas");
positsions = {
  0:{x: 10, y:10},
  1:{x: 20, y:10},
  2:{x: 10, y:20},
  3:{x: 20, y:20},
  4:{x: 15, y:30},
}
graph = {
0 :[0,0,0,0,1],
1 :[0,0,0,0,0],
2 :[0,0,0,0,0],
3 :[0,0,0,0,0],
4 :[0,1,0,0,0],
}
for(from = 0; from< 5; from++){
  for(to = 0; to< 5; to++){
    if(graph[from][to] == 1){
      let fx = positsions[from].x;
      let fy = positsions[from].y; 
      let tx = positsions[to].x;
      let ty = positsions[to].y; 
      let dy = ty-fy;
      let dx = tx-fx; 
      cancon.line(fx,fy,tx,ty);/**/
      let a = calcAngle(dy,dx);//-(71*(PI/180));
      //a = (2*PI) - a/2; 
      console.log({a:a*(180/PI)}); 
      drawArrow(tx,ty, 5, a,cancon)
    }
  }
}