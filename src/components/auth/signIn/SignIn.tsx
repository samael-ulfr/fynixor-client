import { useState } from 'react';
import Joi from 'joi';
import { Eye, EyeOff } from 'lucide-react';
import { ThemeSwitcher } from '@/context/ThemeSwitcher';

export default function SignInCard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  // Joi schema
  const schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Please enter a valid email address.',
        'string.empty': 'Email is required.',
      }),
    password: Joi.string()
      .min(6)
      .pattern(/(?=.*[a-z])/)
      .pattern(/(?=.*[A-Z])/)
      .pattern(/(?=.*\d)/)
      .pattern(/(?=.*[@$!%*?&])/)
      .required()
      .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters.',
        'string.pattern.base':
          'Password must include uppercase, lowercase, number, and special character.',
      }),
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = schema.validate(
      { username, password },
      { abortEarly: false },
    );
    if (error) {
      const errorObj: typeof errors = {};
      error.details.forEach((err) => {
        const key = err.path[0] as 'username' | 'password';
        errorObj[key] = err.message;
      });
      setErrors(errorObj);
    } else {
      setErrors({});
      console.log('Login success:', { username, password });
    }
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-background transition-colors`}
    >
      <ThemeSwitcher />
      <div
        className={`w-full max-w-md rounded-xl bg-card/80 p-6 shadow-soft ring-1 ring-border backdrop-blur transition-colors sm:p-8`}
      >
        <h2 className="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          Sign In
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 text-sm text-muted-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="username"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.username ? 'border-red-500' : 'border-border'
              } transition-colors`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-sm text-muted-foreground"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.password ? 'border-red-500' : 'border-border'
              } transition-colors`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-foreground"
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
