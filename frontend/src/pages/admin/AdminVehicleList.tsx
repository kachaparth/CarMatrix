import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Tag, Input, Typography, Modal, InputNumber } from 'antd';
import { Plus, Edit, Trash2, PackagePlus, Search } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleService, inventoryService } from '../../services/vehicle.service';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Vehicle } from '../../types';

const { Title } = Typography;

const AdminVehicleList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [restockModalVisible, setRestockModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [restockQty, setRestockQty] = useState<number | null>(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['admin-vehicles'],
    queryFn: vehicleService.getAll
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => vehicleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vehicles'] });
      toast.success('Vehicle deleted successfully');
    },
    onError: () => toast.error('Failed to delete vehicle')
  });

  const restockMutation = useMutation({
    mutationFn: ({ id, qty }: { id: number, qty: number }) => inventoryService.restock(id, qty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vehicles'] });
      toast.success('Vehicle restocked successfully');
      setRestockModalVisible(false);
    },
    onError: () => toast.error('Failed to restock vehicle')
  });

  const handleRestock = () => {
    if (selectedVehicle && restockQty) {
      restockMutation.mutate({ id: selectedVehicle.id, qty: restockQty });
    }
  };

  const filteredVehicles = vehicles?.filter(v => 
    v.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Make & Model',
      key: 'makeModel',
      render: (_: any, record: Vehicle) => (
        <div className="font-semibold text-slate-800">
          {record.make} {record.model}
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="cyan">{category}</Tag>
    },
    {
      title: 'Price (₹)',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span className="font-semibold text-orange-500">{price.toLocaleString()}</span>,
      sorter: (a: Vehicle, b: Vehicle) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'availableStock',
      key: 'availableStock',
      render: (stock: number) => (
        <Tag color={stock > 0 ? 'success' : 'error'} className="rounded-full">
          {stock}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Vehicle) => (
        <Space size="middle">
          <Button 
            type="text" 
            className="text-slate-500 hover:text-cyan-600" 
            icon={<PackagePlus size={16} />}
            onClick={() => {
              setSelectedVehicle(record);
              setRestockQty(1);
              setRestockModalVisible(true);
            }}
          >
            Restock
          </Button>
          <Button 
            type="text" 
            className="text-slate-500 hover:text-blue-600" 
            icon={<Edit size={16} />}
            onClick={() => navigate(`/admin/vehicles/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the vehicle"
            description="Are you sure you want to delete this vehicle?"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger icon={<Trash2 size={16} />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <Title level={3} className="mb-0 text-slate-800">Vehicle Management</Title>
          <p className="text-slate-500 mb-0">Manage dealership inventory and stock</p>
        </div>
        <Link to="/admin/vehicles/add">
          <Button type="primary" size="large" icon={<Plus size={18} />} className="bg-cyan-600 hover:bg-cyan-700 shadow-md shadow-cyan-200">
            Add New Vehicle
          </Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="mb-6 max-w-md">
          <Input 
            placeholder="Search by make or model..." 
            prefix={<Search className="text-slate-400 w-4 h-4" />}
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredVehicles} 
          rowKey="id" 
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          className="border border-slate-100 rounded-lg overflow-hidden"
        />
      </div>

      <Modal
        title="Restock Vehicle"
        open={restockModalVisible}
        onOk={handleRestock}
        onCancel={() => setRestockModalVisible(false)}
        confirmLoading={restockMutation.isPending}
        okButtonProps={{ className: 'bg-cyan-600 hover:bg-cyan-700' }}
        centered
      >
        <div className="py-4">
          <p className="mb-4 text-slate-600">
            How many units of <strong className="text-slate-800">{selectedVehicle?.make} {selectedVehicle?.model}</strong> do you want to add to inventory?
          </p>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-700">Quantity:</span>
            <InputNumber 
              min={1} 
              max={100} 
              value={restockQty} 
              onChange={setRestockQty} 
              size="large"
              className="w-32"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminVehicleList;
