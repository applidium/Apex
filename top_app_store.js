$(function(){
  $.ajax({
    url: "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topfreeapplications/limit=10/xml",
    context: document.body
  }).done(function(data) {
    $.each($(data).find('entry'), function(index, value) {
      addApplication(value);
    });
  });
});

function addApplication(xmlNode) {
  var metadata = {
    "name": $(xmlNode).find('name').text(),
    "category": $(xmlNode).find('category').attr('label'),
    "icon": $(xmlNode).find('image').last().text(),
    "editor": $(xmlNode).find('artist').text()
  };
  var appNode = Mustache.render($('#entry-template').html(), metadata);
  $('#apps').append(appNode);
}