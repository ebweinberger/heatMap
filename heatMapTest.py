from heatMap import *
import time

def getCount():
    while(1):
        time.sleep(5)
        return heatMap.getTweets()


getCount()
