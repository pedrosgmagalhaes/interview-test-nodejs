import requests

# Test the /test route
def test_test_route():
  # Send a GET request to the /test route
  response = requests.get('http://localhost:3000/api/homepage/test')

  # Check that the response has a 200 status code and contains the expected "Working" message
  assert response.status_code == 200
  assert response.text == "Working"

# Test the /getFeeds route
def test_get_feeds_route():
  # Send a GET request to the /getFeeds route
  response = requests.get('http://localhost:3000/api/homepage/getFeeds')

  # Check that the response has a 200 status code and contains an array of posts
  assert response.status_code == 200
  assert isinstance(response.json(), list)

# Test the /createPost route
def test_create_post_route():
  # Send a POST request to the /createPost route with some sample data
  response = requests.post('http://localhost:3000/api/homepage/createPost', json={
    'content': 'Test post',
    'user': 'testuser',
    'type': 'text'
  })

  # Check that the response has a 200 status code and contains the newly created post
