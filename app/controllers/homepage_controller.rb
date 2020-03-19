class HomepageController < ApplicationController
  before_action :redirect_if_logged_in
  layout 'landing'
  def index
  end
end
