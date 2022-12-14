FROM python:3.11.0
WORKDIR /Users/Rikuo/Desktop/mechmonkey-chatbot/server
COPY . .
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["python3", "./server.py"]