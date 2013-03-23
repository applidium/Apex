$(function(){
  $.ajax({
    url: "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topfreeapplications/limit=100/xml",
    context: document.body
  }).done(function(data) {
    $.each($(data).find('entry'), function(index, value) {
      addApplication(index+1, index < 10 ? 'foreground' : 'background', value);
    });
  });
});

function addApplication(index, kind, xmlNode) {
  var metadata = {
    "rank": index,
    "name": $(xmlNode).find('name').text(),
    "category": $(xmlNode).find('category').attr('label'),
    "icon": $(xmlNode).find('image').last().text(),
    "editor": $(xmlNode).find('artist').text()
  };
  console.log(metadata);
  $('#apps-' + kind).append(Mustache.render($('#' + kind + '-app').html(), metadata));
}
