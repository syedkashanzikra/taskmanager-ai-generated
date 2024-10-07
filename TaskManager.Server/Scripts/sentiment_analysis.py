# sentiment_analysis.py
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import sys
import json

def analyze_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    score = analyzer.polarity_scores(text)
    sentiment = "Neutral"
    if score['compound'] >= 0.05:
        sentiment = "Positive"
    elif score['compound'] <= -0.05:
        sentiment = "Urgent"
    return sentiment

if __name__ == "__main__":
    text = sys.argv[1]
    result = analyze_sentiment(text)
    print(json.dumps({"sentiment": result}))
