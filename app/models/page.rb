class Page < ActiveRecord::Base
    # @num = 0
    # require 'yelp'
    
    def self.yelp(x)
        
        client = Yelp::Client.new({ consumer_key: 'DU6vJO_0TOHbAIdbeAI2Pg',
                            consumer_secret: '2KAD0X53jSCuJHRzxZrYXW8GZQY',
                            token: 'qgbaDr7ijqigxc0eAacziVPDDWpeYwWr',
                            token_secret: 'J8jwjVRXw2fn4GEeWkucJvqJDk4'
                          })

        params = { term: 'restaurants',
                   limit: 2,
                 }
                
        arr = x.scan(/(-*\d+\.\d+)(,\s)(-*\d+\.\d+)/)
        len = arr.length
        c = 0
        # m = 1
        info = []
        len.times do
            
            coordinates = { latitude: arr[c][0].to_f, longitude: arr[c][2].to_f }
            response = client.search_by_coordinates(coordinates, params)
            response.businesses.each do |z|
                info << [z.name, z.rating.to_s, z.location.display_address]
                # m +=1
            end
            
            c +=1
        end
        return info #wasn't working with just info, needed the return too
        
        #turn info into an arrays for each restaurant within each array
        
        
        
        
        
        # val2 = coords
        # val2 = val2.to_i
        # num = val2 * 10
        # num
        
        

        # client = Yelp::Client.new({ consumer_key: 'DU6vJO_0TOHbAIdbeAI2Pg',
        #                             consumer_secret: '2KAD0X53jSCuJHRzxZrYXW8GZQY',
        #                             token: 'qgbaDr7ijqigxc0eAacziVPDDWpeYwWr',
        #                             token_secret: 'J8jwjVRXw2fn4GEeWkucJvqJDk4'
        #                           })
        
        # params = { term: 'restaurants',
        #           limit: 2,
        #          }
        
        # coordinates = { latitude: 38.03148713226171, longitude: -122.11676956570454 }
        
        # response = client.search_by_coordinates(coordinates, params)
        # response.businesses.each do |x|
        # 	print x.name + " " + x.rating.to_s
        # 	puts
        # end

        # main = []
        # coords.each do |x|
        #     arr = []
        #     main << arr
        # end
    end
end

#issue with the "Burst" when I tried to puts the entire response
