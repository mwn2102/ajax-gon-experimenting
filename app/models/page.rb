class Page < ActiveRecord::Base
    # @num = 0
    def self.yelp(coords)
        # gon.val2 = coords
        # val2 = gon.val2 
        # val2 = val2.to_i
        # val2 = val2 * 10
        # return val2
        
        val2 = coords
        val2 = val2.to_i
        num = val2 * 10
        num
    end
end
