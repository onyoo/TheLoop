module Api
  module V1
    class EventsController < ApplicationController
      skip_before_filter :verify_authenticity_token
      before_action :set_event, only: [:show, :update]
      before_action :set_location, only: [:index]
      before_action :saved_event, only: [:create]
      respond_to :json
      before_action :set_api_event, only: [:check]

      def index
        respond_with(@events.where(api_id: nil))
      end

      def show
        respond_with(@event)
      end

      def check
        # event = Event.find_by(api_id: params[:api_id])
        if !!@event
          render :json => @event
        else
          render nothing: true, status: 401
        end
        # if @api_event.present?
        #   render :json => @api_event
        # else
        #   render nothing: true, status: 401
        # end
      end

      def create
        # if event = Event.find_by(title: params[:event][:title])
        #   # if !event.users.detect{ |user| user.id == current_user.id}
        #   #   event.users << current_user
        #   # end
        # else

        # event.users << current_user
        # event = Event.create(event_params)
        # event.create_relations(params, current_user)
        # binding.pry

        if @event.nil?
          @event = Event.new(event_params)
          @event.update(api_id: params[:event][:id])
          @event.set_location
        end

        if @event.save
          current_user.user_events.create(event_id: @event.id)
          respond_to do |format|
            format.json { render :json => @event }
          end
        end
      end

      def update
        @event.update(event_params)
        # event.update_relations(params, current_user)
        render json: @event
      end

      def destroy
        respond_with Event.destroy(params[:id])
      end

    private

      def saved_event
        @event = Event.find_by(title: params[:event][:title])
      end

      def set_location
        if params[:location]
          location = Event.get_location(params[:location])
          @events = Event.within(25, :origin => location)
        elsif params[:zipcode]
          @events = Event.find_by_zipcode(params[:zipcode])
        end
      end

      def set_event
        @event = Event.find(params[:id])
      end

      def set_api_event
        @api_event = Event.find_by(api_id: params[:api_id])
      end

      def event_params
        params.require(:event).permit(:title, :description, :start_time, :event_url, :url, :street_address, :address, :city, :region_abbr, :postal_code, :country_abbr, :latitude, :longitude, :image_url, :creator, :venue_name).tap do |whitelisted|
          whitelisted[:categories] = params[:event][:categories]
          whitelisted[:images] = params[:event][:images]
        end
      end

      # def event_params
      #   params.require(:event).permit(:id, :api_id, :category, :creator, :title, :description, :start_time, :event_url, :url, :street_address, :address, :city, :region_abbr, :postal_code, :country_abbr, :latitude, :longitude, :image_url, :category, :venue, :venue_name, :categories => [:category, :name])
      # end
    end
  end
end
