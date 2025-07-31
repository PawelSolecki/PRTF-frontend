import { useInput } from "../../hooks/useInput";
import { isEmail, isNotEmpty } from "../../utils/validation";
import Input from "../UI/Input";

export default function LoginForm({ onSubmit }) {
  const {
    value: email,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", isEmail);

  const {
    value: password,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", isNotEmpty);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if form is valid before submitting
    if (
      emailHasError ||
      passwordHasError ||
      !isEmail(email) ||
      !isNotEmpty(password)
    ) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    onSubmit(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Zaloguj się do konta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Wprowadź swoje dane logowania
          </p>
        </div>
        <form
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            error={emailHasError ? "Wprowadź poprawny adres email" : ""}
            placeholder="Wprowadź swój email"
            required
          />

          <Input
            label="Hasło"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            error={passwordHasError ? "Hasło nie może być puste" : ""}
            placeholder="Wprowadź swoje hasło"
            required
          />

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            disabled={emailHasError || passwordHasError}
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
}
