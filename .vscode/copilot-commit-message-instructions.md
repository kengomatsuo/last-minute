# Commit Message Instructions

## Guidelines for Writing Commit Messages

### 1. Use a Clear and Descriptive Title
- **Limit**: 50 characters or less
- **Style**: Capitalize the first letter
- **Example**: `Add user authentication feature`

### 2. Separate Title from Body with a Blank Line

### 3. Detailed Description in the Body
- **Explain**: What, Why, and How
- **Wrap**: Lines at 72 characters
- **Example**:
    ```
    Add user authentication feature

    - Implemented login and registration forms
    - Added JWT token generation and validation
    - Updated user model to include authentication fields
    - Ensured compatibility with existing user data

    This feature enhances security by allowing users to authenticate
    before accessing restricted areas of the application.
    ```

### 4. Use Bullet Points for Multiple Changes
- **Example**:
    ```
    - Refactor codebase for better readability
    - Fix bug in user profile update
    - Improve performance of data fetching
    ```

### 5. Reference Issues and Pull Requests
- **Format**: `Fixes #123`, `Closes #456`
- **Example**: `Fixes #789`

### 6. Use Emojis to Highlight Key Points
- **Examples**:
    - ✨ New feature: `✨ Add dark mode support`
    - 🐛 Bug fix: `🐛 Fix crash on startup`
    - 📝 Documentation: `📝 Update README with setup instructions`
    - 🔧 Refactoring: `🔧 Refactor user service for better performance`
    - 🚀 Performance: `🚀 Improve loading time of dashboard`

### 7. Keep It Professional and Concise

## Example Commit Message

```
✨ Add user authentication feature

- Implemented login and registration forms
- Added JWT token generation and validation
- Updated user model to include authentication fields
- Ensured compatibility with existing user data

This feature enhances security by allowing users to authenticate
before accessing restricted areas of the application.

Fixes #123
```

Follow these guidelines to ensure your commit messages are clear, informative, and helpful for everyone involved in the project. Happy coding! 🚀