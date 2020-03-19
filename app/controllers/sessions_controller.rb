class SessionsController < ApplicationController
  before_action :redirect_if_logged_in

  def index
    redirect_to validations_path if current_user
  end
end
