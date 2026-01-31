'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  LogOut, 
  Download,
  Mail,
  Smartphone,
  Building2,
  GraduationCap,
  User,
  ArrowRight,
  RefreshCw,
  FileCheck,
  Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Registration = {
  id: string;
  author1_designation: string;
  author1_name: string;
  author1_institution: string;
  author2_designation?: string;
  author2_name?: string;
  author2_institution?: string;
  author3_designation?: string;
  author3_name?: string;
  author3_institution?: string;
  author_email: string;
  author_whatsapp: string;
  article_title: string;
  participant_type: string;
  transaction_id: string;
  payment_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  abstract_file_path: string;
  payment_screenshot_path: string;
  created_at: string;
  updated_at: string;
  admin_comments?: string;
};

type User = {
  id: string;
  email: string;
  name: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState<'abstract' | 'payment' | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) {
        router.push('/login');
        return;
      }
      const meData = await meRes.json();
      setUser(meData.user);

      const regRes = await fetch('/api/register');
      if (regRes.ok) {
        const regData = await regRes.json();
        if (regData.hasRegistration) {
          setRegistration(regData.registration);
        }
      }
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleDownload = async (filePath: string, type: 'abstract' | 'payment') => {
    if (!filePath) return;
    
    setDownloading(type);
    try {
      const response = await fetch(`/api/download?path=${encodeURIComponent(filePath)}&type=${type}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Get filename from header or path
      const contentDisposition = response.headers.get('content-disposition');
      let filename = filePath.split('/').pop();
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="([^"]+)"/);
        if (match) filename = match[1];
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      alert('Failed to download file. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'Registration Approved',
          description: 'Your submission has been accepted for CIMA\'26'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          label: 'Registration Declined',
          description: 'Please contact support for more information'
        };
      case 'under_review':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: FileCheck,
          label: 'Under Review',
          description: 'Your submission is being evaluated by our committee'
        };
      default:
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          label: 'Pending Verification',
          description: 'We are verifying your payment and documents'
        };
    }
  };

  const getAuthors = (reg: Registration) => {
    const authors = [];
    if (reg.author1_name) {
      authors.push({
        designation: reg.author1_designation,
        name: reg.author1_name,
        institution: reg.author1_institution,
        isPrimary: true
      });
    }
    if (reg.author2_name) {
      authors.push({
        designation: reg.author2_designation,
        name: reg.author2_name,
        institution: reg.author2_institution,
        isPrimary: false
      });
    }
    if (reg.author3_name) {
      authors.push({
        designation: reg.author3_designation,
        name: reg.author3_name,
        institution: reg.author3_institution,
        isPrimary: false
      });
    }
    return authors;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFEFE8] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="text-[#1E2A2A]" size={32} />
        </motion.div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-[#EFEFE8] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-light text-[#1E2A2A]">Dashboard</h1>
              <p className="text-[#607274] mt-1">Welcome back, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-full text-sm text-[#607274] hover:text-[#1E2A2A] hover:border-[#1E2A2A] transition-all shadow-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] p-12 text-center"
          >
            <div className="w-20 h-20 bg-[#EFEFE8] rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={40} className="text-[#607274]" />
            </div>
            <h2 className="text-2xl font-light text-[#1E2A2A] mb-4">No Registration Found</h2>
            <p className="text-[#607274] mb-8 max-w-md mx-auto">
              You haven't submitted a registration for CIMA'26 yet. Complete your registration to participate in the conference.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#1E2A2A] text-[#FAFAF8] rounded-full font-medium hover:bg-[#607274] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Registration
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(registration.status);
  const authors = getAuthors(registration);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-[#EFEFE8] py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 mt-20">
          <div>
            <h1 className="text-3xl font-light text-[#1E2A2A]">Dashboard</h1>
            <p className="text-[#607274] mt-1">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-3">
            {/* <button
              onClick={fetchDashboardData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-full text-sm text-[#607274] hover:text-[#1E2A2A] hover:border-[#1E2A2A] transition-all shadow-sm"
            >
              <RefreshCw size={16} />
              Refresh
            </button> */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-full text-sm text-[#607274] hover:text-[#1E2A2A] hover:border-[#1E2A2A] transition-all shadow-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-2xl shadow-lg border-2 p-8 ${statusConfig.color}`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 bg-white/50 rounded-xl`}>
              <StatusIcon size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium mb-1">{statusConfig.label}</h2>
              <p className="opacity-80">{statusConfig.description}</p>
              
              {registration.admin_comments && (
                <div className="mt-4 p-4 bg-white/60 rounded-xl border border-current border-opacity-20">
                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                    <AlertCircle size={14} />
                    Admin Comments
                  </p>
                  <p className="text-sm opacity-90">{registration.admin_comments}</p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-4 text-sm opacity-70">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Submitted: {new Date(registration.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw size={14} />
                  Last Updated: {new Date(registration.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Article Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden"
            >
              <div className="bg-[#1E2A2A] text-[#FAFAF8] px-6 py-4 flex items-center gap-2">
                <FileText size={20} />
                <h3 className="font-medium">Article Submission</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                    Article Title
                  </label>
                  <p className="text-lg font-medium text-[#1E2A2A]">{registration.article_title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                  <div>
                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      Category
                    </label>
                    <span className="inline-flex items-center px-3 py-1 bg-[#EFEFE8] text-[#1E2A2A] rounded-full text-sm">
                      {registration.participant_type}
                    </span>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      Registration ID
                    </label>
                    <p className="text-sm font-mono text-[#607274]">{registration.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB]">
                  <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-2">
                    Uploaded Files
                  </label>
                  <div className="space-y-2">
                    {/* Abstract File */}
                    <div className="flex items-center justify-between p-3 bg-[#FAFAF8] rounded-xl border border-[#E5E7EB] group hover:border-[#607274] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1E2A2A]">Abstract Document</p>
                          <p className="text-xs text-[#9CA3AF] truncate max-w-[200px]">
                            {registration.abstract_file_path.split('/').pop()}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownload(registration.abstract_file_path, 'abstract')}
                        disabled={downloading === 'abstract'}
                        className="p-2 hover:bg-[#E5E7EB] rounded-lg transition-colors text-[#607274] hover:text-[#1E2A2A] disabled:opacity-50"
                        title="Download Abstract"
                      >
                        {downloading === 'abstract' ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Download size={18} />
                        )}
                      </button>
                    </div>

                    {/* Payment Screenshot */}
                    <div className="flex items-center justify-between p-3 bg-[#FAFAF8] rounded-xl border border-[#E5E7EB] group hover:border-[#607274] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CreditCard size={20} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1E2A2A]">Payment Receipt</p>
                          <p className="text-xs text-[#9CA3AF] truncate max-w-[200px]">
                            {registration.payment_screenshot_path.split('/').pop()}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownload(registration.payment_screenshot_path, 'payment')}
                        disabled={downloading === 'payment'}
                        className="p-2 hover:bg-[#E5E7EB] rounded-lg transition-colors text-[#607274] hover:text-[#1E2A2A] disabled:opacity-50"
                        title="Download Receipt"
                      >
                        {downloading === 'payment' ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Download size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Authors List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden"
            >
              <div className="bg-[#1E2A2A] text-[#FAFAF8] px-6 py-4 flex items-center gap-2">
                <Users size={20} />
                <h3 className="font-medium">Authors ({authors.length})</h3>
              </div>
              
              <div className="divide-y divide-[#E5E7EB]">
                {authors.map((author, index) => (
                  <div key={index} className="p-6 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      author.isPrimary ? 'bg-[#1E2A2A] text-[#FAFAF8]' : 'bg-[#EFEFE8] text-[#607274]'
                    }`}>
                      <User size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[#1E2A2A]">
                          {author.designation} {author.name}
                        </h4>
                        {author.isPrimary && (
                          <span className="text-xs px-2 py-0.5 bg-[#1E2A2A]/10 text-[#1E2A2A] rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#607274] flex items-center gap-1">
                        <Building2 size={14} />
                        {author.institution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Payment Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6"
            >
              <h3 className="font-medium text-[#1E2A2A] mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-[#607274]" />
                Payment Details
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#9CA3AF] block mb-1">Transaction ID</label>
                  <p className="text-sm font-mono bg-[#FAFAF8] px-3 py-2 rounded-lg border border-[#E5E7EB]">
                    {registration.transaction_id}
                  </p>
                </div>
                
                <div>
                  <label className="text-xs text-[#9CA3AF] block mb-1">Payment Date</label>
                  <p className="text-sm text-[#1E2A2A]">
                    {new Date(registration.payment_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6"
            >
              <h3 className="font-medium text-[#1E2A2A] mb-4 flex items-center gap-2">
                <Mail size={18} className="text-[#607274]" />
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#9CA3AF] mt-0.5" />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Email</p>
                    <p className="text-sm text-[#1E2A2A] break-all">{registration.author_email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Smartphone size={16} className="text-[#9CA3AF] mt-0.5" />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">WhatsApp</p>
                    <p className="text-sm text-[#1E2A2A]">{registration.author_whatsapp}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#1E2A2A] to-[#2D3F40] rounded-2xl shadow-lg p-6 text-[#FAFAF8]"
            >
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm opacity-70 mb-4">
                If you have questions about your registration status, please contact our support team.
              </p>
              <a 
                href="mailto:support@cima26.org" 
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#DED0B6] transition-colors"
              >
                <Mail size={16} />
                support@cima26.org
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}