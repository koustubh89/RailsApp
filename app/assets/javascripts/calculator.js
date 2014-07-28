
$(document).ready(function(){
	var cal = new calculator("empty");
	cal.checker();
});

var calculator = function(history){
	var result = '';
	$.ajax({
		method: 'POST',
		url:"/api/calculator_create"
		/*success:function(result){
			//if(result != '') console.log(result);
    		//$("#result").html(result);
    		console.log('called create');
  		},															//	not required
  		error: function(){
  			console.log('network down');
  		}*/
  	});		
}


calculator.prototype.checker = function(){
	$("#sub").click(function(){
		var command = $('#command').val();
		console.log("something",command);
		$.ajax({
			method: 'PUT',
			data: {"command": command},
			url:"/api/calculator_update",
			success:function(result){
				if(result != '') console.log(result);
	    		$("#result").html(result['state']);
	  		},
	  		error: function(){
	  			console.log('network down');
	  		}
	  	});	
		
	});
}