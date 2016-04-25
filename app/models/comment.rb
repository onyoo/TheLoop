class Comment < ActiveRecord::Base
  belongs_to :event
  belongs_to :user


  def as_json(options = {})
    super(options.merge(include: [:event, :user]))
  end
  
end