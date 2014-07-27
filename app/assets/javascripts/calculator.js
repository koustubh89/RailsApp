
console.log("strt")

//var call = function(){
//	alert("hi");

$(document).ready(function(){
	$("#sub").click(function(){

		var command = $('#command').val();
		console.log("something",command);
		
		$.ajax({
			method: 'POST',
			data: command,
			url:"api/calculator",
			success:function(result){
				if(result != '') console.log(result);
	    		$("#result").html(result);
	  		},
	  		error: function(){
	  			console.log('network down');
	  		}
	  	});
	}
	)
//}
console.log('finish');

$('#sp').click(function(){alert('clicked');})

});