# App Store Apex

Introducing App Store Apex: an awesome visualization of what's hot on Apple's App Store!

## I want to see it in action

Just head to [apex.applidium.com](http://apex.applidium.com/) !

## What does it do?

Apex retrieves the global app ranking from Apple and creates a nice HTML layout from it. Actually, it creates an animated slideshow with the 10 most downloaded apps, and displays the following ones in the background as a mosaic.

## Advanced usage

You can change the actual RSS feed being used. Just head to [Apple's RSS generator](http://itunes.apple.com/rss), and pick whichever suits you. Then pass it in the URL, like this :
`http://apex.applidium.com/?feed=https%3A%2F%2Fitunes.apple.com%2Ffr%2Frss%2Ftopfreeapplications%2Flimit%3D300%2Fxml`

Keep two things in mind when customizing your Apex:

* First, you should URL-escape your feed's URL!
* Second, if you only include the top 10 apps in the feed, the background will be black.

## I'm a geek, tell me more!

* App Store Apex was made possibly because Apple implemented a [cross-origin ressource sharing policy](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) in their RSS feed. Otherwise it wouldn't have been possible to make a cross-domain AJAX request.

* Once minified, App Store Apex is barely 10 Kb!

* It uses [Mustache](http://mustache.github.com/) for templating
