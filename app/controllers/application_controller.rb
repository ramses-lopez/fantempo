class ApplicationController < ActionController::Base
  include ApplicationHelper
  before_action :redirect_if_logged_out
end
