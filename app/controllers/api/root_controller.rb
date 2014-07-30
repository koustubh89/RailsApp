module Api
	class RootController < ActionController::Base
	
  		before_action :authenticate_customised
	def authenticate_customised
		if current_user
			head :ok
		else
			head :not_found
		end
	end
	end
end
