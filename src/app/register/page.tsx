'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Smartphone, 
  FileText, 
  CreditCard, 
  CheckCircle, 
  Upload, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle,
  User,
  Building2,
  GraduationCap,
  Calendar,
  Receipt,
  Loader2,
  LogOut,
  Landmark,
  Copy,
  Info,
  FileCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type AuthorData = {
  salutation: string;
  name: string;
  affiliation: string;
  institution: string;
};

type FormData = {
  authors: AuthorData[];
  authorWhatsApp: string;
  articleTitle: string;
  transactionId: string;
  paymentDate: string;
};

const MAX_AUTHORS = 6;

// Salutation options
const SALUTATIONS = ['Dr', 'Mr', 'Ms'] as const;

// Affiliation options (without pricing)
const AFFILIATIONS = ['UG/PG', 'Research Scholar', 'Academicians', 'Industrial Person'] as const;

// Bank details
const BANK_DETAILS = {
  beneficiaryName: 'SRMIST - FSHKTR EVENTS',
  bankName: 'City Union Bank',
  branch: 'Tambaram',
  accountNo: '500101013732378',
  ifsc: 'CIUB0000117',
};

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [visibleAuthors, setVisibleAuthors] = useState(1);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    authors: Array(MAX_AUTHORS).fill(null).map(() => ({
      salutation: '',
      name: '',
      affiliation: '',
      institution: ''
    })),
    authorWhatsApp: '',
    articleTitle: '',
    transactionId: '',
    paymentDate: '',
  });

  const [abstractFile, setAbstractFile] = useState<File | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const steps = [
    { id: 1, title: 'Authors', subtitle: 'Research Team', icon: Users },
    { id: 2, title: 'Contact', subtitle: 'Communication', icon: Mail },
    { id: 3, title: 'Article', subtitle: 'Submission Details', icon: FileText },
    { id: 4, title: 'Payment', subtitle: 'Transaction Info', icon: CreditCard },
    { id: 5, title: 'Review', subtitle: 'Confirm & Submit', icon: CheckCircle },
  ];

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
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
          router.push('/dashboard');
          return;
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleDashboard = async () => {
    router.push('/dashboard');
  };

  const addAuthor = () => {
    if (visibleAuthors < MAX_AUTHORS) {
      setVisibleAuthors(prev => prev + 1);
    }
  };

  const removeAuthor = (index: number) => {
    if (visibleAuthors > 1 && index === visibleAuthors - 1) {
      handleAuthorChange(index, 'salutation', '');
      handleAuthorChange(index, 'name', '');
      handleAuthorChange(index, 'affiliation', '');
      handleAuthorChange(index, 'institution', '');
      setVisibleAuthors(prev => prev - 1);
    }
  };

  const handleAuthorChange = (index: number, field: keyof AuthorData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.map((author, i) => 
        i === index ? { ...author, [field]: value } : author
      ),
    }));
    if (errors[`author${index + 1}${field}`]) {
      setErrors((prev) => ({ ...prev, [`author${index + 1}${field}`]: '' }));
    }
  };

  const handleChange = (field: keyof Omit<FormData, 'authors'>, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'abstract' | 'payment') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === 'abstract') {
        setAbstractFile(file);
        if (errors.abstractFile) setErrors((prev) => ({ ...prev, abstractFile: '' }));
      } else {
        if (!file.type.startsWith('image/')) {
          setErrors((prev) => ({ ...prev, paymentScreenshot: 'Please upload an image file' }));
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setErrors((prev) => ({ ...prev, paymentScreenshot: 'Image size must be less than 5MB' }));
          return;
        }
        setPaymentScreenshot(file);
        if (errors.paymentScreenshot) setErrors((prev) => ({ ...prev, paymentScreenshot: '' }));
      }
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 1) {
      const primary = formData.authors[0];
      if (!primary.name.trim()) {
        newErrors.author1name = 'Primary author name is required';
        isValid = false;
      }
      if (!primary.salutation.trim()) {
        newErrors.author1salutation = 'Salutation is required';
        isValid = false;
      }
      if (!primary.affiliation.trim()) {
        newErrors.author1affiliation = 'Affiliation is required';
        isValid = false;
      }
      if (!primary.institution.trim()) {
        newErrors.author1institution = 'Institution is required';
        isValid = false;
      }
      
      for (let i = 1; i < visibleAuthors; i++) {
        const author = formData.authors[i];
        if (author.name || author.salutation || author.affiliation || author.institution) {
          if (!author.name.trim()) newErrors[`author${i+1}name`] = 'Name is required if filling co-author';
          if (!author.salutation.trim()) newErrors[`author${i+1}salutation`] = 'Salutation is required';
          if (!author.affiliation.trim()) newErrors[`author${i+1}affiliation`] = 'Affiliation is required';
          if (!author.institution.trim()) newErrors[`author${i+1}institution`] = 'Institution is required';
        }
      }
    }

    if (step === 2) {
      const phoneRegex = /^\+?[1-9]\d{9,14}$/;
      if (!formData.authorWhatsApp.trim()) {
        newErrors.authorWhatsApp = 'WhatsApp number is required';
        isValid = false;
      } else if (!phoneRegex.test(formData.authorWhatsApp.replace(/\s/g, ''))) {
        newErrors.authorWhatsApp = 'Invalid phone number format';
        isValid = false;
      }
    }

    if (step === 3) {
      if (!formData.articleTitle.trim()) {
        newErrors.articleTitle = 'Article title is required';
        isValid = false;
      }
      if (!abstractFile) {
        newErrors.abstractFile = 'Abstract file is required';
        isValid = false;
      }
    }

    if (step === 4) {
      if (!formData.transactionId.trim()) {
        newErrors.transactionId = 'Transaction ID is required';
        isValid = false;
      }
      if (!formData.paymentDate) {
        newErrors.paymentDate = 'Payment date is required';
        isValid = false;
      }
      if (!paymentScreenshot) {
        newErrors.paymentScreenshot = 'Payment screenshot is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setLoading(true);
    try {
      const submitFormData = new FormData();
      
      formData.authors.forEach((author, index) => {
        if (author.name.trim()) {
          submitFormData.append(`author${index + 1}_salutation`, author.salutation);
          submitFormData.append(`author${index + 1}_name`, author.name);
          submitFormData.append(`author${index + 1}_affiliation`, author.affiliation);
          submitFormData.append(`author${index + 1}_institution`, author.institution);
        }
      });

      submitFormData.append('author_whatsapp', formData.authorWhatsApp);
      submitFormData.append('article_title', formData.articleTitle);
      submitFormData.append('transaction_id', formData.transactionId);
      submitFormData.append('payment_date', formData.paymentDate);
      
      if (abstractFile) submitFormData.append('abstractFile', abstractFile);
      if (paymentScreenshot) submitFormData.append('paymentScreenshot', paymentScreenshot);

      const response = await fetch('/api/register', {
        method: 'POST',
        body: submitFormData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Registration failed');

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#EFEFE8] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1E2A2A]" size={32} />
      </div>
    );
  }

  const renderTimeline = () => (
    <div className="mb-10">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#E5E7EB] -translate-y-1/2 z-0" />
        <div 
          className="absolute left-0 top-1/2 h-0.5 bg-[#1E2A2A] -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted ? '#1E2A2A' : isCurrent ? '#1E2A2A' : '#ffffff',
                  borderColor: isCompleted || isCurrent ? '#1E2A2A' : '#E5E7EB',
                }}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 shadow-md transition-colors duration-300 ${
                  isCurrent ? 'ring-4 ring-[#1E2A2A]/10' : ''
                }`}
              >
                <Icon 
                  size={20} 
                  className={isCompleted || isCurrent ? 'text-[#FAFAF8]' : 'text-[#607274]'} 
                />
              </motion.div>
              <div className="mt-2 text-center hidden sm:block">
                <p className={`text-xs font-semibold uppercase tracking-wider ${isCurrent ? 'text-[#1E2A2A]' : 'text-black'}`}>
                  {step.title}
                </p>
                <p className="text-[10px] text-black mt-0.5">{step.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAuthorCard = (index: number) => {
    const author = formData.authors[index];
    const isPrimary = index === 0;
    const authorNum = index + 1;
    const canRemove = !isPrimary && index === visibleAuthors - 1;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E7EB] shadow-sm relative group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1E2A2A] text-[#FAFAF8] flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#1E2A2A]">
                {isPrimary ? 'Primary Author' : `Co-Author ${index}`}
              </h3>
              {!isPrimary && <span className="text-xs text-black">Optional</span>}
            </div>
          </div>
          
          {canRemove && (
            <button
              type="button"
              onClick={() => removeAuthor(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Remove author"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider flex items-center gap-1">
              <User size={12} />
              Salutation {isPrimary && <span className="text-red-500">*</span>}
            </label>
            <select
              value={author.salutation}
              onChange={(e) => handleAuthorChange(index, 'salutation', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-black ${
                errors[`author${authorNum}salutation`] ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
              } focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all text-sm`}
            >
              <option value="">Select...</option>
              {SALUTATIONS.map(sal => (
                <option key={sal} value={sal}>{sal}</option>
              ))}
            </select>
            {errors[`author${authorNum}salutation`] && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={10} /> {errors[`author${authorNum}salutation`]}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider flex items-center gap-1">
              <User size={12} />
              Full Name {isPrimary && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={author.name}
              onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
              placeholder="John Doe"
              className={`w-full px-4 py-2.5 rounded-xl border text-black ${
                errors[`author${authorNum}name`] ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
              } focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all text-sm`}
            />
            {errors[`author${authorNum}name`] && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={10} /> {errors[`author${authorNum}name`]}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider flex items-center gap-1">
              <GraduationCap size={12} />
              Designation {isPrimary && <span className="text-red-500">*</span>}
            </label>
            <select
              value={author.affiliation}
              onChange={(e) => handleAuthorChange(index, 'affiliation', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-black ${
                errors[`author${authorNum}affiliation`] ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
              } focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all text-sm`}
            >
              <option value="">Select...</option>
              {AFFILIATIONS.map((affiliation) => (
                <option key={affiliation} value={affiliation}>
                  {affiliation}
                </option>
              ))}
            </select>
            {errors[`author${authorNum}affiliation`] && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={10} /> {errors[`author${authorNum}affiliation`]}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider flex items-center gap-1">
              <Building2 size={12} />
              Institution {isPrimary && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={author.institution}
              onChange={(e) => handleAuthorChange(index, 'institution', e.target.value)}
              placeholder="University/Organization"
              className={`w-full px-4 py-2.5 rounded-xl border text-black ${
                errors[`author${authorNum}institution`] ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
              } focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all text-sm`}
            />
            {errors[`author${authorNum}institution`] && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={10} /> {errors[`author${authorNum}institution`]}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {/* Important Registration Hints */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <Info className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-900">Important Registration Information:</p>
                  <ul className="space-y-1.5 text-blue-800">
                    <li>• <strong>Certificate:</strong> Only the first author will receive the participation certificate</li>
                    <li>• <strong>Payment Policy:</strong></li>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>- If all authors are <strong>Students (UG/PG)</strong>: All authors must pay as one total amount</li>
                      <li>- For other categories: Only the <strong>first author</strong> pays the registration fee</li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-light text-[#1E2A2A]">Author Information</h2>
                <p className="text-sm text-black mt-1">Add all contributing authors to this research</p>
              </div>
              <span className="text-xs font-medium px-3 py-1 bg-[#1E2A2A]/10 text-[#1E2A2A] rounded-full">
                {visibleAuthors} of {MAX_AUTHORS}
              </span>
            </div>
            
            <div className="space-y-4">
              {Array.from({ length: visibleAuthors }).map((_, index) => (
                <div key={index}>{renderAuthorCard(index)}</div>
              ))}
            </div>

            {visibleAuthors < MAX_AUTHORS && (
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={addAuthor}
                className="w-full py-4 border-2 border-dashed border-[#DED0B6] rounded-2xl text-[#607274] hover:border-[#1E2A2A] hover:text-[#1E2A2A] transition-all flex items-center justify-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#EFEFE8] group-hover:bg-[#1E2A2A] group-hover:text-white flex items-center justify-center transition-colors">
                  <Plus size={18} />
                </div>
                <span className="font-medium">Add Co-Author</span>
              </motion.button>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-[#1E2A2A]">Contact Details</h2>
              <p className="text-sm text-black mt-1">How we'll communicate with you</p>
              <p className="text-xs text-[#607274] mt-2 bg-blue-50 inline-block px-3 py-1 rounded-full">
                Logged in as: {user?.email}
              </p>
            </div>
            
            <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
                    <Mail size={16} className="text-[#607274]" />
                    Email Address (Verified)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-black">Using your account email</p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
                    <Smartphone size={16} className="text-[#607274]" />
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.authorWhatsApp}
                    maxLength={10}
                    onChange={(e) => handleChange('authorWhatsApp', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-black ${
                      errors.authorWhatsApp ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.authorWhatsApp && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.authorWhatsApp}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-[#1E2A2A]">Article Details</h2>
              <p className="text-sm text-black mt-1">Information about your submission</p>
            </div>
            
            <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E7EB] shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
                  <FileText size={16} className="text-[#607274]" />
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.articleTitle}
                  onChange={(e) => handleChange('articleTitle', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-black ${
                    errors.articleTitle ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
                  } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
                  placeholder="Enter the full title of your research article"
                />
                {errors.articleTitle && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.articleTitle}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
                  <Upload size={16} className="text-[#607274]" />
                  Abstract Document <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors relative ${
                  errors.abstractFile ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] hover:border-[#607274] bg-white'
                }`}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'abstract')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-black"
                    id="abstract-upload"
                  />
                  <div className="pointer-events-none">
                    <div className="w-12 h-12 bg-[#EFEFE8] rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText size={24} className="text-[#607274]" />
                    </div>
                    <p className="text-sm text-[#1E2A2A] font-medium">
                      {abstractFile ? abstractFile.name : 'Click to upload abstract'}
                    </p>
                    <p className="text-xs text-black mt-1">PDF or Word (Max 10MB)</p>
                  </div>
                </div>
                {errors.abstractFile && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.abstractFile}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-[#1E2A2A]">Payment Details</h2>
              <p className="text-sm text-black mt-1">Complete your registration fee payment</p>
            </div>

            {/* Bank Details Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden"
            >
              <div className="bg-amber-50 border-b border-amber-100 px-6 py-3 flex items-center gap-2">
                <Info size={18} className="text-amber-600" />
                <p className="text-sm text-amber-800 font-medium">Bank Transfer Details</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#FAFAF8] rounded-xl group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Landmark size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-black">Beneficiary Name</p>
                      <p className="text-sm font-medium text-[#1E2A2A]">{BANK_DETAILS.beneficiaryName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(BANK_DETAILS.beneficiaryName, 'beneficiary')}
                    className="p-2 hover:bg-[#E5E7EB] rounded-lg transition-colors text-[#607274]"
                    title="Copy"
                  >
                    {copiedField === 'beneficiary' ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-[#FAFAF8] rounded-xl">
                    <div>
                      <p className="text-xs text-black">Bank Name</p>
                      <p className="text-sm font-medium text-[#1E2A2A]">{BANK_DETAILS.bankName}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(BANK_DETAILS.bankName, 'bank')}
                      className="p-2 hover:bg-[#E5E7EB] rounded-lg transition-colors text-[#607274]"
                    >
                      {copiedField === 'bank' ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#FAFAF8] rounded-xl">
                    <div>
                      <p className="text-xs text-black">Branch</p>
                      <p className="text-sm font-medium text-[#1E2A2A]">{BANK_DETAILS.branch}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(BANK_DETAILS.branch, 'branch')}
                      className="p-2 hover:bg-[#E5E7EB] rounded-lg transition-colors text-[#607274]"
                    >
                      {copiedField === 'branch' ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#FAFAF8] rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-black">Account Number</p>
                    <p className="text-lg font-mono font-medium text-[#1E2A2A] tracking-wider">{BANK_DETAILS.accountNo}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(BANK_DETAILS.accountNo, 'account')}
                    className="p-2 hover:bg-[#E5E7EB] rounded-lg transition-colors text-[#607274] ml-2"
                  >
                    {copiedField === 'account' ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#FAFAF8] rounded-xl">
                  <div>
                    <p className="text-xs text-black">IFSC Code</p>
                    <p className="text-lg font-mono font-medium text-[#1E2A2A] tracking-wider">{BANK_DETAILS.ifsc}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(BANK_DETAILS.ifsc, 'ifsc')}
                    className="p-2 hover:bg-[#E5E7EB] rounded-lg transition-colors text-[#607274]"
                  >
                    {copiedField === 'ifsc' ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Payment Verification Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E7EB] shadow-sm space-y-6"
            >
              <h3 className="font-medium text-[#1E2A2A] flex items-center gap-2">
                <CheckCircle size={18} className="text-[#607274]" />
                Payment Verification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
                    <Receipt size={16} className="text-[#607274]" />
                    Transaction ID / UTR Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.transactionId}
                    onChange={(e) => handleChange('transactionId', e.target.value.toUpperCase())}
                    className={`w-full px-4 py-3 rounded-xl border text-black ${
                      errors.transactionId ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all uppercase tracking-wider font-mono`}
                    placeholder="TXN123456 or UTR789012"
                  />
                  {errors.transactionId && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.transactionId}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
                    <Calendar size={16} className="text-[#607274]" />
                    Payment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.paymentDate}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleChange('paymentDate', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-black ${
                      errors.paymentDate ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
                  />
                  {errors.paymentDate && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.paymentDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
                  <Upload size={16} className="text-[#607274]" />
                  Payment Screenshot / Receipt <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors relative ${
                  errors.paymentScreenshot ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] hover:border-[#607274] bg-white'
                }`}>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'payment')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="payment-upload"
                  />
                  <div className="pointer-events-none">
                    {paymentScreenshot ? (
                      <div className="flex flex-col items-center text-green-600">
                        <CheckCircle size={32} className="mb-2" />
                        <p className="text-sm font-medium">{paymentScreenshot.name}</p>
                        <p className="text-xs text-black mt-1">Click to change file</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-[#EFEFE8] rounded-full flex items-center justify-center mx-auto mb-3">
                          <CreditCard size={24} className="text-[#607274]" />
                        </div>
                        <p className="text-sm text-[#1E2A2A] font-medium">Upload payment proof</p>
                        <p className="text-xs text-black mt-1">Screenshot or Image (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
                {errors.paymentScreenshot && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.paymentScreenshot}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        );

      case 5:
        const validAuthors = formData.authors.filter(a => a.name.trim());
        
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-[#1E2A2A]">Review Submission</h2>
              <p className="text-sm text-black mt-1">Please verify all details before submitting</p>
            </div>

            {errors.submit && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
              >
                <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800">{errors.submit}</p>
              </motion.div>
            )}

            <div className="space-y-4">
              {/* Authors Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden"
              >
                <div className="bg-[#FAFAF8] border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[#607274]" />
                    <h3 className="font-medium text-[#1E2A2A]">Authors</h3>
                  </div>
                  <span className="text-xs bg-[#1E2A2A] text-white px-3 py-1 rounded-full">
                    {validAuthors.length} Author{validAuthors.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="p-6 space-y-4">
                  {validAuthors.map((author, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-[#FAFAF8] rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[#1E2A2A] text-white flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-[#607274] mb-1">Name</p>
                          <p className="text-sm font-medium text-[#1E2A2A]">
                            {author.salutation}. {author.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#607274] mb-1">Affiliation</p>
                          <p className="text-sm text-[#1E2A2A]">{author.affiliation}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-[#607274] mb-1">Institution</p>
                          <p className="text-sm text-[#1E2A2A]">{author.institution}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden"
              >
                <div className="bg-[#FAFAF8] border-b border-[#E5E7EB] px-6 py-3 flex items-center gap-2">
                  <Mail size={18} className="text-[#607274]" />
                  <h3 className="font-medium text-[#1E2A2A]">Contact Information</h3>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#607274] mb-1">Email</p>
                    <p className="text-sm text-[#1E2A2A]">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#607274] mb-1">WhatsApp</p>
                    <p className="text-sm text-[#1E2A2A]">{formData.authorWhatsApp}</p>
                  </div>
                </div>
              </motion.div>

              {/* Article Details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden"
              >
                <div className="bg-[#FAFAF8] border-b border-[#E5E7EB] px-6 py-3 flex items-center gap-2">
                  <FileText size={18} className="text-[#607274]" />
                  <h3 className="font-medium text-[#1E2A2A]">Article Details</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-[#607274] mb-1">Title</p>
                    <p className="text-sm text-[#1E2A2A] font-medium">{formData.articleTitle}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-[#607274] mb-1">Abstract File</p>
                    <p className="text-sm text-[#1E2A2A] flex items-center gap-2">
                      <FileCheck size={16} className="text-green-600" />
                      {abstractFile?.name}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Payment Details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden"
              >
                <div className="bg-[#FAFAF8] border-b border-[#E5E7EB] px-6 py-3 flex items-center gap-2">
                  <CreditCard size={18} className="text-[#607274]" />
                  <h3 className="font-medium text-[#1E2A2A]">Payment Information</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#607274] mb-1">Transaction ID</p>
                      <p className="text-sm text-[#1E2A2A] font-mono">{formData.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#607274] mb-1">Payment Date</p>
                      <p className="text-sm text-[#1E2A2A]">
                        {new Date(formData.paymentDate).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-[#607274] mb-1">Payment Proof</p>
                      <p className="text-sm text-[#1E2A2A] flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-600" />
                        {paymentScreenshot?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#1E2A2A] text-[#FAFAF8] py-4 rounded-xl font-medium hover:bg-[#2D3F40] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Submit Registration
                </>
              )}
            </motion.button>
          </div>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#EFEFE8] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-light text-[#1E2A2A] mb-3">Registration Successful!</h2>
          <p className="text-sm text-black mb-6">
            Your registration has been submitted successfully. You will receive a confirmation email shortly.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-[#1E2A2A] text-[#FAFAF8] py-3 rounded-xl font-medium hover:bg-[#2D3F40] transition-colors"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFEFE8]">

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-30">
        {renderTimeline()}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 max-w-3xl mx-auto">
          {currentStep > 1 && (
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-6 py-3 text-[#607274] hover:text-[#1E2A2A] hover:bg-white rounded-xl transition-all border border-[#E5E7EB]"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
          )}

          {currentStep < 5 && (
            <button
              onClick={handleNext}
              className={`flex items-center gap-2 px-6 py-3 bg-[#1E2A2A] text-[#FAFAF8] rounded-xl hover:bg-[#2D3F40] transition-all shadow-md ${
                currentStep === 1 ? 'ml-auto' : ''
              }`}
            >
              Next
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
