import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Card } from 'antd';
import { motion } from 'framer-motion';
import { Car, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const res = await authService.login(data);
      login(res.token, { email: res.email, role: res.role as 'CUSTOMER' | 'ADMIN' });
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 overflow-hidden rounded-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
              <Car className="w-8 h-8 text-cyan-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
            <p className="text-slate-500 mt-2">Sign in to manage your dealership</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field} 
                    size="large" 
                    prefix={<Mail className="w-4 h-4 text-slate-400 mr-2" />} 
                    placeholder="Enter your email"
                    status={errors.email ? 'error' : ''}
                  />
                )}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password 
                    {...field} 
                    size="large" 
                    prefix={<Lock className="w-4 h-4 text-slate-400 mr-2" />} 
                    placeholder="Enter your password"
                    status={errors.password ? 'error' : ''}
                  />
                )}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full h-12 text-base font-semibold shadow-md shadow-cyan-200"
              loading={loading}
            >
              Sign In
            </Button>

            <div className="text-center text-sm text-slate-500 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-cyan-600 font-semibold hover:text-cyan-700">
                Register here
              </Link>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
