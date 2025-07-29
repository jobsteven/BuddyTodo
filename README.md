# FunnyTodos

A modern, secured todo application built with React Native to help you manage your tasks efficiently with biometric authentication.

## 🚀 Features

- **📝 Task Management**: Create, edit, delete, and mark todos as complete
- **🔐 Biometric Authentication**: Secure your todos with fingerprint/face recognition
- **🎨 Modern UI**: Clean and intuitive interface with smooth animations
- **📱 Cross-Platform**: Works on both iOS and Android

## 🏗️ Architecture

### Tech Stack
- **Framework**: React Native 0.74.5
- **Language**: TypeScript
- **State Management**: Zustand
- **Authentication**: Expo Local Authentication
- **Package Manager**: pnpm
- **Development**: Expo SDK 51

### Project Structure
```
FunnyTodos/
├── components/          # Reusable UI components
│   ├── AddTodoButton.tsx    # Floating action button
│   ├── TodoEditModal.tsx    # Modal for adding/editing todos
│   └── TodoItem.tsx         # Individual todo item component
├── pages/              # Screen components
│   ├── Todos.tsx           # Main todos list screen
│   ├── NotFound.tsx        # 404 error page
│   └── routes.tsx          # Route configuration
├── stores/             # State management
│   └── useAppStore.tsx     # Zustand store with authentication
├── utils.ts            # Utility functions
├── App.tsx             # Root application component
└── package.json        # Dependencies and scripts
```



## 🔧 Installation & Setup

### Prerequisites
- Node.js >= 18
- pnpm package manager
- React Native development environment
- iOS Simulator or Android Emulator

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FunnyTodos
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm start
   ```

4. **Run on iOS**
   ```bash
   pnpm ios
   ```

5. **Run on Android**
   ```bash
   pnpm android
   ```

## 🎯 Core Features Explained

### 1. Biometric Authentication
- Uses `expo-local-authentication` for secure biometric verification
- Required for all todo operations (create, edit, delete, toggle)
- Falls back gracefully if biometric hardware is unavailable

### 2. Todo Management
- **Create**: Tap + button → Enter title → Biometric auth → Save
- **Edit**: Tap edit on incomplete todo → Modify title → Biometric auth → Save
- **Delete**: Tap delete → Confirm dialog → Biometric auth → Remove
- **Toggle**: Tap done/undo → Biometric auth → Toggle completion status

### 3. Smart UI Features
- **Auto-scroll**: New todos appear at the top with smooth scrolling
- **Smart sorting**: Completed todos automatically move to bottom
- **Modal persistence**: Unsaved changes trigger confirmation dialog
- **Responsive design**: Adapts to different screen sizes

### 4. State Management Logic
```typescript
// Example of authorized operation flow
const addTodoAuthorized = async (todo: Todo) => {
    const authorized = await get().needAuthorized()  // Biometric check
    if (!authorized) return                          // Exit if failed
    get().addTodo(todo)                             // Proceed with operation
}
```

## 🛠️ Development

### Available Scripts
- `pnpm start` - Start Metro bundler
- `pnpm ios` - Run on iOS simulator
- `pnpm android` - Run on Android emulator
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Jest tests

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Functional components with hooks

### Key Components

#### `useAppStore.tsx`
Central state management with:
- Todo CRUD operations
- Biometric authentication
- UI state management
- Authorization wrapper functions

#### `TodoEditModal.tsx`
Modal component for adding/editing todos with:
- Keyboard-aware input handling
- Unsaved changes protection
- Platform-specific behavior

#### `TodoItem.tsx`
Individual todo item with:
- Action buttons (Done, Edit, Delete)
- Conditional rendering based on completion status
- Confirmation dialogs for destructive actions

## 🔒 Security Features

- **Biometric Authentication**: All todo operations require biometric verification
- **Secure Storage**: Authentication state managed securely
- **Graceful Degradation**: App works even without biometric hardware
- **User Confirmation**: Destructive actions require explicit confirmation

## 📱 Platform Support

- **iOS**: Full support with biometric authentication
- **Android**: Full support with biometric authentication
- **Development**: Hot reloading and debugging support

## 🚀 Performance Optimizations

- **Memoization**: Components use React.memo for performance
- **Efficient Rendering**: FlatList for large todo lists
- **State Optimization**: Zustand's selective subscriptions
- **Bundle Optimization**: Tree shaking and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React Native and Expo**
