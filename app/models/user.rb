class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable

  devise :omniauthable, omniauth_providers: [:facebook, :google_oauth2]

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  def self.from_omniauth(auth)
    user = User.where(provider: auth.provider, uid: auth.uid).first_or_initialize do |u|
      u.email = auth.info.email
      u.password = Devise.friendly_token[0,20]
      u.name = auth.info.name # assuming the u model has a name
      u.image = auth.info.image # assuming the u model has an image
    end

    if user.provider != auth.provider
      user.provider = auth.provider
      user.name = auth.info.name
      user.image = auth.info.image
      user.save
    end

    user
  end
end
