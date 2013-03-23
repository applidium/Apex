$(function(){
  reloadRSSFeed();
  setInterval(function(){
    reloadRSSFeed();
  }, 15*60*1000); // Refresh every 15 minutes
});

function reloadRSSFeed() {
  $.ajax({
    url: "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topfreeapplications/limit=250/xml",
    context: document.body
  }).done(function(data) {
    $('.app').remove();
    $.each($(data).find('entry'), function(index, value) {
      addApplication(index+1, index < 10 ? 'foreground' : 'background', value);
    });
  });
}

function addApplication(index, kind, xmlNode) {
  var metadata = {
    "rank": index,
    "name": $(xmlNode).find('name').text(),
    "category": $(xmlNode).find('category').attr('label'),
    "icon": $(xmlNode).find('image').last().text(),
    "editor": $(xmlNode).find('artist').text()
  };
  $('#apps-' + kind).append(Mustache.render($('#' + kind + '-app').html(), metadata));
}
