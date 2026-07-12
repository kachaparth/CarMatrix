import { useState } from 'react';
import { Card, Input, Select, Button, Row, Col, Typography, Tag, Empty, Skeleton } from 'antd';
import { Search, Filter, ShoppingCart, Info, Car } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicle.service';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;
const { Option } = Select;

const VehicleListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles', searchTerm, category],
    queryFn: () => vehicleService.search({ make: searchTerm || undefined, category: category || undefined })
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title level={2} className="mb-0 text-slate-800 dark:text-slate-100">Vehicle Inventory</Title>
          <p className="text-slate-500 dark:text-slate-400">Browse and manage available vehicles</p>
        </div>
      </div>

      <Card className="shadow-sm border-slate-100 dark:border-slate-800 dark:bg-slate-800">
        <div className="flex flex-col md:flex-row gap-4">
          <Input 
            placeholder="Search by make..." 
            prefix={<Search className="text-slate-400 w-4 h-4" />}
            className="flex-1"
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select 
            placeholder="Category" 
            size="large" 
            className="w-full md:w-48"
            allowClear
            value={category}
            onChange={setCategory}
          >
            {['SEDAN', 'SUV', 'HATCHBACK', 'LUXURY', 'SPORTS'].map(cat => (
              <Option key={cat} value={cat}>{cat}</Option>
            ))}
          </Select>
          <Button type="primary" size="large" icon={<Filter className="w-4 h-4" />}>
            More Filters
          </Button>
        </div>
      </Card>

      {isLoading ? (
        <Row gutter={[24, 24]}>
          {[1,2,3,4].map(i => (
            <Col xs={24} sm={12} lg={8} xl={6} key={i}>
              <Card className="rounded-2xl overflow-hidden shadow-sm">
                <Skeleton active paragraph={{ rows: 4 }} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : vehicles?.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-800">
          <Empty description="No vehicles found matching your criteria" />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {vehicles?.map((vehicle, index) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={vehicle.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-slate-100 dark:border-slate-800 dark:bg-slate-800 group cursor-pointer h-full flex flex-col"
                  cover={
                    <div className="h-48 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center relative overflow-hidden">
                       <Car className="text-slate-300 dark:text-slate-700 w-20 h-20 group-hover:scale-110 transition-transform duration-500" />
                       <div className="absolute top-3 right-3">
                         <Tag color="cyan" className="m-0 rounded-full px-3 font-semibold shadow-sm border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-cyan-700 dark:text-cyan-400">
                           {vehicle.category}
                         </Tag>
                       </div>
                    </div>
                  }
                  bodyStyle={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                    <Title level={4} className="mb-0 truncate pr-2 dark:text-slate-100">{vehicle.make} {vehicle.model}</Title>
                      <Text className="font-bold text-lg text-orange-500">₹{vehicle.price.toLocaleString('en-IN')}</Text>
                    </div>
                    <Text type="secondary" className="block mb-4 text-sm line-clamp-2 h-10 dark:text-slate-400">
                      {vehicle.description || 'No description available for this model.'}
                    </Text>
                    
                    <div className="flex gap-2 mb-4">
                      <Tag color={vehicle.availableStock > 0 ? 'success' : 'error'} className="rounded-full m-0">
                        {vehicle.availableStock > 0 ? `${vehicle.availableStock} in stock` : 'Out of Stock'}
                      </Tag>
                      <Tag className="rounded-full bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 m-0 border-slate-200 dark:border-slate-700">
                        {vehicle.fuelType}
                      </Tag>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto pt-4 border-t border-slate-50 dark:border-slate-700/50">
                    <Link to={`/inventory/${vehicle.id}`} className="flex-1">
                      <Button className="w-full text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600" icon={<Info size={16} />}>
                        Details
                      </Button>
                    </Link>
                    <Link to={`/inventory/${vehicle.id}`} className="flex-1">
                      <Button 
                        type="primary" 
                        className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-md shadow-cyan-200 dark:shadow-cyan-900" 
                        icon={<ShoppingCart size={16} />}
                        disabled={vehicle.availableStock <= 0}
                      >
                        Buy
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default VehicleListing;
