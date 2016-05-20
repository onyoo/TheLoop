module Api
  module V1
    class CommentsController < ApplicationController
      before_filter :authenticate_user!, only: [:create, :destroy]
      before_action :set_event, only: [:create]
      respond_to :json

      def create
        @event.comments.create(comment_params)
        render :json => @event.comments.last
      end

      def destroy
        @event = Event.find(params[:event_id])
        @comment = @event.comments.find(params[:id])
        respond_with @comment.destroy
      end

      private

      def set_event
        @event = Event.find(params[:event_id])
      end

      def comment_params
        params.require(:comment).permit(:content, :event_id, :user_id)
      end
    end
  end
end
