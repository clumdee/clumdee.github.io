# create a file -- streamingTwitterTags.py

# import modules
import tweepy
from tweepy import OAuthHandler, Stream
from tweepy.streaming import StreamListener
import socket
import json


# create credential variables
consumer_key = 'your_consumer_key'        # put your consumer_key from Twitter API
consumer_secret = 'your_consumer_secret'  # put your consumer_secret from Twitter API
access_token = 'your_access_token'        # put your access_token from Twitter API
access_secret = 'your_access_secret'      # put your access_secret from Twitter API

# create a class that listens to tweets
class TweetListener(StreamListener):
    def __init__(self, csocket):
        self.client_socket = csocket
        
    def on_data(self, data):
        try:
            msg = json.loads(data)
            print(msg['text'].encode('utf-8'))
            self.client_socket.send(msg['text'].encode('utf-8'))
            return True
        except BaseException as e:
            print('Error', e)
        return True
    
    def on_error(self, status):
        print(status)
        return True


# create a function that operate on streamed data
def sendData(c_socket):
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_secret)
    
    twitter_stream = Stream(auth, TweetListener(c_socket))
    # set a filter to track tweets with a string in the filter set
    twitter_stream.filter(track=['#BNK48'])
    

# execute if 'main'
if __name__ == '__main__':
    s = socket.socket()
    # set the host to be a localhost
    host = '127.0.0.1' 
    # set the connection port to be 5555
    port = 5555
    s.bind((host, port))
    
    print('listening on port:', port)
    
    s.listen()
    c, addr = s.accept()
    
    sendData(c)