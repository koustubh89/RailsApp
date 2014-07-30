module Api

	class CalculatorController < ActionController::Base
    protect_from_forgery
		def update
			
		  calculator=Calculator.find_by_user_id(current_user.id)
		  if calculator
			command = params[:command]
			parser = Parser.new(command)
			router = Router.new(calculator)
			result = router.map(parser)
	        render :json=> {:state => calculator.state }
	      else
	    	head :not_found
	      end
		end


	    def create
	    	if Calculator.find_by_user_id(current_user.id)==nil
		   		calculator = Calculator.create({:state => 0,:user_id=>current_user.id})
		    end
	    	head :created
		end
	end
end