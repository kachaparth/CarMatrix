import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Card } from 'antd';
import { motion } from 'framer-motion';
import { Car, Lock, Mail, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../services/auth.service';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      // Omit confirmPassword from the payload
      const { confirmPassword, ...payload } = data;
      await authService.register(payload);
      toast.success('Registration successful! Please sign in.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 py-12 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 overflow-hidden rounded-2xl dark:bg-slate-800">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
              <Car className="w-8 h-8 text-indigo-600 dark:text-indigo-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Create an Account</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Join CarMatrix Dealership Platform</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      size="large" 
                      prefix={<UserIcon className="w-4 h-4 text-slate-400 mr-2" />} 
                      placeholder="First Name"
                      status={errors.firstName ? 'error' : ''}
                    />
                  )}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      size="large" 
                      prefix={<UserIcon className="w-4 h-4 text-slate-400 mr-2" />} 
                      placeholder="Last Name"
                      status={errors.lastName ? 'error' : ''}
                    />
                  )}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
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
                    placeholder="Create a password"
                    status={errors.password ? 'error' : ''}
                  />
                )}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password 
                    {...field} 
                    size="large" 
                    prefix={<Lock className="w-4 h-4 text-slate-400 mr-2" />} 
                    placeholder="Confirm your password"
                    status={errors.confirmPassword ? 'error' : ''}
                  />
                )}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full h-12 text-base font-semibold shadow-md shadow-indigo-200 mt-2"
              loading={loading}
            >
              Register
            </Button>

            <div className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">
                Sign in
              </Link>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
