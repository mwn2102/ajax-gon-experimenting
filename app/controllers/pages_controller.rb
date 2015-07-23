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
        # gon.result = Page.yelp(Page.last.coords) #gon needs to be defined to show map 
        # respond_to do |format|
        #   format.html
        #   format.json
        # end
        
    end
    
    # def new  #experiment new
    #   @test_page = Page.new
    #   @page = Page.new(page_params)
    #   if @page.save 
    #     gon.result = Page.yelp(@page.coords)
    #     render json: gon.result
    #   end
    # end
    
    def create 
      @page = Page.new(page_params)
      # gon.result = Page.yelp(@page.coords) #this was working
    #   gon.val4 = Page.yelp(@page.score)
      if @page.save 
        redirect_to page_path(@page)
        # gon.result = Page.yelp(@page.coords)
        # flash.now =  "it worked"
        # redirect_to '/'
        # render json: {location: @page}      #this was working with @page.coords
        # render @page
        # render edit_page_path(@page)   #new stuff
        # respond_to do |format|
        #   format.html
        #   format.json
        # end

        
        
        # render json: x
      else 
        # redirect_to '/'
        flash[:notice] =  "it did not work"
        render 'new' 
        
      end 
    end
    
    def show
      # @page = Page.last.coords
      @page = Page.find(params[:id])
      gon.start = @page.start
      gon.destination = @page.end
      # gon.result = Page.yelp(@page.coords) #this is correct code
      gon.result = @page.coords
      # gon.result = Page.yelp(Page.last.coords)  crossing out
    end
    
    def update
      @page = Page.find(params[:id])
      @page.update(page_params)
      flash.notice = "Article Updated!"
      gon.result = Page.yelp(@page.coords)
      if @page.save
        render edit_page_path(@page)
      end
    end
    
    def edit
      @page = Page.find(params[:id])
      gon.result = Page.yelp(Page.last.coords)
    end
    
    private 
        def page_params 
          params.require(:page).permit(:name, :score, :coords, :start, :end) 
        end
    
    
end
