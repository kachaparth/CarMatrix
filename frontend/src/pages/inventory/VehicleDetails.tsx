import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Tag, Divider, Modal } from 'antd';
import { ArrowLeft, Car, Fuel, Settings2, Palette, Calendar, ShoppingCart, ShieldCheck } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleService, inventoryService } from '../../services/vehicle.service';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleService.getById(Number(id)),
    enabled: !!id
  });

  const purchaseMutation = useMutation({
    mutationFn: () => inventoryService.purchase(Number(id), 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle', id] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success('Vehicle purchased successfully!');
      setIsPurchaseModalOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Purchase failed.');
    }
  });

  if (isLoading) return <div className="p-12 text-center text-secondary font-semibold animate-pulse">Loading vehicle details...</div>;
  if (error || !vehicle) return <div className="p-12 text-center text-red-500 font-semibold">Error loading vehicle details.</div>;

  const handlePurchase = () => {
    purchaseMutation.mutate();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Button 
        type="text" 
        icon={<ArrowLeft size={16} />} 
        onClick={() => navigate('/inventory')}
        className="text-secondary hover:text-primary"
      >
        Back to Inventory
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="rounded-2xl overflow-hidden shadow-none border border-divider bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Image/Graphic */}
            <div className="bg-canvas/50 rounded-xl flex items-center justify-center p-12 relative overflow-hidden h-96">
              <div className="absolute top-4 left-4 z-10">
                <Tag color="geekblue" className="text-sm font-semibold px-3 py-1 rounded-full border border-divider">
                  {vehicle.category}
                </Tag>
              </div>
              {vehicle.imageUrl ? (
                <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <Car className="text-brand w-48 h-48 opacity-20" />
              )}
            </div>

            {/* Right side: Details */}
            <div className="flex flex-col">
              <div className="mb-6">
                <Title level={2} className="mb-0 text-primary">{vehicle.make} {vehicle.model}</Title>
                <Text className="text-3xl font-bold text-emerald-600 block mt-2">
                  ₹{vehicle.price.toLocaleString('en-IN')}
                </Text>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Tag color={vehicle.availableStock > 0 ? 'success' : 'error'} className="rounded-full px-3 py-1 text-sm font-medium border border-divider">
                  {vehicle.availableStock > 0 ? `${vehicle.availableStock} Available in Stock` : 'Out of Stock'}
                </Tag>
              </div>

              <Text className="text-secondary text-base mb-8">
                {vehicle.description || 'This premium vehicle offers exceptional performance, comfort, and reliability. Experience the perfect blend of engineering and design.'}
              </Text>

              <Divider className="my-2 border-divider" />

              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-canvas/50 rounded-lg text-brand"><Fuel size={20} /></div>
                  <div>
                    <Text className="text-xs text-secondary block uppercase font-bold tracking-wider">Fuel Type</Text>
                    <Text className="font-semibold text-primary">{vehicle.fuelType}</Text>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-canvas/50 rounded-lg text-brand"><Settings2 size={20} /></div>
                  <div>
                    <Text className="text-xs text-secondary block uppercase font-bold tracking-wider">Transmission</Text>
                    <Text className="font-semibold text-primary">{vehicle.transmissionType}</Text>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-surface rounded-lg text-brand"><Palette size={20} /></div>
                  <div>
                    <Text className="text-xs text-secondary block uppercase font-bold tracking-wider">Color</Text>
                    <Text className="font-semibold text-primary">{vehicle.color}</Text>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-surface rounded-lg text-brand"><Calendar size={20} /></div>
                  <div>
                    <Text className="text-xs text-secondary block uppercase font-bold tracking-wider">Year</Text>
                    <Text className="font-semibold text-primary">{vehicle.manufacturingYear}</Text>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-divider/50 flex gap-4">
                <Button 
                  type="primary" 
                  size="large" 
                  className="flex-1 h-14 text-lg font-semibold bg-brand hover:opacity-90 text-white shadow-none"
                  icon={<ShoppingCart size={20} />}
                  disabled={vehicle.availableStock <= 0}
                  onClick={() => setIsPurchaseModalOpen(true)}
                >
                  Purchase Now
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-secondary text-xs">
                <ShieldCheck size={14} /> Secure transaction via CarMatrix
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <Modal
        title="Confirm Purchase"
        open={isPurchaseModalOpen}
        onOk={handlePurchase}
        onCancel={() => setIsPurchaseModalOpen(false)}
        confirmLoading={purchaseMutation.isPending}
        okText="Confirm & Pay"
        okButtonProps={{ className: 'bg-brand hover:opacity-90 text-white' }}
        centered
      >
        <div className="py-4">
          <p className="text-lg mb-2 text-secondary">You are about to purchase:</p>
          <div className="bg-surface p-4 rounded-lg border border-divider">
            <p className="font-bold text-primary text-xl">{vehicle.make} {vehicle.model}</p>
            <p className="text-secondary">Color: {vehicle.color} • Year: {vehicle.manufacturingYear}</p>
            <Divider className="my-2 border-divider" />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-secondary">Total Amount</span>
              <span className="font-bold text-2xl text-emerald-600">₹{vehicle.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VehicleDetails;
