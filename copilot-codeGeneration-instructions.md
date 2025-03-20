# Copilot Code Generation Instructions

## Coding Standards
- Use single quotes for strings.
- Do not use semicolons.
- Avoid unused imports.

## Code Formatting
- Indentation: Use 2 spaces.
- Line Length: Limit lines to 80 characters.
- Braces: Always use braces for control structures.
- Spacing: Add a space after keywords (e.g., `if (condition) {`).

## Naming Conventions
- Variables: Use camelCase for variables and functions.
- Constants: Use UPPER_CASE for constants.
- Classes: Use PascalCase for class names.

## Error Handling
- Always handle errors gracefully.
- Use try-catch blocks where appropriate.
- Log errors with meaningful messages.

## Testing
- Write unit tests for all functions and components.
- Use descriptive names for test cases.
- Ensure tests cover edge cases and potential failures.


## Documentation
- Document every component, hook, and function using JSDoc.
- Always add choices for JSDoc if a parameter or prop has options.

## JSDoc Examples

### Component Documentation
```jsx
/**
 * Component description here.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the component
 * @param {'text' | 'password' | 'email' | 'number'} props.type - The type of input
 * @returns {JSX.Element} The rendered component
 */
const MyComponent = ({ title, type }) => {
  // ...existing code...
}
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number']).isRequired,
}
```

### Hook Documentation
```jsx
/**
 * Hook description here.
 *
 * @param {number} initialCount - Initial count value
 * @returns {[number, function]} The current count and a function to update it
 */
const useCounter = (initialCount) => {
  // ...existing code...
  return [count, setCount]
}
```

### Function Documentation
```jsx
/**
 * Function description here.
 *
 * @param {string} name - The name of the user
 * @param {number} age - The age of the user
 * @returns {string} A greeting message
 */
const greetUser = (name, age) => {
  // ...existing code...
  return `Hello, ${name}. You are ${age} years old.`
}
```
