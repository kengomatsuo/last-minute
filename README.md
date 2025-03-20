# Project Contribution Guide

> **Note for Beginners**: This guide will help you contribute to our project even if you're completely new to GitHub, React, or web development. We've included extra explanations to help you understand each step.

## What is This Project?

This is a web development project built with React, a popular JavaScript library for building user interfaces. If you're new to web development, don't worry! You'll gradually learn as you contribute.

## What is GitHub?

GitHub is a platform where developers store their code and collaborate with others. Git is the tool that tracks changes to your code files (like a super-advanced version history).

## Cloning the Repository

"Cloning a repository" means downloading the project files to your computer. Follow these steps:

1. Open your terminal or command prompt.
   - **Windows**: Search for "Command Prompt" or "PowerShell" in the start menu
   - **Mac**: Open the "Terminal" app from Applications > Utilities
   - **Linux**: Use your terminal application

2. Navigate to the directory where you want to clone the repository.
   ```sh
   # For example, to navigate to your Documents folder
   cd Documents
   ```
   (The `cd` command stands for "change directory" - it's how you move between folders in the terminal)

3. Run the following command:
   ```sh
   git clone https://github.com/kengomatsuo/last-minute.git
   ```
   This downloads all project files to your computer. If you see an error about Git not being found, you'll need to [install Git](https://git-scm.com/downloads) first.

## Installing Dependencies

A web project uses many external code libraries called "dependencies." We use a tool called npm (Node Package Manager) to install them:

1. First, you need to have Node.js and npm installed on your computer.
   - Download and install from [nodejs.org](https://nodejs.org/)
   - After installation, verify it worked by typing `node -v` and `npm -v` in your terminal. These commands should display version numbers.

2. Navigate to the cloned repository directory:
   ```sh
   cd last-minute
   ```

3. Install the dependencies by running:
   ```sh
   npm install
   ```
   This might take a few minutes as it downloads all necessary files. You'll see a progress bar and eventually a completion message.
   
   > **Common Error**: If you see "npm not found", make sure you've installed Node.js correctly.

## Working with Branches

In Git, "branches" are like parallel versions of the code. The main branch usually contains the stable version, while development happens in separate branches.

When contributing to the project, it's important to work on separate branches to keep the main codebase clean and organized. Here's how:

1. Make sure you're in the project directory:
   ```sh
   cd last-minute
   ```

2. Create a new branch for your feature or bug fix:
   ```sh
   git checkout -b your-branch-name
   ```
   Replace `your-branch-name` with something descriptive like `add-login-button` or `fix-spelling-error`.
   
   > **What this does**: This creates a new branch and switches to it. It's like creating your own separate workspace where you can make changes without affecting the main code.

3. Make your changes and commit them to your branch:
   ```sh
   git add .
   git commit -m "Description of your changes"
   ```

## Making Commits

Commits are snapshots of your code changes. It's important to make meaningful and descriptive commits. Follow these guidelines:

1. Make small, incremental changes and commit them frequently.
2. Write clear and concise commit messages that describe the changes you made.

## Creating Pull Requests

Once you have completed your changes and committed them to your branch, you need to create a pull request to merge your changes into the main codebase. Follow these steps:

1. Push your branch to the remote repository:
   ```sh
   git push origin <branch-name>
   ```
2. Go to the repository on GitHub.
3. Click on the "Pull requests" tab.
4. Click the "New pull request" button.
5. Select your branch from the dropdown menu.
6. Add a title and description for your pull request.
7. Click the "Create pull request" button.

Your pull request will be reviewed by your groupmates, and once approved, it will be merged into the main codebase.

By following these steps, you can effectively contribute to the project and collaborate with your team. Happy coding :)
