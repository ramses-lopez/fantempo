class SessionsController < ApplicationController
  def index
    redirect_to validations_path if current_user
  end
end
