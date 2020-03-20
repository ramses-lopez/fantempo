class SessionsController < ApplicationController
  skip_before_action :redirect_if_logged_out
  before_action :redirect_if_logged_in

  def index
  end
end
