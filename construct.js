
  var Body = function(world,details) { 
    this.details = details ;
    this.definition = new b2BodyDef();
    this.definition.position = new b2Vec2(details.x , details.y );
    this.definition.linearVelocity = new b2Vec2(details.vx || 0, details.vy || 0);
   this.definition.userData = this;
    this.definition.type = details.type == "static" ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
    this.body = world.CreateBody(this.definition);
    fixtureDef = new b2FixtureDef();
    fixtureDef.density= 1 || details.density,
    fixtureDef.friction= 0.2,
    fixtureDef.restitution= 0.2;
	fixtureDef.isSensor = details.sensor;	
	fixtureDef.filter.groupIndex = details.filter;
    switch(details.shape) {
      case "circle":
        fixtureDef.shape = new b2CircleShape(details.radius);
        break;
      case "polygon":
        fixtureDef.shape = new b2PolygonShape();  
		fixtureDef.shape.SetAsArray(details.points,details.points.length);
        break;     
      case "block":     
        fixtureDef.shape = new b2PolygonShape();
        fixtureDef.shape.SetAsBox(details.width/2, details.height/2);
        break;
    }
    this.body.CreateFixture(fixtureDef); 
  };


	
	var Droid = function(world) {
        this.bodyDef = new b2BodyDef();
        this.bodyDef.type = b2Body.b2_dynamicBody;
        this.bodyDef.fixedRotation = true; // Prevent any rotation
       // this.bodyDef.userData = "Droid";
	this.bodyDef.allowSleep = false;
        this.bodyDef.position.Set(41, 8); 
        this.body = world.CreateBody(this.bodyDef);        
        // BODY FIXTURE 
        fixDef = new b2FixtureDef();
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsOrientedBox((35 / 2 / scale), (70 / 2 / scale), new b2Vec2(0,-20/2/scale));
        fixDef.density = 1.0;
        fixDef.friction = 0.6;
        fixDef.restitution = 0.2;
	fixDef.filter.groupIndex = -3;
       this.body.CreateFixture(fixDef);        
        // FOOT FIXTURE 
        fixDef.shape = new b2CircleShape(35/2/scale);
        fixDef.shape.SetLocalPosition(new b2Vec2(0, 50/2/scale));
        fixDef.density = 1.0 || details.density;
        fixDef.friction = 0.8;
        fixDef.restitution = 0.3;
	fixDef.filter.groupIndex = -3;
        this.body.CreateFixture(fixDef);              
        // FOOT SENSOR
      //  fixDef.userData = "Foot";
        fixDef.shape = new b2PolygonShape;
	fixDef.filter.groupIndex = -3;
        fixDef.shape.SetAsOrientedBox((10 / 2 / scale), (10 / 2 / scale), new b2Vec2(0,(85 / 2 / scale)));
        fixDef.isSensor = true;
        this.body.CreateFixture(fixDef);		
	}
	

	
	
function RigidBody(world, data) {

        var fixDef  = new b2FixtureDef();
        fixDef.density = data.density != null ? data.density : 1.0;
        fixDef.friction = data.friction != null ? data.friction : 0.5;
        fixDef.restitution = data.restitution != null ? data.restitution : 0.2;
        var bodyDef = new b2BodyDef();

        bodyDef.type = data.type != null ? data.type : b2Body.b2_dynamicBody;
        this.width = data.width;
        this.height = data.height;
        this.halfWidth = data.width * 0.5;
        this.halfHeight = data.height * 0.5;
        var halfWidth  = this.halfWidth / this.meterPerPixel;
        var halfHeight = this.halfHeight / this.meterPerPixel;
  if (data.shapeType === "BOX") {
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(halfWidth, halfHeight);
  }
  else if (data.shapeType === "CIRCLE") {
    fixDef.shape = new b2CircleShape();
    fixDef.shape.SetRadius(data.radius);
  }
        var x = (data.x != null ? data.x : this.halfWidth) / this.meterPerPixel;
        var y = (data.y != null ? data.y : this.halfHeight) / this.meterPerPixel;
        bodyDef.position.x = x;
        bodyDef.position.y = y;

        if (data.el != null) {
            this.el = data.el;
        }
        else {
            this.el = document.createElement('div');
        }
        this.el.className += ' rigidbody';
  if (data.shapeType === "BOX") {
    this.el.style.width  = this.width  + 'px';
    this.el.style.height = this.height + 'px';
  }
  else if (data.shapeType === "CIRCLE") {
    this.el.style.height = this.el.style.width = (data.radius * 2 * this.meterPerPixel) + 'px';
    this.el.style.borderRadius = '50%';
  }
	fixDef.filter.groupIndex = 2;
        this.body = world.CreateBody(bodyDef);
        this.body.CreateFixture(fixDef);
    }
    RigidBody.prototype = {
        constructor: RigidBody,
        meterPerPixel: 20,
        update: function () {
            var x = this.body.GetPosition().x *20 - this.halfWidth;
            var y = this.body.GetPosition().y *20 - this.halfHeight;
            var r = this.body.GetAngle() * 180 / Math.PI;
            x = Math.abs(x) < 0.00000000001 ? 0 : x;
            y = Math.abs(y) < 0.00000000001 ? 0 : y;
            r = Math.abs(r) < 0.00000000001 ? 0 : r;
            this.el.style.webkitTransform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + r + 'deg)';
        }
    };

			
			
			
			
			
			

	//PARTICLE BOOM2	
