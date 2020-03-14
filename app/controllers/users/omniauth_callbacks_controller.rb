# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.from_omniauth(request.env['omniauth.auth'])
    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      if is_navigational_format?
        set_flash_message(:notice, :success, kind: 'Facebook')
      end
    else
      session['devise.facebook_data'] = request.env['omniauth.auth']
      sign_in_and_redirect @user, event: :authentication
    end
  end

  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])
    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      session['devise.google_oauth2_data'] = request.env['omniauth.auth'].except('extra')
      if is_navigational_format?
        set_flash_message(:notice, :success, kind: 'GoogleOAuth2')
      end
    else
      session['devise.google_oauth2_data'] = request.env['omniauth.auth'].except('extra')
      byebug
      sign_in_and_redirect @user, event: :authentication
    end
  end

  def failure
    # todo
    redirect_to root_path
  end

end