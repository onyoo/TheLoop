class Category < ActiveRecord::Base
  has_many :events


  def as_json(options = {})
    super(options.merge(include: [:event]))
  end
  
end
