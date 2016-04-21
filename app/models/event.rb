class Event < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  belongs_to :venue


  def as_json(options = {})
    super(options.merge(include: [:user, :category, :venue]))
  end
end