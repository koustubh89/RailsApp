
// no dom lookups anywhere accept for constructor
// no anonymous functions
// no method calls in constructor
// pull out methods for anything

// in oberserver pattern we do following 
//	 	observer/register
//	 	notify
//	 	handle

$(document).ready(function(){
	var template =new TemplateGenerator();
});

var TemplateGenerator= function(){
	this.initialize();
}

TemplateGenerator.prototype={
	initialize: function(){
		this.calculators = [];
		this.observeClick();
	},
	observeClick: function(){
		var self = this;
		$("#gen_cal").click(function(){
			var cal1 = new Calculator('#template #calculator1');
			for(i=0;i<self.calculators.length;i++){
				cal1.registerObservers(self.calculators[i]);
			    self.calculators[i].registerObservers(cal1);
			}
			self.calculators.push(cal1);
		});
	}
}

var Calculator = function(viewid){

	this.viewElement=$(viewid).clone().appendTo( "#container" );
	console.log(viewid);
	this.command = this.viewElement.find('.command');
	this.result = this.viewElement.find(".result");
	this.button = this.viewElement.find(".sub");
	this.initialize();
	this.observers = $({});
}

Calculator.prototype = {
	initialize : function(){
		this.makeCreateCall();
		this.calculate();
	},
	calculate : function (){
		this.observeButton();
	},
	makeCreateCall: function(type,url){
		$.ajax({
			method: 'POST',
			url:"/api/calculator_create"
  		});	
	},
	printResult: function(result){
		if(result != '') {console.log(result);}
  		this.result.append("<div><span>Now </span> "+result.state+"</div>");
	},
	observeButton: function(){
		var self = this;
		this.button.click(_.bind(this.processCalculation, this));
	},
	processCalculation: function(){
		var self = this;
		$.ajax({
			method: 'PUT',
			data: {"command": self.command.val()},
			url:"/api/calculator_update",
			success: function(result){
				self.printResult(result);
				self.notifyObservers(result);
	  		},
	  		error: function(){
	  			console.log('network down');
	  		}
	  	});
	},
	registerObservers: function(otherCalculator){
		var self =this;
    //	this.observerls.on("calculator:notiyfy", _.bind(otherCalculator.printResult, otherCalculator));
		self.observers.on("calculator:notify",function(event,result){
			otherCalculator.printResult(result);
		})
	},
	notifyObservers: function(result){
		var self= this
  	    self.observers.trigger("calculator:notify",result);
  	}
}