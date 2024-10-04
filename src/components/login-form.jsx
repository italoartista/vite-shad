  import { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  
  import { Button } from '@/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  
  export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', general: '' });
    const navigate = useNavigate();
  
    const validate = () => {
      let valid = true;
      let errors = { email: '', password: '', general: '' };
  
      if (!email) {
        errors.email = 'Email is required';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email address is invalid';
        valid = false;
      }
  
      if (!password) {
        errors.password = 'Password is required';
        valid = false;
      } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        valid = false;
      }
  
      setErrors(errors);
      return valid;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validate()) {
        try {
          const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
  
          if (!response.ok) {
            if (response.status === 401) {
              setErrors(prevErrors => ({ ...prevErrors, general: 'Invalid email or password' }));
            }
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          const token = data.token;
          
          // Armazene o token JWT no localStorage
          localStorage.setItem('jwtToken', token);
  
          // Limpe os formulários
          setEmail('');
          setPassword('');
  
          // Exiba o token no console
          console.log('Token:', token);
  
          // Redirecione para a rota protegida
          navigate('/dashboard');
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
    };
  
    return (
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }