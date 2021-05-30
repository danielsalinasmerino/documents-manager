# base image
FROM node:10.16.3-jessie

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

# start app
CMD ["npm", "start"]