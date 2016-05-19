class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :comments
  has_many :user_events
  has_many :events, through: :user_events

  def as_json(options = {})
    super(options.merge(include: [:user_events, :events, :comments]))
  end
end
