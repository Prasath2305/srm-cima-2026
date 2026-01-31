'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard,
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileCheck,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Download,
  Eye,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  User,
  Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Registration = {
  id: string;
  author1_name: string;
  author1_designation: string;
  author1_institution: string;
  author2_name?: string;
  author3_name?: string;
  author_email: string;
  author_whatsapp: string;
  article_title: string;
  participant_type: string;
  transaction_id: string;
  payment_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  admin_comments?: string;
  abstract_file_path: string;
  payment_screenshot_path: string;
  created_at: string;
  updated_at: string;
};

type Stats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  under_review: number;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    under_review: 0
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [filter, search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('status', filter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/sys-ops/dashboard?${params}`);
      
      if (res.status === 401) {
        router.push('/sys-ops');
        return;
      }

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setRegistrations(data.registrations);
      setStats(data.stats);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/sys-ops/auth', { method: 'DELETE' });
    router.push('/sys-ops');
  };

  const updateStatus = async (id: string, newStatus: string, comments?: string) => {
    setUpdating(id);
    try {
      const res = await fetch('/api/sys-ops/dashboard', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          status: newStatus,
          admin_comments: comments 
        }),
      });

      if (!res.ok) throw new Error('Update failed');

      await fetchData();
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'under_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'rejected': return XCircle;
      case 'under_review': return FileCheck;
      default: return Clock;
    }
  };

  const statCards = [
    { label: 'Total', value: stats.total, icon: Users, color: 'bg-[#1E2A2A] text-[#FAFAF8]' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Under Review', value: stats.under_review, icon: FileCheck, color: 'bg-blue-100 text-blue-800' },
    { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  ];

  return (
    <div className="min-h-screen bg-[#EFEFE8]">
      {/* Header */}
      <header className="bg-[#1E2A2A] text-[#FAFAF8] px-6 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={20} className="text-[#DED0B6]" />
            </div>
            <div>
              <h1 className="text-lg font-medium">Admin Dashboard</h1>
              <p className="text-xs text-[#DED0B6]">System Operations Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={fetchData}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${stat.color} rounded-2xl p-6 border border-current border-opacity-20`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm opacity-70 mb-1">{stat.label}</p>
                  <p className="text-3xl font-light">{stat.value}</p>
                </div>
                <stat.icon size={24} className="opacity-50" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
              <input
                type="text"
                placeholder="Search by name, email, or article title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2A2A] bg-[#FAFAF8]"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[#607274]" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2A2A] bg-[#FAFAF8] min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="animate-spin mx-auto text-[#1E2A2A] mb-4" size={32} />
              <p className="text-[#607274]">Loading registrations...</p>
            </div>
          ) : registrations.length === 0 ? (
            <div className="p-12 text-center">
              <FileCheck className="mx-auto text-[#9CA3AF] mb-4" size={48} />
              <h3 className="text-lg font-medium text-[#1E2A2A] mb-2">No registrations found</h3>
              <p className="text-[#607274]">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E7EB]">
              {registrations.map((reg) => {
                const StatusIcon = getStatusIcon(reg.status);
                const isExpanded = expandedId === reg.id;
                
                return (
                  <motion.div
                    key={reg.id}
                    initial={false}
                    animate={{ backgroundColor: isExpanded ? '#FAFAF8' : '#ffffff' }}
                    className="hover:bg-[#FAFAF8] transition-colors"
                  >
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : reg.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-[#1E2A2A] text-lg">{reg.article_title}</h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(reg.status)} flex items-center gap-1`}>
                              <StatusIcon size={12} />
                              {reg.status.replace('_', ' ')}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-[#607274]">
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              {reg.author1_designation} {reg.author1_name}
                              {reg.author2_name && ` +${[reg.author2_name, reg.author3_name].filter(Boolean).length} more`}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail size={14} />
                              {reg.author_email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(reg.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <button className="p-2 hover:bg-[#E5E7EB] rounded-lg transition-colors">
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-[#E5E7EB]"
                        >
                          <div className="p-6 space-y-6">
                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <div className="space-y-3">
                                <h4 className="font-medium text-[#1E2A2A] flex items-center gap-2">
                                  <Users size={16} className="text-[#607274]" />
                                  Authors
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <p className="p-2 bg-white rounded-lg border border-[#E5E7EB]">
                                    <span className="font-medium">{reg.author1_designation} {reg.author1_name}</span>
                                    <br />
                                    <span className="text-[#9CA3AF]">{reg.author1_institution}</span>
                                  </p>
                                  {reg.author2_name && (
                                    <p className="p-2 bg-white rounded-lg border border-[#E5E7EB] text-[#607274]">
                                      {reg.author2_name}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="font-medium text-[#1E2A2A] flex items-center gap-2">
                                  <Mail size={16} className="text-[#607274]" />
                                  Contact
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <p className="flex items-center gap-2">
                                    <Mail size={14} className="text-[#9CA3AF]" />
                                    {reg.author_email}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <Phone size={14} className="text-[#9CA3AF]" />
                                    {reg.author_whatsapp}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <FileText size={14} className="text-[#9CA3AF]" />
                                    {reg.participant_type}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="font-medium text-[#1E2A2A] flex items-center gap-2">
                                  <CreditCard size={16} className="text-[#607274]" />
                                  Payment
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <p className="font-mono bg-white p-2 rounded-lg border border-[#E5E7EB]">
                                    {reg.transaction_id}
                                  </p>
                                  <p className="text-[#607274]">
                                    {new Date(reg.payment_date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Files */}
                            <div className="flex gap-3">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`/api/download?path=${encodeURIComponent(reg.abstract_file_path)}`, '_blank');
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                              >
                                <FileText size={16} />
                                Download Abstract
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`/api/download?path=${encodeURIComponent(reg.payment_screenshot_path)}`, '_blank');
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                              >
                                <Download size={16} />
                                View Payment Proof
                              </button>
                            </div>

                            {/* Status Update */}
                            <div className="bg-[#FAFAF8] rounded-xl p-4 border border-[#E5E7EB]">
                              <h4 className="font-medium text-[#1E2A2A] mb-3">Update Status</h4>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {['pending', 'under_review', 'approved', 'rejected'].map((status) => (
                                  <button
                                    key={status}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateStatus(reg.id, status, reg.admin_comments);
                                    }}
                                    disabled={updating === reg.id || reg.status === status}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      reg.status === status
                                        ? getStatusColor(status) + ' cursor-default'
                                        : 'bg-white border border-[#E5E7EB] hover:border-[#1E2A2A] text-[#607274] hover:text-[#1E2A2A]'
                                    }`}
                                  >
                                    {updating === reg.id && reg.status !== status ? (
                                      <RefreshCw className="animate-spin" size={14} />
                                    ) : (
                                      status.replace('_', ' ')
                                    )}
                                  </button>
                                ))}
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-[#607274]">Admin Comments (Optional)</label>
                                <textarea
                                  defaultValue={reg.admin_comments || ''}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => {
                                    // Debounce this in production
                                  }}
                                  onBlur={(e) => {
                                    if (e.target.value !== reg.admin_comments) {
                                      updateStatus(reg.id, reg.status, e.target.value);
                                    }
                                  }}
                                  placeholder="Add notes about this registration..."
                                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2A2A] text-sm min-h-[80px] resize-y"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}