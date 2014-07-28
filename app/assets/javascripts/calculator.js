
// no dom lookups anywhere accept for constructor
// no anonymous functions
// no method calls in constructor
// pull out methods for anything

// var C1 = new Calculator()
// var C1 = new Calculator()

//  C1.regObs(C2)
//  C2.regObs(C1)


$(document).ready(function(){
	var cal1 = new Calculator("#calculator1");
	var cal2 =new Calculator("#calculator2")
});

var Calculator = function(viewid){
	var result = '';
	this.command = $(viewid).find('.command');
	this.result = $(".result");
	this.button = $(viewid).find(".sub");
	this.initialize();
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
		if(result != '') console.log(result);
  		this.result.append("<div><span>Now </span> "+result['state']+"</div>");
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
	  		},
	  		error: function(){
	  			console.log('network down');
	  		}
	  	});
	}
}

