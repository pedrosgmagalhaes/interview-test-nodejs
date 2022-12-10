# Use the official MongoDB image
FROM mongo

# Use the Node.js 16 base image
FROM node:16

RUN npm install -g nodemon

# Install Node.js and the Express web framework
RUN apt-get update && apt-get install -y nodejs npm && npm install -g express

# # Create a new "app" user
RUN useradd -ms /bin/bash app

# Copy your application code to the container
COPY src /src

# Install the dependencies in the package.json file
RUN cd src && yarn install

# # Use the "app" user to run the application
USER app

# Set the working directory to the src directory
WORKDIR /src

# Run the application
CMD ["yarn", "start"]