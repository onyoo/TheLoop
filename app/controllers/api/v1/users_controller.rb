module Api
  module V1 
    class UsersController < ApplicationController 
      skip_before_filter :verify_authenticity_token 
      respond_to :json 
      def index 
        respond_with(User.all.order("id DESC"))
      end 

      def show 
        respond_with(User.find(params[:id]))
      end
      
    end 
  end
end