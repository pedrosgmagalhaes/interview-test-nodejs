# Poster
Posterr is a social media application similar to Twitter, but with fewer features. This README covers the features and requirements for the backend RESTful API that will support Posterr's single-page JavaScript app.

## Features
The Posterr API will support the following features:

## Homepage:

- A feed of posts (including reposts and quote posts), starting with the latest 10 posts.
A-  toggle switch to switch between seeing all posts and just posts written by the current user.
- A date range filter to filter results based on post date.
- The ability to create new posts from the homepage.

## User profile page:
 - Data about the user, including their username, date joined, and post count.
- A feed of the user's posts (including reposts and quote posts), starting with the latest 5 posts.
- The ability to create new posts from the user profile page.
- In addition to these features, the Posterr API will also support:

## Users:

- Only alphanumeric characters can be used for usernames.
- Usernames are limited to 14 characters.
- Usernames must be unique.
- User authentication and CRUD operations will be handled by a separate service.

## Posts:

- Posts are text-only and cannot be updated or deleted.
- Users are limited to 5 posts per day (including reposts and quote posts).
- Posts are limited to 777 characters.
- Users can repost other users' original posts and quote posts (but not reposts).
- Users can quote-post other users' original posts and reposts (but not quote posts), adding their own comment.

## Requirements
To run the Posterr API, you will need the following:
- A containerization solution (such as Docker) for easy setup.
- A production-ready database for efficient querying.
- Automated tests for the API.

## Installation
To install the Posterr API, follow these steps:

- Clone the repository: git clone https://github.com/pedrosgmagalhaes/interview-test-nodejs
- Install the required dependencies using your preferred method (e.g. pip install -r requirements.txt)
- Set up your database and configure your database settings in the appropriate configuration file.
- Run any database migrations to set up the necessary tables.
- Start the API using your preferred method (e.g. python app.py)

## Usage
 - Once the Posterr API is running, you can access the endpoints using your preferred HTTP client. The endpoints and their expected input and output are detailed in the API documentation.

## Testing
- To run the automated tests for the Posterr API, use the following command:

`python test/test_routes.py`

This will run all tests and provide output indicating the results of each test.

## Critique
After completing the initial implementation of the Posterr API, there are a few areas that could be improved or expanded upon in the future. Some potential areas for improvement include:

- Improving the performance of the API, particularly the homepage and user profile page, which may become slow as the number of posts grows. This could be achieved through optimization of the database queries, caching, or other performance-enhancing techniques.
- Adding additional features, such as the ability to like or comment on posts, to provide a more robust and engaging social media experience.
- Enhancing the security of the API, potentially through the use of encryption or other security measures.
- Implementing a more robust authentication and authorization system, potentially through the use of JSON Web Tokens or other standards-based solutions.
- Expanding the API to support additional types of media, such as images or videos, to provide more flexibility for users in how they express themselves.
- Overall, the Posterr API is a simple but functional backend for a social media application, and has the potential for further development and improvement.