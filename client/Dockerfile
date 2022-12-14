FROM node:19
WORKDIR /Users/Rikuo/Desktop/mechmonkey-chatbot/client
COPY . . 
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]