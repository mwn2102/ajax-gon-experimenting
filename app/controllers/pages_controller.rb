class PagesController < ApplicationController
    def index
        # @pages = Page.all
        # gon.val = @pages.first
        # @page = Page.new
        
        gon.val4 = @myresult

    end
    
    def calculate
        
        # gon.val2 = params[:mydata]
        # val2 = gon.val2 
        # val2 = val2.to_i
        # val2 = val2 * 10
        
        # @page = Page.where("name" => "mike")
        # @page.yelp(params[:mydata])
        # gon.val2 =  @page.yelp(params[:mydata])
        
        x = params[:mydata]
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
            format.json {render json: @myresult}
        end
    end
    
    def new
        @page = Page.new
        # @result = Page.last.coords
        gon.result = Page.yelp(Page.last.coords)
    end
    
    def create 
      @page = Page.new(page_params)
      x = Page.yelp(@page.coords)
    #   gon.val4 = Page.yelp(@page.score)
      if @page.save 
        flash[:notice] =  "it worked"
        # redirect_to '/'
        render json: @page.coords
        
        
        # render json: x
      else 
        # redirect_to '/'
        flash[:notice] =  "it did not work"
        render 'new' 
        
      end 
    end
    
    def show
      @page = Page.last.coords
    end
    
    private 
        def page_params 
          params.require(:page).permit(:name, :score, :coords) 
        end
    
    
end
