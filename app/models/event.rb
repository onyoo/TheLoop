class Event < ActiveRecord::Base

  has_many :comments
  # has_many :users, through: :comments
  has_many :user_events
  has_many :users, through: :user_events
  belongs_to :category
  belongs_to :venue

  include Geokit::Geocoders

  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  def self.get_location(geo_string)
    geo_string.split(',').map(&:to_f)
  end

  def self.find_by_zipcode(zipcode)
    location = self.geocode(zipcode)
    if location.success
       latitude = location.lat
       longitude = location.lng
    end
    self.within(25, :origin => [latitude,longitude])
  end

  def venue_name=(venue)
    self.update(venue_id: Venue.find_or_create_by(name: venue).id)
  end

  def categories=(category)
    category_name = category[:category].first[:name].gsub('&amp;', '').split(' ').first
    self.update(category_id: Category.find_or_create_by(name: category_name).id)
  end

  def images=(image)
    self.update(image_url: image[:image][:thumb][:url]) unless image.nil?
  end

  def address=(street)
    self.update(street_address: street)
  end

  def url=(api_url)
    self.update(event_url: api_url)
  end

  # def venue=(venue_name)
  #   binding.pry
  #   self.update(venue_id: Venue.find_or_create_by(name: venue_name).id)
  # end

  # def api_id=(event_id)
  #   binding.pry
  # end

  # def id=(id)
  #   binding.pry
  #   event_id = 0
  #   if id.to_i == 0
  #     self.update(api_id: id)
  #     binding.pry
  #   else
  #     binding.pry
  #   end
  # end

  # def venue_name
  #   binding.pry
  # end

  # def category=(category_name)
  #   binding.pry
  #   # self.update(category_id: Category.find_or_create_by(name: category_name.name).id)
  # end

  # def categories
  #   binding.pry
  # end

  # def categories=(category)
  #   category_name = category[:category].first[:name].gsub('&amp;', '').split(' ').first
  #   self.update(category_id: Category.find_or_create_by(name: category_name).id)
  # end

  # def category_id=(category)
  #   binding.pry
  #   self.update(category_id: Category.find_or_create_by(name: category.name).id)
  # end

  def update_relations(params, current_user)
    binding.pry
    # self.venue = Venue.find_or_create_by(name: params[:venue][:name]) if !params[:venue].nil?
    self.category = Category.find(params[:event][:category_id])
    self.users << current_user if !self.users.detect{ |user| user.id == current_user.id}
    save
  end

  def create_relations(params, current_user)
    self.street_address = params[:event][:address] if params[:event][:address]
    self.venue = Venue.find_or_create_by(name: params[:event][:venue_name]) if params[:event][:venue_name]
    if (!params[:event][:id].nil?) && (params[:event][:id].to_i == 0) && (params[:event][:id].length != 1)
      self.api_id = params[:event][:id]
    end
    self.creator = current_user.id if self.api_id.nil?
    self.category = Category.find_or_create_by(name: params[:event][:category][:name]) if params[:event][:category]
    self.set_location
    self.users << current_user
    save
  end

  def set_location
    address = street_address
    address += (", " + city)                    unless city.nil?
    address += (", " + self[:region_abbr])      unless region_abbr.nil?
    address += (' ' + self[:postal_code].to_s)  unless postal_code.nil?
    address += (", " + self[:country_abbr])     unless country_abbr.nil?

    if self.latitude.nil?
      loc=Event.geocode(address)

      if loc.success
         self.latitude = loc.lat
         self.longitude = loc.lng
      end
    end
  end

  def as_json(options = {})
    super(options.merge(include: [:user_events, :category, :venue, :users, :comments => {:include => :user}]))
  end

end
