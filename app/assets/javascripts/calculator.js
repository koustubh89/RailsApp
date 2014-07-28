
console.log("strt")

//var call = function(){
//	alert("hi");

$(document).ready(function(){

	var calculator = Calculator()

	var result = '';
	$.ajax({
		method: 'POST',
		url:"/api/calculator_create",
		success:function(result){
			//if(result != '') console.log(result);
    		//$("#result").html(result);
    		console.log('called create');
  		},
  		error: function(){
  			console.log('network down');
  		}
  	});


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
		
	}
	)
//}
console.log('finish');
});