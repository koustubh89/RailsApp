module Api
	class RootController < ActionController::Base
	
  		before_action :authenticate_user!
	
	end
end
