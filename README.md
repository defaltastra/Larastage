

# Intern Management System

This project is an **Intern Management System** built using **React** for the frontend and **Laravel** for the backend. The system allows interns to register, log in, and manage their profiles. It uses **Sanctum** for token-based authentication and **CSRF protection** to ensure secure API requests.

## 📋 Features

- **Intern Login**: Interns can log in using their credentials.
- **Intern Registration**: Interns can register their profile with details such as name, email, password, and CV.
- **Dashboard**: Interns can access their dashboard once logged in.
- **Forgot Password**: Option to reset passwords for users who forget them.
- **Profile Management**: Interns can view and update their profiles.

## 🚀 Tech Stack

- **Frontend**: React.js
- **Backend**: Laravel (PHP)
- **Database**: MySQL
- **State Management**: React `useState` and `useContext`
- **UI Framework**: Tailwind CSS
- **Icons**: Lucide Icons

## 🛠️ Installation

### Backend (Laravel)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Larastage.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   composer install
   ```

4. Set up the `.env` file:
   ```bash
   cp .env.example .env
   ```

5. Generate the application key:
   ```bash
   php artisan key:generate
   ```

6. Run the migrations:
   ```bash
   php artisan migrate
   ```

7. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```

The frontend will be accessible at `http://localhost:3000` and the backend API at `http://127.0.0.1:8000`.

## 📝 Contributing

We welcome contributions! If you'd like to contribute, please fork the repository and create a pull request with your changes.



## 💬 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Thanks for Contributions

We want to give special thanks to **[Ayaaaziz12](https://github.com/Ayaaaziz12)** for contributing to the project! Your support and contributions are highly appreciated! 🎉👏
