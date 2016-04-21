module Api
  module V1 
    class CategoriesController < ApplicationController 
      skip_before_filter :verify_authenticity_token 
      respond_to :json 
      def index 
        respond_with(Category.all.order("id DESC"))
      end 
      def show 
        respond_with(Category.find(params[:id]))
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
        respond_with Category.destroy(params[:id]) 
      end 
      private 
        def category_params 
          params.require(:category).permit(:name) 
        end 
    end 
  end
end