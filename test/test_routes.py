import requests
import random
import string

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
    # Generate a random string to use as the username
    import random
    import string
    random_username = ''.join(random.choice(
        string.ascii_letters + string.digits) for _ in range(8))

    # Send a POST request to the /createPost route with some sample data
    response = requests.post('http://localhost:3000/api/homepage/createPost', json={
        'content': 'Test post',
        'user': random_username,
        'type': 'original'
    })

    # Check that the response has a 200 status code and contains the newly created post
    assert response.status_code == 200
    expected_response = response.json()
    expected_response['content'] = 'Test post'
    expected_response['user'] = random_username
    expected_response['type'] = 'original'
    assert response.json() == expected_response

# Test the /addUser route


def test_add_user_route():
    # Generate a random string to use as the username
    random_username = ''.join(random.choice(
        string.ascii_letters + string.digits) for _ in range(8))

    # Send a POST request to the /addUser route with a sample user object
    response = requests.post('http://localhost:3000/api/profile/addUser', json={
        'username': random_username,
    })

    # Check that the response has a 200 status code and contains the expected message
    assert response.status_code == 200
    assert response.text == "User added successfully"

# Test the /getUsers route


def test_get_users_route():
    # Send a GET request to the /getUsers route with a sample username parameter
    response = requests.get(
        'http://localhost:3000/api/profile/getUsers?username=testuser')

    # Check that the response has a 200 status code and contains the expected user data and posts
    assert response.status_code == 200
    response_data = response.json()
    assert 'user' in response_data
    assert 'username' in response_data['user']
    assert response_data['user']['username'] == 'testuser'
    assert 'dateJoined' in response_data['user']
    assert 'postCount' in response_data['user']
    assert 'posts' in response_data
    assert isinstance(response_data['posts'], list)
