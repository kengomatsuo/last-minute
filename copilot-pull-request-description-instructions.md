# 📄 Pull Request Description Instructions

## 📝 Guidelines for Writing Pull Request Descriptions

### 1. 🏷️ Provide a Clear and Descriptive Title
- **Limit**: 50 characters or less
- **Style**: Capitalize the first letter
- **Format**: `<Type>: <Short description>` (e.g., `Feature:`, `Fix:`, `Refactor:`)
- **Example**: `Feature: Add user authentication system`

### 2. 📋 Detailed Description
- **Structure your description with these sections:**
  - **What**: Specifically what changes were made (be concrete, do not leave any behind)
  - **Why**: The specific problem these changes solve
  - **How**: The technical approach used to implement the solution
- **Be specific**: Never use vague terms like "enhanced," "improved," "refactored," "optimized"
- **Use bullet points** for better readability
- **Include**: Measurable impacts where possible (e.g., "reduced load time by 30%")
- **Document all new code elements**: Always mention all newly added props, functions, hooks, components, etc. and include examples of how to use them
- **Example**:
    ```
    ## 🔍 What
    This pull request adds a user authentication feature.

    - Created login and registration forms with field validation
    - Built JWT token generation and validation endpoints
    - Added password hashing with bcrypt (10 salt rounds)
    - Added remember-me functionality with 30-day token expiration
    
    ### New Components/Functions/Hooks:
    
    #### useAuth() Hook
    ```jsx
    // Returns authentication state and methods
    const { user, login, logout, register } = useAuth();
    ```
    
    #### <ProtectedRoute> Component
    ```jsx
    // Redirects to login if user is not authenticated
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
    ```
    ```

### 3. 🔗 Reference Issues and Related Pull Requests
- **Format**: Use keywords like `Fixes #123`, `Closes #456`, `Related to #789`
- **Link multiple issues**: `Fixes #123, #456, #789`
- **Reference external issues**: `Fixes organization/repo#123`
- **Example**: 
    ```
    🐛 Fixes #789
    📌 Related to #456
    ```

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
