'use client';

import { useState, useEffect, Fragment  } from 'react';
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
  Check,
  MoreHorizontal,
  X,
  ExternalLink,
  Download
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
  const [viewingDocs, setViewingDocs] = useState<Registration | null>(null);

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
      default: return 'bg-amber-100 text-amber-800 border-amber-200';
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

  const openDocument = (path: string) => {
  if (!path) return;
  // Use verify-documents endpoint instead of download
  window.open(`/api/sys-ops/verify-documents?path=${encodeURIComponent(path)}`, '_blank');
};

  const statCards = [
    { label: 'Total', value: stats.total, icon: Users, color: 'bg-[#1E2A2A] text-[#FAFAF8]' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-amber-100 text-amber-800' },
    { label: 'Under Review', value: stats.under_review, icon: FileCheck, color: 'bg-blue-100 text-blue-800' },
    { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  ];

  return (
    <div className="min-h-screen bg-[#EFEFE8]">
      {/* Header */}
      <header className="bg-[#1E2A2A] text-[#FAFAF8] px-6 py-6 sticky top-0 z-50 shadow-lg">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-black border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2A2A] bg-[#FAFAF8]"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[#607274]" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2A2A] bg-[#FAFAF8] text-black min-w-[140px]"
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

        {/* Table View */}
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAFAF8] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#607274] uppercase tracking-wider">Author Details</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#607274] uppercase tracking-wider">Article Title</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#607274] uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#607274] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#607274] uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#607274] uppercase tracking-wider">Documents</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#607274] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {registrations.map((reg) => {
                    const StatusIcon = getStatusIcon(reg.status);
                    const isExpanded = expandedId === reg.id;
                    
                    return (
                      <Fragment key={reg.id}>
                        <tr 
                          key={reg.id} 
                          className={`hover:bg-[#FAFAF8] transition-colors ${isExpanded ? 'bg-[#FAFAF8]' : ''}`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#1E2A2A] text-white flex items-center justify-center text-sm font-medium shrink-0">
                                {reg.author1_name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-[#1E2A2A] text-sm">
                                  {reg.author1_designation} {reg.author1_name}
                                </p>
                                <p className="text-xs text-[#9CA3AF]">{reg.author_email}</p>
                                {reg.author2_name && (
                                  <p className="text-xs text-[#607274] mt-0.5">
                                    +{[reg.author2_name, reg.author3_name].filter(Boolean).length} co-author(s)
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-[#1E2A2A] max-w-xs truncate" title={reg.article_title}>
                              {reg.article_title}
                            </p>
                          </td>
                          
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-[#EFEFE8] text-[#1E2A2A] rounded-full text-xs font-medium">
                              {reg.participant_type}
                            </span>
                          </td>
                          
                          <td className="px-6 py-4">
                            <select
                              value={reg.status}
                              onChange={(e) => updateStatus(reg.id, e.target.value)}
                              className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getStatusColor(reg.status)} cursor-pointer hover:opacity-80 transition-opacity`}
                            >
                              <option value="pending">Pending</option>
                              <option value="under_review">Under Review</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          
                          <td className="px-6 py-4 text-sm text-[#607274]">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(reg.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setViewingDocs(reg)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium"
                            >
                              <Eye size={14} />
                              View Docs
                            </button>
                          </td>
                          
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setExpandedId(isExpanded ? null : reg.id)}
                                className="p-2 hover:bg-[#E5E7EB] rounded-lg transition-colors text-[#607274]"
                                title="View Details"
                              >
                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                              </button>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Expanded Details Row */}
                        {isExpanded && (
                          <tr className="bg-[#FAFAF8] border-b border-[#E5E7EB]">
                            <td colSpan={7} className="px-6 py-6">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                              >
                                {/* Contact Info */}
                                <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
                                  <h4 className="font-medium text-[#1E2A2A] mb-3 flex items-center gap-2">
                                    <Mail size={16} className="text-[#607274]" />
                                    Contact Information
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <p className="flex items-center gap-2 text-[#1E2A2A]">
                                      <Mail size={14} className="text-[#9CA3AF]" />
                                      {reg.author_email}
                                    </p>
                                    <p className="flex items-center gap-2 text-[#1E2A2A]">
                                      <Phone size={14} className="text-[#9CA3AF]" />
                                      {reg.author_whatsapp}
                                    </p>
                                    <p className="flex items-center gap-2 text-[#607274]">
                                      <CreditCard size={14} className="text-[#9CA3AF]" />
                                      TXN: {reg.transaction_id}
                                    </p>
                                  </div>
                                </div>

                                {/* Institution */}
                                <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
                                  <h4 className="font-medium text-[#1E2A2A] mb-3 flex items-center gap-2">
                                    <User size={16} className="text-[#607274]" />
                                    Institution Details
                                  </h4>
                                  <p className="text-sm text-[#1E2A2A] font-medium">
                                    {reg.author1_institution}
                                  </p>
                                  {reg.author2_name && (
                                    <p className="text-xs text-[#607274] mt-2">
                                      Co-authors: {reg.author2_name}
                                      {reg.author3_name && `, ${reg.author3_name}`}
                                    </p>
                                  )}
                                </div>

                                {/* Admin Actions */}
                                {/* <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
                                  <h4 className="font-medium text-[#1E2A2A] mb-3 flex items-center gap-2">
                                    <AlertCircle size={16} className="text-[#607274]" />
                                    Admin Notes
                                  </h4>
                                  <textarea
                                    defaultValue={reg.admin_comments || ''}
                                    onBlur={(e) => {
                                      if (e.target.value !== reg.admin_comments) {
                                        updateStatus(reg.id, reg.status, e.target.value);
                                      }
                                    }}
                                    placeholder="Add internal notes..."
                                    className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2A2A] text-sm min-h-[80px] resize-y"
                                  />
                                </div> */}
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {viewingDocs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setViewingDocs(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-xl font-bold text-[#1E2A2A]">View Documents</h2>
                  <p className="text-sm text-[#607274] mt-1">{viewingDocs.article_title}</p>
                </div>
                <button 
                  onClick={() => setViewingDocs(null)}
                  className="p-2 hover:bg-[#FAFAF8] rounded-full transition-colors"
                >
                  <X size={24} className="text-[#607274]" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Abstract Document */}
                <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                  <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-blue-600" />
                      <span className="font-medium text-blue-900">Abstract Document</span>
                    </div>
                    {/* <button
                      onClick={() => openDocument(viewingDocs.abstract_file_path)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <ExternalLink size={16} />
                      Open in New Tab
                    </button> */}
                  </div>
                  <div className="p-4 bg-[#FAFAF8]">
                    {/* <p className="text-sm text-[#607274] mb-2">Filename: {viewingDocs.abstract_file_path.split('/').pop()}</p> */}
                    <button
                      onClick={() => openDocument(viewingDocs.abstract_file_path)}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye size={18} />
                      View Abstract
                    </button>
                  </div>
                </div>

                {/* Payment Proof */}
                <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                  <div className="bg-green-50 px-4 py-3 border-b border-green-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard size={20} className="text-green-600" />
                      <span className="font-medium text-green-900">Payment Proof</span>
                    </div>
                    {/* <button
                      onClick={() => openDocument(viewingDocs.payment_screenshot_path)}
                      className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800 font-medium"
                    >
                      <ExternalLink size={16} />
                      Open in New Tab
                    </button> */}
                  </div>
                  <div className="p-4 bg-[#FAFAF8]">
                    <p className="text-sm text-[#607274] mb-2">Transaction ID: {viewingDocs.transaction_id}</p>
                    {/* <p className="text-xs text-[#9CA3AF] mb-3">Filename: {viewingDocs.payment_screenshot_path.split('/').pop()}</p> */}
                    <button
                      onClick={() => openDocument(viewingDocs.payment_screenshot_path)}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye size={18} />
                      View Payment Screenshot
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}