
console.log("strt")

//var call = function(){
//	alert("hi");

$(document).ready(function(){
	$("#sub").click(function(){

		var command = $('#command').val();
		console.log("something",command);
		
		$.ajax({
			type: "PUT",
			url:"http://localhost:3000/api/calculator",
			contentType: "application/x-www-form-urlencoded",
			data: command,
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