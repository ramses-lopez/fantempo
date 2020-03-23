# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Artist.create!([
  {name: "Amigos Invisibles", image_url: 'http://salsacircuit.com/wp-content/uploads/2017/02/los-amigos-invisibles.jpg'},
  {name: "Caramelos de Cianuro", image_url: 'http://1.bp.blogspot.com/_R8sXCTZldrU/THL6_ue1oWI/AAAAAAAAEGQ/Hz4vq9alsqI/s1600/AFp1.png'},
  {name: "Desorden Público", image_url: 'https://image-ticketfly.imgix.net/00/03/18/73/35-og.jpg?w=1080&h=718'},
  {name: "Rawayana", image_url: 'https://i.ytimg.com/vi/ozXIAg7zp9I/maxresdefault.jpg'},
]
)