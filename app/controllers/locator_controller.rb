class LocatorController < ApplicationController
  def index
    @city_list = CountryList.city_list
  end
end
