# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    handle_callback('facebook')
  end

  def google_oauth2
    handle_callback('google_oauth2')
  end

  def failure
    msg = "#{params['error']}: #{params['error_reason']}. #{params['error_description']}"
    set_flash_message(:notice, :failure, kind: 'facebook', reason: msg) if is_navigational_format?
    redirect_to login_path
  end

  private

  def handle_callback(provider)
    user = User.from_omniauth(request.env['omniauth.auth'])
    set_flash_message(:notice, :success, kind: provider.classify) if is_navigational_format?
    session["devise.#{provider}_data"] = request.env['omniauth.auth'].except('extra')
    sign_in user
    redirect_to validations_path
  end

end