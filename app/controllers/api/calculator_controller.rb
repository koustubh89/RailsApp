module Api
	class CalculatorController < ApplicationController 
    protect_from_forgery
		def update
			p 'updated-****************************************************************************'
	    	
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
		    	p 'created----------------------------------------------------------------------------'
		    	calculator = Calculator.create({:state => 0,:user_id=>current_user.id})
		    end
	    	head :created
		end
	end
end