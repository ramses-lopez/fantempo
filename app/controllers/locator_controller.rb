class LocatorController < ApplicationController
  def index
    @city_list = Location.city_list
  end
end
