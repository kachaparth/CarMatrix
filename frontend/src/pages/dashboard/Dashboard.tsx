
import { Card, Statistic, Row, Col, Typography } from 'antd';
import { Car, IndianRupee, ListOrdered, TrendingUp } from 'lucide-react';
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
        <Title level={2} className="mb-0 text-primary">Dashboard</Title>
        <p className="text-secondary">Welcome to your CarMatrix overview</p>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-none border-divider hover:shadow-none transition-shadow bg-surface">
            <Statistic 
              title="Total Models" 
              value={totalVehicles} 
              prefix={<Car className="text-brand mr-2" size={20} />}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-none border-divider hover:shadow-none transition-shadow bg-surface">
            <Statistic 
              title="Total Stock Units" 
              value={totalStock} 
              prefix={<ListOrdered className="text-emerald-600 mr-2" size={20} />}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-none border-divider hover:shadow-none transition-shadow bg-surface">
            <Statistic 
              title="Total Inventory Value" 
              value={totalValue} 
              prefix={<IndianRupee className="text-teal-500 mr-2" size={20} />}
              precision={2}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-none border-divider hover:shadow-none transition-shadow bg-surface">
            <Statistic 
              title="Active Categories" 
              value={new Set(vehicles?.map(v => v.category)).size} 
              prefix={<TrendingUp className="text-purple-500 mr-2" size={20} />}
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>

      <div className="bg-surface p-6 rounded-2xl shadow-none border border-divider mt-6">
        <Title level={4} className="text-primary">Recent Activity Placeholder</Title>
        <div className="h-48 flex items-center justify-center text-secondary dark:text-secondary bg-canvas/50 rounded-lg border border-dashed border-divider">
          Chart or Activity Feed goes here
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
