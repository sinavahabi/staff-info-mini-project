Staff Information Management

Languages: JavaScript, HTML, CSS 

Topics: HTML events, Error handling, User interaction, User management, OOP, Form validation, Responsive website, Responsive design, Bootstrap5, Font awesome, Regex, Git


"""Notice that the main page is "login.html" file for user to begin with."""
First of all, I got to say this project meant to be a very small and, minimal project which will only serve its main purpose as it is in "index.html" file but, after a while I made a decision to add login/sign-up form to this project as well.
So, let's begin a summarized description for this mini project and, start with "login.html" file. Basically, this is where users will start their experience with this website.
At the beginning, if they previously used our website and, signed-up their information here, they can easily insert their data such as username, email and, password to login. Otherwise, they can easily click on create account option and, redirect to "sign-up.html" page which we will discuss about it soon.
In "login.html" page, I only used password match-making validation to make sure users are entering their essential information correctly with high accuracy. If they fill all three inputs correctly, they will be redirected to "index.html" page by a successful respond message. The success login message response will only last 1.5sec before they are redirected.
But if they don't enter the information correctly and, accurate as they have to, program will respond with an error message that informs username, password or email is incorrect and, login process will not happen until they enter valid and, correct information which they used when they first used for sign-up.
Also note that some noticeable styles are added to make everything look a little bit more attractive than it is on other pages.
Second page which users will be redirected to is "sign-up.html" page which is the main part where most of the form validations and, error handling is happening. After users asked for redirection in order to create new accounts and, save their information they will face this page which is a little bit more restrictive on (wrong) user actions.
Here user have to fill form inputs carefully because program acts very accurate about each specific input validation. There's a lot to explain about this page but if I want to have a short description of mentioned form validation, first name and last name input validations are same as each other.
Email validation is simple and, exact as much as it is possible using ReGex, username validation is also very restrictive as well and, in the end password validation has a common validation which was fully handled by ReGex as same as email validation. Alternatively, all form inputs will check if their field is empty or what.
All input fields will respond with a proper error message that is attached to the top of each element with a good appearance. Sign-up button is the last place where users will get caught if they try to skip and, avoid form input errors.
Every time they try to sign-up with invalid and, incorrect information program will show another error at the top of the main page and, stops them from leaving inputs with invalid information behind. This will also lead to automatic focus on the input element with invalid information that gave an error message to user.
The method to match saved information on sign-up form with login form is simple. This action was handled with "localStorage" method on client’s browser. This storage is small and, will store data on client side. Saved data will remain on user browser even if user refreshes the page or closes the browser.
There is no usage of node JS, JSON or Database connection in this project and, I decided to handle all parts, especially saving and, validating data fully on client side. Maybe one day this project contains these updates!   
At the bottom of this page there are three other buttons such as sign-in option which will redirect users back to "login.html" page, need help button that can redirect them to "help.html" page which contains more information about how this project works and, other projects done by author, and last one is clear form button that clears all input values all at once.
You can pay an attention to show password check box below form field that helps users to see and, check their password value. This option is used on "login.html" form too but it's more attractive and, styled in here.
I need to mention the forgot password option on "login.html" file as well. By using this option users will be redirected to "reset-pass.html" page. It's a very simple page with a small form validator that is written with OOP model just like the one used in "sign-up.html" file.
In "reset-pass.html" page users need to enter their email to receive a link to reset and, change their password associated with it. As I said the only validation that happens here is email validation and, email match-making as well. Basically, this email has to be the same one user saved when sign-up happened.
Just like the other pages, corresponding actions will occur when users commit correct or incorrect actions on input element or submit button.
Last and, final page which was the first and, main purpose of this mini project is "index.html" file. Here user is assumed to be a job employer that hires and, manages programmers as his/her staff. At the beginning, user can add a new table to insert new data about his/her staff.
This data includes information about staff (programmers) name, last name, age, gender, work history, their expert and, etc. Users can easily save, edit or clear each input field whenever they want to.
All tables and, rows can be deleted easily without dependency to each other. Just notice that if user asks to add a new row when there is not a recent table to attach the new row to it, program will respond with an error message and forbids this action. Finally, users are able to save inserted data on the table when their job is done.
Soon there will be an update which include responsive website design for all pages.
There isn't much to say about the "help.html" file, except that it's shared on all web-based projects and, contains information and description related to mentioned project and, references to the other projects I did.
Note: This mini project was completely handled by git.
Note: Codes documentation and descriptions are more obvious in comments among the codes on each file.¬
