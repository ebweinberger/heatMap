# Social Media Heat Map

![Heat Map](../../assets/images/HeatMapScreenShot.png)

The aim of this project is to create a live heat map of social media posts in a
specified area. The map should place a dot or a pin whenever a post is made that
has location information attached to it. The current working code is written in
python and uses Twitter API.

## tweepy
Tweepy is the python library that allows me to easily access Twitter API. Using
tweepy I opened up a `StreamListener` that continuously listens to all incoming
tweets. The tweets come in as JSON that have a `status._json['geo']['coordinates']`
property. The `coordinates` property is an array of two items: lattitude and longitude.
I filter out any tweets that don't have a `geo` property and use the lattitude and
longitude of those that do to plot a point on a map.

## matplotlib
As of right now I have a very basic display of the plotted points. To do this I
used matplotlib to create a plot. The plot needs to be set up to have a fitting
x and y axis. For instance, if I want to plot New York City only, I need to adjust
the x and y axis to start at the longitude and lattitude that correlate with the
south-west corner of the city. As of now I have it set up to plot the entire United States
(including bits of Canada and Mexico). Then I just plug in the longitude and lattitude
as the x and y coordinates.

You can see in the above picture what the plot looks like after some time running.
I think it is really cool that you can see an outline of the United States and where
the hotspots are like New York City, Los Angeles, San Fransisco, and Seattle.

## Future Plans
I plan to build out this project much further. I would like to build a nice front
end for it in p5js where the plotting could have more logic behind it. I need to
decide exactly how I want it to work but the points should disappear after some time
and maybe an area that is seeing increased activity will begin to turn red.

I also have this idea in my head to make it into some sort of dynamic wall art.
I can load the whole thing onto a raspberry pi and buy an old parted out laptop
monitor and hang it on the wall. Or, if I can afford it, I think it would be
cool to get it running on an e-ink display.

I will keep this page updated with the progress that I make on this project. If
you have any cool ideas, shoot me an email!