var particles = {},
          particleIndex = 0,
 settings = { density: 8, particleSize: 3, startingX: -10, startingY: 300, gravity: 0, bounceLevel: 300 };
      function Particle() {
        this.x = (boom2.GetPosition().x *20)  ; this.y = (boom2.GetPosition().y *20 ) -100 ; this.vx = Math.random() * 10 - 5; this.vy = Math.random() * 10 - 5; 
        if (Math.random() > 0.98) { this.vy *= 3; }
        particleIndex ++; particles[particleIndex] = this; this.id = particleIndex; this.life = 0; this.maxLife = Math.random() * 8;
      }
      Particle.prototype.draw = function() {
        this.x += this.vx; this.y += this.vy;
        if (this.y > settings.bounceLevel) { this.vy *= -0.6; this.vx *= 0.5; this.y = settings.bounceLevel; }
        this.vy += settings.gravity; this.life++;
        if (this.life >= this.maxLife) { delete particles[this.id]; }
        context.fillStyle = "rgba(255,215,0, 0.8)";
        context.fillRect(this.x, this.y  , settings.particleSize, settings.particleSize);
      }

//STARS MOVE FADE IN SKY     
function Circle() {
	this.s = {ttl:8000, xmax:5, ymax:2, rmax:10, rt:1, xdef:60, ydef:450, xdrift:4, ydrift: 4, random:true, blink:true};

	this.reset = function() {
		this.x = 1600;
		this.y = -100;
		this.r = ((this.s.rmax-1)*Math.random()) + 1;
		this.dx = (Math.random()*this.s.xmax) * (Math.random() < .5 ? -1 : 1);
		this.dy = (Math.random()*this.s.ymax) * (Math.random() < .5 ? -1 : 1);
		this.hl = (this.s.ttl/rint)*(this.r/this.s.rmax);
		this.rt = Math.random()*this.hl;
		this.s.rt = Math.random()+1;
		this.stop = Math.random()*.2+.4;
		this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
		this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
	}

	this.fade = function() { this.rt += this.s.rt;}

	this.draw = function() {
	context = canvas.getContext('2d');
		if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt*-1;
		else if(this.rt >= this.hl) this.reset();
		var newo = 1-(this.rt/this.hl);
		context.beginPath();
		context.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		context.closePath();
		var cr = this.r*newo;
		g = context.createRadialGradient(this.x,this.y,0,this.x,this.y,(cr <= 0 ? 1 : cr));
		g.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
		g.addColorStop(this.stop, 'rgba(77,101,181,'+(newo*.6)+')');
		g.addColorStop(1.0, 'rgba(77,101,181,0)');//red
		context.fillStyle = g;
		context.fill();
	}

	this.move = function() {
		this.x += (this.rt/this.hl)*this.dx;
		this.y += (this.rt/this.hl)*this.dy;
		if(this.x > 2600 || this.x < 900) this.dx *= -1;
		if(this.y > 100 || this.y < -250) this.dy *= -1;
	}

	this.getX = function() { return this.x; }
	this.getY = function() { return this.y; }
}

   

		Body.prototype.draw = function() {
    var pos = this.body.GetPosition(),
        angle = this.body.GetAngle();

    context.save();
    context.translate(pos.x,pos.y);
    context.rotate(angle);

    if(this.details.color) {
      context.fillStyle = this.details.color;
      switch(this.details.shape) {
        case "circle":
          context.beginPath();
          context.arc(0,0,this.details.radius,0,Math.PI*2);
          context.fill();
          break;
        case "polygon":
          var points = this.details.points;
          context.beginPath();
          context.moveTo(points[0].x,points[0].y);
          for(var i=1;i<points.length;i++) {
            context.lineTo(points[i].x,points[i].y);
          }
          context.fill();
          break;
        case "block":
          context.fillRect(-this.details.width/2,
                           -this.details.height/2,
                           this.details.width,
                           this.details.height);
        default:
          break;
      }
    }

    if(this.details.image) {
      context.drawImage(this.details.image,
                        -this.details.width/2,
                        -this.details.height/2,
                        this.details.width,
                        this.details.height);
						}   
	
	context.restore();
            world.ClearForces();						
		};
		
  	
  
