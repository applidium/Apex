$(function(){
  reloadRSSFeed(true);
  setInterval(function(){
    reloadRSSFeed(false);
  }, 15*60*1000); // Refresh every 15 minutes
});

function reloadRSSFeed(verbose) {
  if (verbose) {
    $('body').append("<div class='spinner'><p class='symbol'>✛</p><p class='legend'>Loading…</p></div>");
  }
  $.ajax({
    url: "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topfreeapplications/limit=250/xml",
  context: document.body
  }).done(function(data) {
    $('.spinner').remove();
    $('.app').remove();
    $.each($(data).find('entry'), function(index, value) {
      addApplication(index+1, index < 10 ? 'foreground' : 'background', value);
    });
  });
}

function addApplication(index, kind, xmlNode) {
  // Note: Apparently jQuery has trouble consistently parsing namespaced XML.
  //   So we're joining two methods, one that works in WebKit and another that works in Firefox
  var metadata = {
    "rank": index,
    "name": $(xmlNode).find('im\\:name, name').text(),
    "category": $(xmlNode).find('category').attr('label'),
    "icon_medium": $(xmlNode).find('im\\:image, image').last().text(),
    "icon_large": $(xmlNode).find('im\\:image, image').last().text().replace('100x100', '512x512'), // Hack: let's retrieve a higher resolution image that's not in the XML feed
    "editor": $(xmlNode).find('im\\:artist, artist').text()
  };
  $('#apps-' + kind).append(Mustache.render($('#' + kind + '-app').html(), metadata));
}
