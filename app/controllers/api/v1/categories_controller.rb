module Api
  module V1
    class CategoriesController < ApplicationController
      skip_before_filter :verify_authenticity_token
      respond_to :json

      def index
        render json: Category.all.order("id DESC")
      end

      def show
        render json: Category.find(params[:id]), include: :events
      end

      def create
        @category = Category.new(category_params)
        if @category.save
          respond_to do |format|
            format.json { render :json => @category }
          end
        end
      end

      def update
        @category = Category.find(params[:id])
        if @category.update(category_params)
          respond_to do |format|
            format.json { render :json => @category }
          end
        end
      end

      def destroy
        render json: Category.destroy(params[:id])
      end

    private
      def category_params
        params.require(:category).permit(:name)
      end
    end

  end
end
