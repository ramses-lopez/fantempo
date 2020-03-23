class HomepageController < ApplicationController
  layout 'landing'

  def index
    default_name = 'tu artista favorito'
    @artist_name = if params[:artist].present?
      artist = Artist.find_by(id: params[:artist])
      artist.nil? ? default_name : artist.name
    else
      default_name
    end
  end
end
