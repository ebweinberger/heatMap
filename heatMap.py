import tweepy
import json
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import logging
import threading
import time

tweetCount = 0;

class MyStreamListener(tweepy.StreamListener):
    def on_status(self, status):
        global tweetCount
        if(status.geo != None):
            lat = json.dumps(status._json['geo']['coordinates'][0], indent=2)
            long = json.dumps(status._json['geo']['coordinates'][1], indent=2)
            tweetArray = [status.user.screen_name, ": ", status.text, "\n\tLocation: ", lat, ", ", long, "\n\tTweet ID: ", json.dumps(status._json['id'])]
            tweetStr = "".join(tweetArray).encode(encoding='UTF-8', errors='strict')
            # print(tweetStr)
        # tweetStr = "".join(tweetArray).encode(encoding='UTF-8', errors='strict')
        # print(tweetStr)
        tweetCount += 1
        # print(tweetCount)


    def on_error(self, status_code):
        print("Error: " + str(status_code))
        if status_code == 420:
            print("Rate limited, try again later.")
            return False

    def getTweets():
        global tweetCount
        return tweetCount

def logit():
    global tweetCount
    while(1):
        print(tweetCount)
        time.sleep(1)


auth = tweepy.OAuthHandler('c8mCwG4MAMcegW9KxQPhyqjTi', 'HnVpFuj2wGRJffySUXComrsG8jrpILkCRWuDYW3mqjTMruUA1M')
auth.set_access_token('739495608-Ue7U73FsMPADhy3qDyoHXOjIvtcd39wgeAMtnVPj', 'm2mQmxIqbjCoB3Iuw7hJsbVhaqI5EWJ3peCeqjovyGzbX')
api = tweepy.API(auth)

if __name__ =="__main__":
    t = threading.Thread(target=logit, args=())
    t.start()

myStreamListener = MyStreamListener()
myStream = tweepy.Stream(auth, listener=myStreamListener)
myStream.filter(locations = [-124.975166, 30.566991, -62.775810, 46.168419])
# myStream.filter(locations = [-130, -60, 140, 70])
