class SessionsController < ApplicationController
  def index
    @artist_name = 'Tu artista favorito'
    if params[:artist].present?
      artist = Artist.find_by(id: params[:artist])
      if artist.present?
        session[:artist_id] = params[:artist]
        @artist_name = artist.name
      end
    end
  end
end
