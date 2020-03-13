class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def google_oauth2
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication
      session["devise.google_oauth2_data"] = request.env["omniauth.auth"].except("extra")
      set_flash_message(:notice, :success, :kind => "GoogleOAuth2") if is_navigational_format?
    else
      sign_in_and_redirect @user, :event => :authentication
      session["devise.google_oauth2_data"] = request.env["omniauth.auth"].except("extra")
    end
  end

  def failure
    redirect_to root_path
  end
end