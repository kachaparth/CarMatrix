import React from 'react';
import { Card, Statistic, Row, Col, Typography } from 'antd';
import { Car, DollarSign, ListOrdered, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicle.service';

const { Title } = Typography;

const Dashboard = () => {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: vehicleService.getAll
  });

  const totalVehicles = vehicles?.length || 0;
  const totalStock = vehicles?.reduce((acc, curr) => acc + (curr.availableStock || 0), 0) || 0;
  const totalValue = vehicles?.reduce((acc, curr) => acc + (curr.price * (curr.availableStock || 0)), 0) || 0;

  return (
    <div className="space-y-6">
      <div>
        <Title level={2} className="mb-0 text-slate-800">Dashboard</Title>
        <p className="text-slate-500">Welcome to your CarMatrix overview</p>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-slate-100 hover:shadow-md transition-shadow">
            <Statistic 
              title="Total Models" 
              value={totalVehicles} 
              prefix={<Car className="text-cyan-600 mr-2" size={20} />}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-slate-100 hover:shadow-md transition-shadow">
            <Statistic 
              title="Total Stock Units" 
              value={totalStock} 
              prefix={<ListOrdered className="text-orange-500 mr-2" size={20} />}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-slate-100 hover:shadow-md transition-shadow">
            <Statistic 
              title="Total Inventory Value" 
              value={totalValue} 
              prefix={<DollarSign className="text-teal-500 mr-2" size={20} />}
              precision={2}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-slate-100 hover:shadow-md transition-shadow">
            <Statistic 
              title="Active Categories" 
              value={new Set(vehicles?.map(v => v.category)).size} 
              prefix={<TrendingUp className="text-purple-500 mr-2" size={20} />}
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-6">
        <Title level={4}>Recent Activity Placeholder</Title>
        <div className="h-48 flex items-center justify-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
          Chart or Activity Feed goes here
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
