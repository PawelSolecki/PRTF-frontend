export default function LoginForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Username</label>
        <input type="text" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
