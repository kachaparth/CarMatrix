import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Card, Select, InputNumber, Typography, Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { vehicleService } from '../../services/vehicle.service';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { vehicleSchema } from './AddVehicle';
import type { VehicleFormValues } from './AddVehicle';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const EditVehicle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: vehicle, isLoading: isFetching } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleService.getById(Number(id)),
    enabled: !!id
  });

  const { control, handleSubmit, formState: { errors }, reset } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema)
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicle) {
      reset({
        make: vehicle.make,
        model: vehicle.model,
        category: vehicle.category as any,
        manufacturingYear: vehicle.manufacturingYear,
        price: vehicle.price,
        fuelType: vehicle.fuelType as any,
        transmissionType: vehicle.transmissionType as any,
        color: vehicle.color,
        description: vehicle.description || ''
      });
    }
  }, [vehicle, reset]);

  const onSubmit = async (data: VehicleFormValues) => {
    try {
      setLoading(true);
      await vehicleService.update(Number(id), data);
      queryClient.invalidateQueries({ queryKey: ['admin-vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicle', id] });
      toast.success('Vehicle updated successfully!');
      navigate('/admin/vehicles');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update vehicle');
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) return <div className="p-12 text-center text-slate-500 animate-pulse">Loading vehicle data...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button 
        type="text" 
        icon={<ArrowLeft size={16} />} 
        onClick={() => navigate('/admin/vehicles')}
        className="text-slate-500 hover:text-slate-800 -ml-4"
      >
        Back to Management
      </Button>

      <div className="flex justify-between items-center">
        <div>
          <Title level={2} className="mb-0 text-slate-800 dark:text-slate-100">Edit Vehicle</Title>
          <p className="text-slate-500 dark:text-slate-400">Update details for {vehicle?.make} {vehicle?.model}</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="shadow-sm border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden dark:bg-slate-800">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Make <span className="text-red-500">*</span></label>
                <Controller
                  name="make"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} size="large" status={errors.make ? 'error' : ''} />
                  )}
                />
                {errors.make && <p className="text-red-500 text-xs mt-1">{errors.make.message}</p>}
              </Col>
              
              <Col xs={24} md={12}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Model <span className="text-red-500">*</span></label>
                <Controller
                  name="model"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} size="large" status={errors.model ? 'error' : ''} />
                  )}
                />
                {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>}
              </Col>

              <Col xs={24} md={12}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category <span className="text-red-500">*</span></label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} size="large" className="w-full" status={errors.category ? 'error' : ''}>
                      {['HATCHBACK', 'SEDAN', 'SUV', 'MUV', 'COUPE', 'CONVERTIBLE', 'PICKUP', 'MINIVAN', 'WAGON', 'SPORTS', 'LUXURY', 'ELECTRIC'].map(c => (
                        <Option key={c} value={c}>{c}</Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </Col>

              <Col xs={24} md={12}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price (₹) <span className="text-red-500">*</span></label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <InputNumber {...field} size="large" className="w-full" min={0} status={errors.price ? 'error' : ''} />
                  )}
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
              </Col>

              <Col xs={24} md={8}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Year <span className="text-red-500">*</span></label>
                <Controller
                  name="manufacturingYear"
                  control={control}
                  render={({ field }) => (
                    <InputNumber {...field} size="large" className="w-full" min={1900} max={2100} status={errors.manufacturingYear ? 'error' : ''} />
                  )}
                />
                {errors.manufacturingYear && <p className="text-red-500 text-xs mt-1">{errors.manufacturingYear.message}</p>}
              </Col>

              <Col xs={24} md={8}>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type <span className="text-red-500">*</span></label>
                <Controller
                  name="fuelType"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} size="large" className="w-full" status={errors.fuelType ? 'error' : ''}>
                      {['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'CNG'].map(f => (
                        <Option key={f} value={f}>{f}</Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.fuelType && <p className="text-red-500 text-xs mt-1">{errors.fuelType.message}</p>}
              </Col>

              <Col xs={24} md={8}>
                <label className="block text-sm font-medium text-slate-700 mb-1">Transmission <span className="text-red-500">*</span></label>
                <Controller
                  name="transmissionType"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} size="large" className="w-full" status={errors.transmissionType ? 'error' : ''}>
                      <Option value="MANUAL">Manual</Option>
                      <Option value="AUTOMATIC">Automatic</Option>
                    </Select>
                  )}
                />
                {errors.transmissionType && <p className="text-red-500 text-xs mt-1">{errors.transmissionType.message}</p>}
              </Col>

              <Col xs={24} md={12}>
                <label className="block text-sm font-medium text-slate-700 mb-1">Color <span className="text-red-500">*</span></label>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} size="large" status={errors.color ? 'error' : ''} />
                  )}
                />
                {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color.message}</p>}
              </Col>

              <Col xs={24}>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextArea {...field} rows={4} size="large" />
                  )}
                />
              </Col>
            </Row>

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <Button size="large" onClick={() => navigate('/admin/vehicles')}>Cancel</Button>
              <Button type="primary" htmlType="submit" size="large" loading={loading} icon={<Save size={18} />} className="bg-cyan-600 hover:bg-cyan-700 shadow-md">
                Update Vehicle
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditVehicle;
