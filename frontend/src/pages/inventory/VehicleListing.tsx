import { useState } from 'react';
import { Card, Input, Select, Button, Row, Col, Typography, Empty, Skeleton } from 'antd';
import { Search, Filter, Car } from 'lucide-react';
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
          <Title level={2} className="mb-0 text-primary">Vehicle Inventory</Title>
          <p className="text-secondary">Browse and manage available vehicles</p>
        </div>
      </div>

      <Card className="shadow-none border-divider bg-surface">
        <div className="flex flex-col md:flex-row gap-4">
          <Input 
            placeholder="Search by make..." 
            prefix={<Search className="text-secondary w-4 h-4" />}
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
              <Card className="rounded-2xl overflow-hidden shadow-none">
                <Skeleton active paragraph={{ rows: 4 }} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : vehicles?.length === 0 ? (
        <div className="bg-surface p-12 rounded-2xl shadow-none flex items-center justify-center border border-divider">
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
                  className="rounded-xl overflow-hidden shadow-none hover:shadow-2xl transition-all duration-500 border border-divider bg-surface group cursor-pointer h-full flex flex-col p-0"
                  bodyStyle={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <div className="h-64 bg-canvas flex items-center justify-center relative overflow-hidden">
                    {vehicle.imageUrl ? (
                      <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <Car className="text-secondary w-16 h-16 opacity-30 group-hover:scale-110 transition-transform duration-700" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-surface/90 backdrop-blur-md text-primary rounded-sm border border-divider">
                        {vehicle.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-2xl font-light text-primary tracking-tight mb-1 truncate">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-lg font-medium text-brand tracking-wide">₹{vehicle.price.toLocaleString('en-IN')}</p>
                    </div>
                    <Text type="secondary" className="block mb-6 text-sm line-clamp-2 leading-relaxed font-light">
                      {vehicle.description || 'Experience the pinnacle of automotive engineering.'}
                    </Text>
                    
                    <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-secondary mb-6 mt-auto">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${vehicle.availableStock > 0 ? 'bg-brand' : 'bg-red-500'}`}></span>
                        {vehicle.availableStock > 0 ? 'Available' : 'Out of Stock'}
                      </span>
                      <span className="w-1 h-1 bg-divider rounded-full"></span>
                      <span>{vehicle.fuelType}</span>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-divider">
                      <Link to={`/inventory/${vehicle.id}`} className="flex-1">
                        <Button className="w-full h-12 text-sm font-medium tracking-wide bg-transparent border-divider text-primary hover:border-brand hover:text-brand transition-colors">
                          View Details
                        </Button>
                      </Link>
                      <Link to={`/inventory/${vehicle.id}`} className="flex-1">
                        <Button 
                          type="primary" 
                          className="w-full h-12 text-sm font-medium tracking-wide bg-brand text-white border-none shadow-none hover:opacity-90" 
                          disabled={vehicle.availableStock <= 0}
                        >
                          Reserve
                        </Button>
                      </Link>
                    </div>
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
