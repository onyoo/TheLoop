module Api
  module V1 
    class VenuesController < ApplicationController 
      skip_before_filter :verify_authenticity_token 
      respond_to :json 
      def index 
        respond_with(Venue.all.order("id DESC"))
      end 
      def show 
        respond_with(Venue.find(params[:id]))
      end 
      def create 
        @venue = Venue.new(venue_params) 
        if @venue.save 
          respond_to do |format|
            format.json { render :json => @venue }
          end 
        end 
      end 
      def update 
        @venue = Venue.find(params[:id])
        if @venue.update(venue_params) 
          respond_to do |format| 
            format.json { render :json => @venue }
          end 
        end 
      end 
 
      def destroy 
        respond_with Venue.destroy(params[:id]) 
      end 
      private 
        def venue_params 
          params.require(:venue).permit(:name) 
        end 
    end 
  end
end