from flask import Flask, request, jsonify, Response
import nltk
import difflib
from nltk.sentiment import SentimentIntensityAnalyzer
from flask_cors import CORS

keywords = ["product", "blog", "contact", "about", "register", "sign"]

app = Flask(__name__)
CORS(app)

@app.route("/test", methods=["GET"])
def hello():
    greeting = jsonify('hello')
    return Response("{'hello': 'hi'}",status=200,mimetype='application/json')

@app.route("/user-msg", methods=["POST"])
def userMsg():
    data = request.get_json()  
    # get sentiment of text, measured in negative, neutral and positive
    sentiment_polarity = SentimentIntensityAnalyzer()
    print(sentiment_polarity.polarity_scores(data['content']))
    if " " not in data['content']: # if one word input
        closest_match = difflib.get_close_matches(str(data['content']), keywords)
        if closest_match:
            sequence_match_obj = difflib.SequenceMatcher(a=closest_match[0], b=data['content'])
            if sequence_match_obj.ratio() > 0.5: 
                return jsonify({'content': closest_match[0], 'sentBy': 'server'})
            else:
                return jsonify({'content': 'no match found', 'sentBy': 'server'})
        else: return jsonify({'content': 'no match found', 'sentBy': 'server'})  
    else:
        word_list = str(data['content']).split()
        keyword_list = []
        for word in word_list: 
            closest_match = difflib.get_close_matches(word, keywords)
            if closest_match:
                keyword_list.append(closest_match[0])
            else: 
                continue
        remove_duplicates = list(dict.fromkeys(keyword_list))
        print(remove_duplicates)
        if remove_duplicates and len(remove_duplicates) > 1: 
            return jsonify({'content': remove_duplicates, 'sentBy': 'server'})
        elif remove_duplicates: 
            return jsonify({'content': remove_duplicates[0], 'sentBy': 'server'})
        else:
            print(remove_duplicates)
            return jsonify({'content': None, 'sentBy': 'server'})
            
if __name__ == "__main__":
    app.run("localhost", 8000)