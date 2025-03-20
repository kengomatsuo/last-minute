# Pull Request Description Instructions

## Guidelines for Writing Pull Request Descriptions

### 1. Provide a Clear and Descriptive Title
- **Limit**: 50 characters or less
- **Style**: Capitalize the first letter
- **Example**: `Add user authentication feature`

### 2. Detailed Description
- **Explain**: What, Why, and How
- **Include**: Any relevant context or background information
- **Example**:
    ```
    This pull request adds the user authentication feature.

    - Implemented login and registration forms
    - Added JWT token generation and validation
    - Updated user model to include authentication fields
    - Ensured compatibility with existing user data

    This feature enhances security by allowing users to authenticate
    before accessing restricted areas of the application.
    ```

### 3. Reference Issues and Related Pull Requests
- **Format**: `Fixes #123`, `Closes #456`
- **Example**: `Fixes #789`

### 4. Include Screenshots or GIFs (if applicable)
- **Example**:
    ```
    ![Login Form](url-to-screenshot)
    ```

### 5. Testing Instructions
- **Detail**: Steps to test the changes
- **Example**:
    ```
    1. Navigate to the login page
    2. Enter valid credentials and submit
    3. Verify that the user is redirected to the dashboard
    ```

### 6. Additional Notes
- **Include**: Any additional information that reviewers should be aware of
- **Example**:
    ```
    Note: This pull request depends on #456 being merged first.
    ```

Follow these guidelines to ensure your pull request descriptions are clear, informative, and helpful for everyone involved in the project. Happy coding! 🚀
