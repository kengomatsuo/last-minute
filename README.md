# Project Contribution Guide

## Cloning the Repository

To start contributing to this project, you need to clone the repository to your local machine. Follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command:
  ```sh
  git clone https://github.com/kengomatsuo/last-minute.git
  ```

## Installing Dependencies

After cloning the repository, you need to install the necessary dependencies. This project uses a package manager to handle dependencies. Follow these steps:

1. Navigate to the cloned repository directory:
  ```sh
  cd last-minute
  ```
2. Install the dependencies by running:
  ```sh
  npm install
  ```
  This command will read the `package.json` file and install all the required dependencies.

## Working with Branches

When contributing to the project, it's important to work on separate branches to keep the main codebase clean and organized. Follow these steps:

1. Create a new branch for your feature or bug fix:
  ```sh
  git checkout -b <branch-name>
  ```
  Replace `<branch-name>` with a descriptive name for your branch, such as `feature-login` or `bugfix-header`.

2. Make your changes and commit them to your branch:
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
