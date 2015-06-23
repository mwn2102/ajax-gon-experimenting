class PagesController < ApplicationController
    def index
        # @pages = Page.all
        # gon.val = @pages.first
        
    end
    
    def calculate
        
        # gon.val2 = params[:mydata]
        # val2 = gon.val2 
        # val2 = val2.to_i
        # val2 = val2 * 10
        
        # @page = Page.where("name" => "mike")
        # @page.yelp(params[:mydata])
        # gon.val2 =  @page.yelp(params[:mydata])
        
        @x = params[:mydata]
        # Page.yelp(x)
        # gon.val2 = @num
        @myresult = Page.yelp(x)
        # gon.val3 = Page.yelp(x)
        # gon.val3 = ['1234', '5678']
        # redirect_to root
        # {redirect_to(root)}
        
        respond_to do |format|
            # {redirect_to '/'}
            # format.html
            # format.js 
            format.json {render json: @x}
        end
    end
end
