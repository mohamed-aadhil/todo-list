Task Manager

A simple task management application that allows users to add, edit, delete, search, filter, and sort tasks. The application uses the browser's local storage to persist tasks even after refreshing the page.

Features

Add Tasks: Users can add tasks with a name, description, and due date.

Edit Tasks: Edit task details directly within the table.

Delete Tasks: Remove tasks permanently.

Change Status: Toggle between "Pending" and "Completed".

Search Tasks: Find tasks by name.

Filter Tasks: View all, pending, or completed tasks.

Sort Tasks: Sort tasks by due date.

Dark Theme: Modern dark-themed UI.

Technologies Used

HTML: Structure of the application.

CSS: Styling and layout (dark theme).

JavaScript: Handles logic, interactivity, and local storage management.

Installation & Usage

Clone the repository:

git clone https://github.com/your-username/task-manager.git

Open index.html in a browser.

Start adding tasks and managing them!

File Structure

📁 Task Manager
│── index.html       # Main HTML file
│── style.css        # CSS file for styling (included within index.html)
│── script.js        # JavaScript file (included within index.html)

Local Storage

Tasks are stored in the browser's localStorage as an array of objects.

The tasks persist even after the page is refreshed.
