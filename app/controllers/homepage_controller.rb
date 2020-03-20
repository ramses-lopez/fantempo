class HomepageController < ApplicationController
  skip_action :redirect_if_logged_out
  before_action :redirect_if_logged_in

  layout 'landing'

  def index
  end
end
