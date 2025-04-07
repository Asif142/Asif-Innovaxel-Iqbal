# Asif-Innovaxel-Iqbal
A simple RESTful API that allows users to shorten long URLs.
You will be able to shorten a long URL using the code.
You can do following actions:
1.write the long URL then you can get the short URL.
2.You can update the existing URL.
3.You can delete the URL.
4.You can get the long URL by writing the short URL etc.

## Table of Contents
Installation:
# Connecting to MongoDB.
You need to start the mongo server by running the  'mongod' command in the terminal and after that start the mongoDB compass desktop appliction (before these commands consider downloading the mongoDB in your machine).
# Connecting to Node.js server:
In the file directory of the code that you have to open in the editor, you need to run the following command in the terminal in order to connect with the node.js server the command is'node server.js' 
You should see a message in the terminal indicating that the server is running. like  (Server is running on http://localhost:3000).
** Now both servers are on and you can test the code on Postman application from google.**

***  Also here is the link to the postman application: https://www.postman.com/postman/postman-team-collections/request/ii8syuh/using-json-request-body  *** 

# How to use postman application: here is the step by step guide:

***.Go to google chrome and search for Postman application and after that install the postman agent for your desktop to get engage with the appliction.***


## 2.Create Short URL ##
Create a New Request:

Click on the + button to open a new tab in the postman application.
Set the Request Type: Change the request type to POST from the dropdown menu.

Enter the URL: In the URL field, enter: http://localhost:3000/shorten

3.Set the Request Body:

Click on the Body tab below the URL field.
Select raw and then choose JSON from the dropdown on the right.
Enter the following JSON in the text area:


{
    "url": "https://www.example.com/some/long/url"
}

4. Send the Request: Click the Send button.
5. Check the Response: You should receive a response with a status code of 201 Created and it will look like 
{
    "id": "1",
    "url": "https://www.example.com/some/long/url",
    "shortCode": "abc123",
    "createdAt": "2021-09-01T12:00:00Z",
    "updatedAt": "2021-09-01T12:00:00Z"
}


## Now to Retrieve Original URL ##
Create a New Request:

Open a new tab in Postman.
Set the Request Type: Change the request type to GET.

Enter the URL: In the URL field, enter: http://localhost:3000/shorten/abc123
(Replace abc123 with the actual short code returned from the previous step.)

Send the Request: Click the Send button.

Check the Response: You should receive a response with a status code of 200 OK and a JSON object containing the original URL, like this:
{
    "id": "1",
    "url": "https://www.example.com/some/long/url",
    "shortCode": "abc123",
    "createdAt": "2021-09-01T12:00:00Z",
    "updatedAt": "2021-09-01T12:00:00Z"
}
## Now Update URL ##
Create a New Request:

Open a new tab in Postman.
Set the Request Type: Change the request type to PUT.

Enter the URL: In the URL field, enter: http://localhost:3000/shorten/abc123
(Again, replace abc123 with the actual short code.)

Set the Request Body:

Click on the Body tab.
Select raw and then choose JSON.
Enter the following JSON:
{
    "url": "https://www.example.com/some/updated/url"
}

Send the Request: Click the Send button.

Check the Response: You should receive a response with a status code of 200 OK and a JSON object containing the updated URL.

## Now to  Delete Short URL ##
Create a New Request:

Open a new tab in Postman.
Set the Request Type: Change the request type to DELETE.

Enter the URL: In the URL field, enter: http://localhost:3000/shorten/abc123
(replace abc123 with the actual short code.)
Send the Request:

Click the "Send" button to send the DELETE request to your server.
Check the Response:

After sending the request, check the response section below. You should see a response indicating whether the deletion was successful or if the short URL was not found.
A successful deletion might return a response like:
{
    "message": "Short URL not found"
}

                                    *** GOOD LUCK :) ***