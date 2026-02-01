// // // app/register/page.tsx
// // 'use client';

// // import { useState, FormEvent } from 'react';

// // type AuthorData = {
// //   designation: string;
// //   name: string;
// //   institution: string;
// // };

// // type FormData = {
// //   author1: AuthorData;
// //   author2: AuthorData;
// //   author3: AuthorData;
// //   author4: AuthorData;
// //   author5: AuthorData;
// //   author6: AuthorData;
// //   authorEmail: string;
// //   authorWhatsApp: string;
// //   articleTitle: string;
// //   participantType: string;
// //   transactionId: string;
// //   paymentDate: string;
// // };

// // export default function RegisterPage() {
// //   const [formData, setFormData] = useState<FormData>({
// //     author1: { designation: '', name: '', institution: '' },
// //     author2: { designation: '', name: '', institution: '' },
// //     author3: { designation: '', name: '', institution: '' },
// //     author4: { designation: '', name: '', institution: '' },
// //     author5: { designation: '', name: '', institution: '' },
// //     author6: { designation: '', name: '', institution: '' },
// //     authorEmail: '',
// //     authorWhatsApp: '',
// //     articleTitle: '',
// //     participantType: '',
// //     transactionId: '',
// //     paymentDate: '',
// //   });

// //   const [abstractFile, setAbstractFile] = useState<File | null>(null);
// //   const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState<Record<string, string>>({});
// //   const [success, setSuccess] = useState(false);

// //   const handleAuthorChange = (
// //     authorNum: string,
// //     field: keyof AuthorData,
// //     value: string
// //   ) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [authorNum]: {
// //         ...prev[authorNum as keyof FormData] as AuthorData,
// //         [field]: value,
// //       },
// //     }));
// //   };

// //   const handleChange = (field: keyof FormData, value: string) => {
// //     setFormData((prev) => ({ ...prev, [field]: value }));
// //     if (errors[field]) {
// //       setErrors((prev) => ({ ...prev, [field]: '' }));
// //     }
// //   };

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setAbstractFile(e.target.files[0]);
// //       if (errors.abstractFile) {
// //         setErrors((prev) => ({ ...prev, abstractFile: '' }));
// //       }
// //     }
// //   };

// //   const handlePaymentScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       const file = e.target.files[0];
// //       if (!file.type.startsWith('image/')) {
// //         setErrors((prev) => ({ ...prev, paymentScreenshot: 'Please upload an image file' }));
// //         return;
// //       }
// //       if (file.size > 5 * 1024 * 1024) {
// //         setErrors((prev) => ({ ...prev, paymentScreenshot: 'Image size must be less than 5MB' }));
// //         return;
// //       }
// //       setPaymentScreenshot(file);
// //       if (errors.paymentScreenshot) {
// //         setErrors((prev) => ({ ...prev, paymentScreenshot: '' }));
// //       }
// //     }
// //   };

// //   const validateForm = (): boolean => {
// //     const newErrors: Record<string, string> = {};

// //     if (!formData.author1.name.trim()) newErrors.author1Name = 'Author 1 name is required';
// //     if (!formData.author1.designation.trim()) newErrors.author1Designation = 'Author 1 designation is required';
// //     if (!formData.author1.institution.trim()) newErrors.author1Institution = 'Author 1 institution is required';

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!formData.authorEmail.trim()) {
// //       newErrors.authorEmail = 'Email is required';
// //     } else if (!emailRegex.test(formData.authorEmail)) {
// //       newErrors.authorEmail = 'Invalid email format';
// //     }

// //     const phoneRegex = /^\+?[1-9]\d{9,14}$/;
// //     if (!formData.authorWhatsApp.trim()) {
// //       newErrors.authorWhatsApp = 'WhatsApp number is required';
// //     } else if (!phoneRegex.test(formData.authorWhatsApp.replace(/\s/g, ''))) {
// //       newErrors.authorWhatsApp = 'Invalid phone number format';
// //     }

// //     if (!formData.articleTitle.trim()) newErrors.articleTitle = 'Article title is required';
// //     if (!abstractFile) newErrors.abstractFile = 'Abstract file is required';
// //     if (!formData.participantType) newErrors.participantType = 'Participant type is required';
// //     if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required';
// //     if (!formData.paymentDate) newErrors.paymentDate = 'Payment date is required';
// //     if (!paymentScreenshot) newErrors.paymentScreenshot = 'Payment screenshot is required';

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e: FormEvent) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) {
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const submitFormData = new FormData();
      
// //       // Add author data
// //       submitFormData.append('author1_designation', formData.author1.designation);
// //       submitFormData.append('author1_name', formData.author1.name);
// //       submitFormData.append('author1_institution', formData.author1.institution);
// //       submitFormData.append('author2_designation', formData.author2.designation);
// //       submitFormData.append('author2_name', formData.author2.name);
// //       submitFormData.append('author2_institution', formData.author2.institution);
// //       submitFormData.append('author3_designation', formData.author3.designation);
// //       submitFormData.append('author3_name', formData.author3.name);
// //       submitFormData.append('author3_institution', formData.author3.institution);
// //       submitFormData.append('author4_designation', formData.author4.designation);
// //       submitFormData.append('author4_name', formData.author4.name);
// //       submitFormData.append('author4_institution', formData.author4.institution);
// //       submitFormData.append('author5_designation', formData.author5.designation);
// //       submitFormData.append('author5_name', formData.author5.name);
// //       submitFormData.append('author5_institution', formData.author5.institution);
// //       submitFormData.append('author6_designation', formData.author6.designation);
// //       submitFormData.append('author6_name', formData.author6.name);
// //       submitFormData.append('author6_institution', formData.author6.institution);
      
// //       // Add contact and article data
// //       submitFormData.append('author_email', formData.authorEmail);
// //       submitFormData.append('author_whatsapp', formData.authorWhatsApp);
// //       submitFormData.append('article_title', formData.articleTitle);
// //       submitFormData.append('participant_type', formData.participantType);
// //       submitFormData.append('transaction_id', formData.transactionId);
// //       submitFormData.append('payment_date', formData.paymentDate);
      
// //       // Add files
// //       if (abstractFile) submitFormData.append('abstractFile', abstractFile);
// //       if (paymentScreenshot) submitFormData.append('paymentScreenshot', paymentScreenshot);

// //       const response = await fetch('/api/register', {
// //         method: 'POST',
// //         body: submitFormData,
// //       });

// //       const result = await response.json();

// //       if (!response.ok) {
// //         throw new Error(result.error || 'Registration failed');
// //       }

// //       setSuccess(true);
// //       setFormData({
// //         author1: { designation: '', name: '', institution: '' },
// //         author2: { designation: '', name: '', institution: '' },
// //         author3: { designation: '', name: '', institution: '' },
// //         author4: { designation: '', name: '', institution: '' },
// //         author5: { designation: '', name: '', institution: '' },
// //         author6: { designation: '', name: '', institution: '' },
// //         authorEmail: '',
// //         authorWhatsApp: '',
// //         articleTitle: '',
// //         participantType: '',
// //         transactionId: '',
// //         paymentDate: '',
// //       });
// //       setAbstractFile(null);
// //       setPaymentScreenshot(null);
      
// //       setTimeout(() => setSuccess(false), 5000);
// //     } catch (error: any) {
// //       setErrors({ submit: error.message || 'Registration failed. Please try again.' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderAuthorFields = (authorNum: string, authorLabel: string, isRequired: boolean = false) => {
// //     const author = formData[authorNum as keyof FormData] as AuthorData;
    
// //     return (
// //       <div className="space-y-4 p-6 rounded-3xl bg-white/50 border border-[#DED0B6]">
// //         <h3 className="text-xl font-medium text-[#607274]">
// //           {authorLabel} {!isRequired && <span className="text-sm text-[#9C8F86]">(Optional)</span>}
// //         </h3>
        
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <div>
// //             <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //               Designation {isRequired && <span className="text-[#1E2A2A]">*</span>}
// //             </label>
// //             <input
// //               type="text"
// //               value={author.designation}
// //               onChange={(e) => handleAuthorChange(authorNum, 'designation', e.target.value)}
// //               className={`w-full px-4 py-3 rounded-full border ${
// //                 errors[`${authorNum}Designation`] ? 'border-red-500' : 'border-[#DED0B6]'
// //               } bg-[#FAFAF8] text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
// //               placeholder="Dr. / Prof. / Mr. / Ms."
// //             />
// //             {errors[`${authorNum}Designation`] && (
// //               <p className="text-xs text-red-500 mt-1">{errors[`${authorNum}Designation`]}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //               Name {isRequired && <span className="text-[#1E2A2A]">*</span>}
// //             </label>
// //             <input
// //               type="text"
// //               value={author.name}
// //               onChange={(e) => handleAuthorChange(authorNum, 'name', e.target.value)}
// //               className={`w-full px-4 py-3 rounded-full border ${
// //                 errors[`${authorNum}Name`] ? 'border-red-500' : 'border-[#DED0B6]'
// //               } bg-[#FAFAF8] text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
// //               placeholder="Full Name"
// //             />
// //             {errors[`${authorNum}Name`] && (
// //               <p className="text-xs text-red-500 mt-1">{errors[`${authorNum}Name`]}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //               Institution {isRequired && <span className="text-[#1E2A2A]">*</span>}
// //             </label>
// //             <input
// //               type="text"
// //               value={author.institution}
// //               onChange={(e) => handleAuthorChange(authorNum, 'institution', e.target.value)}
// //               className={`w-full px-4 py-3 rounded-full border ${
// //                 errors[`${authorNum}Institution`] ? 'border-red-500' : 'border-[#DED0B6]'
// //               } bg-[#FAFAF8] text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
// //               placeholder="University/Organization"
// //             />
// //             {errors[`${authorNum}Institution`] && (
// //               <p className="text-xs text-red-500 mt-1">{errors[`${authorNum}Institution`]}</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#EFEFE8] via-[#FAFAF8] to-[#EFEFE8]">
// //       <div className="bg-[#1E2A2A] py-6 shadow-lg">
// //         <div className="max-w-6xl mx-auto px-6">
// //           <h1 className="text-4xl md:text-5xl font-medium text-[#FAFAF8] pt-20">CIMA'26 Registration</h1>
// //           <p className="text-[#DED0B6] mt-2 text-sm">International Conference on Innovative Materials and Applications</p>
// //         </div>
// //       </div>

// //       <div className="max-w-6xl mx-auto px-6 py-12">
// //         <form onSubmit={handleSubmit} className="space-y-8">
          
// //           {success && (
// //             <div className="p-6 rounded-3xl bg-green-50 border border-green-200">
// //               <p className="text-green-800 font-medium">Registration submitted successfully! You will receive a confirmation email shortly.</p>
// //             </div>
// //           )}

// //           {errors.submit && (
// //             <div className="p-6 rounded-3xl bg-red-50 border border-red-200">
// //               <p className="text-red-800 font-medium">{errors.submit}</p>
// //             </div>
// //           )}

// //           <div className="space-y-6">
// //             <h2 className="text-3xl font-medium text-[#607274]">Author Information</h2>
// //             {renderAuthorFields('author1', 'Author I', true)}
// //             {renderAuthorFields('author2', 'Author II')}
// //             {renderAuthorFields('author3', 'Author III')}
// //             {renderAuthorFields('author4', 'Author IV')}
// //             {renderAuthorFields('author5', 'Author V')}
// //             {renderAuthorFields('author6', 'Author VI')}
// //           </div>

// //           <div className="space-y-6">
// //             <h2 className="text-3xl font-medium text-[#607274]">Contact Details</h2>
// //             <div className="p-6 rounded-3xl bg-white/50 border border-[#DED0B6] space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //                   Email Address <span className="text-[#1E2A2A]">*</span>
// //                 </label>
// //                 <input
// //                   type="email"
// //                   value={formData.authorEmail}
// //                   onChange={(e) => handleChange('authorEmail', e.target.value)}
// //                   className={`w-full px-4 py-3 rounded-full border ${
// //                     errors.authorEmail ? 'border-red-500' : 'border-[#DED0B6]'
// //                   } bg-[#FAFAF8] text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
// //                   placeholder="example@university.edu"
// //                 />
// //                 {errors.authorEmail && (
// //                   <p className="text-xs text-red-500 mt-1">{errors.authorEmail}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //                   WhatsApp Number <span className="text-[#1E2A2A]">*</span>
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   value={formData.authorWhatsApp}
// //                   onChange={(e) => handleChange('authorWhatsApp', e.target.value)}
// //                   className={`w-full px-4 py-3 rounded-full border ${
// //                     errors.authorWhatsApp ? 'border-red-500' : 'border-[#DED0B6]'
// //                   } bg-[#FAFAF8] text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
// //                   placeholder="+91 9876543210"
// //                 />
// //                 {errors.authorWhatsApp && (
// //                   <p className="text-xs text-red-500 mt-1">{errors.authorWhatsApp}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="space-y-6">
// //             <h2 className="text-3xl font-medium text-[#607274]">Article Details</h2>
// //             <div className="p-6 rounded-3xl bg-white/50 border border-[#DED0B6] space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //                   Article Title <span className="text-[#1E2A2A]">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={formData.articleTitle}
// //                   onChange={(e) => handleChange('articleTitle', e.target.value)}
// //                   className={`w-full px-4 py-3 rounded-full border ${
// //                     errors.articleTitle ? 'border-red-500' : 'border-[#DED0B6]'
// //                   } bg-[#FAFAF8] text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
// //                   placeholder="Enter your research article title"
// //                 />
// //                 {errors.articleTitle && (
// //                   <p className="text-xs text-red-500 mt-1">{errors.articleTitle}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //                   Abstract File (PDF/DOC) <span className="text-[#1E2A2A]">*</span>
// //                 </label>
// //                 <input
// //                   type="file"
// //                   accept=".pdf,.doc,.docx"
// //                   onChange={handleFileChange}
// //                   className={`w-full px-4 py-3 rounded-full border ${
// //                     errors.abstractFile ? 'border-red-500' : 'border-[#DED0B6]'
// //                   } bg-[#FAFAF8] text-[#4F5F5F] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#1E2A2A] file:text-[#FAFAF8] hover:file:bg-[#607274] cursor-pointer transition-all`}
// //                 />
// //                 {abstractFile && (
// //                   <p className="text-xs text-[#607274] mt-1">Selected: {abstractFile.name}</p>
// //                 )}
// //                 {errors.abstractFile && (
// //                   <p className="text-xs text-red-500 mt-1">{errors.abstractFile}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //                   Type of Participant <span className="text-[#1E2A2A]">*</span>
// //                 </label>
// //                 <select
// //                   value={formData.participantType}
// //                   onChange={(e) => handleChange('participantType', e.target.value)}
// //                   className={`w-full px-4 py-3 rounded-full border ${
// //                     errors.participantType ? 'border-red-500' : 'border-[#DED0B6]'
// //                   } bg-[#FAFAF8] text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
// //                 >
// //                   <option value="">Select participant type</option>
// //                   <option value="Student">Student</option>
// //                   <option value="Research Scholar">Research Scholar</option>
// //                   <option value="Academicians">Academicians</option>
// //                   <option value="Industry Professional">Industry Professional</option>
// //                   <option value="Independent Researcher">Independent Researcher</option>
// //                 </select>
// //                 {errors.participantType && (
// //                   <p className="text-xs text-red-500 mt-1">{errors.participantType}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="space-y-6">
// //             <h2 className="text-3xl font-medium text-[#607274]">Payment Details</h2>
// //             <div className="p-6 rounded-3xl bg-white/50 border border-[#DED0B6] space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //                   Transaction ID <span className="text-[#1E2A2A]">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={formData.transactionId}
// //                   onChange={(e) => handleChange('transactionId', e.target.value)}
// //                   className={`w-full px-4 py-3 rounded-full border ${
// //                     errors.transactionId ? 'border-red-500' : 'border-[#DED0B6]'
// //                   } bg-[#FAFAF8] text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
// //                   placeholder="Enter payment transaction ID"
// //                 />
// //                 {errors.transactionId && (
// //                   <p className="text-xs text-red-500 mt-1">{errors.transactionId}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //                   Date of Payment <span className="text-[#1E2A2A]">*</span>
// //                 </label>
// //                 <input
// //                   type="date"
// //                   value={formData.paymentDate}
// //                   onChange={(e) => handleChange('paymentDate', e.target.value)}
// //                   max={new Date().toISOString().split('T')[0]}
// //                   className={`w-full px-4 py-3 rounded-full border ${
// //                     errors.paymentDate ? 'border-red-500' : 'border-[#DED0B6]'
// //                   } bg-[#FAFAF8] text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
// //                 />
// //                 {errors.paymentDate && (
// //                   <p className="text-xs text-red-500 mt-1">{errors.paymentDate}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#4F5F5F] mb-2">
// //                   Payment Screenshot <span className="text-[#1E2A2A]">*</span>
// //                 </label>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={handlePaymentScreenshotChange}
// //                   className={`w-full px-4 py-3 rounded-full border ${
// //                     errors.paymentScreenshot ? 'border-red-500' : 'border-[#DED0B6]'
// //                   } bg-[#FAFAF8] text-[#4F5F5F] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#1E2A2A] file:text-[#FAFAF8] hover:file:bg-[#607274] cursor-pointer transition-all`}
// //                 />
// //                 {paymentScreenshot && (
// //                   <p className="text-xs text-[#607274] mt-1">Selected: {paymentScreenshot.name}</p>
// //                 )}
// //                 <p className="text-xs text-[#9C8F86] mt-1">Upload a screenshot of your payment confirmation (JPG, PNG, max 5MB)</p>
// //                 {errors.paymentScreenshot && (
// //                   <p className="text-xs text-red-500 mt-1">{errors.paymentScreenshot}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex justify-center pt-6">
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="px-12 py-4 bg-[#1E2A2A] text-[#FAFAF8] rounded-full font-medium text-lg hover:bg-[#607274] focus:outline-none focus:ring-4 focus:ring-[#607274]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
// //             >
// //               {loading ? 'Submitting...' : 'Complete Registration'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       <div className="bg-[#1E2A2A] py-8 mt-16">
// //         <div className="max-w-6xl mx-auto px-6 text-center">
// //           <p className="text-[#DED0B6] text-sm">© 2026 CIMA. All rights reserved.</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



















// // app/register/page.tsx
// 'use client';

// import { useState, FormEvent } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Users, 
//   Mail, 
//   Smartphone, 
//   FileText, 
//   CreditCard, 
//   CheckCircle, 
//   Upload, 
//   Plus, 
//   Trash2, 
//   ChevronRight, 
//   ChevronLeft, 
//   AlertCircle,
//   User,
//   Building2,
//   GraduationCap,
//   Calendar,
//   Receipt
// } from 'lucide-react';

// type AuthorData = {
//   designation: string;
//   name: string;
//   institution: string;
// };

// type FormData = {
//   authors: AuthorData[]; // Changed to array for easier management
//   authorEmail: string;
//   authorWhatsApp: string;
//   articleTitle: string;
//   participantType: string;
//   transactionId: string;
//   paymentDate: string;
// };

// const MAX_AUTHORS = 5;

// export default function RegisterPage() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [visibleAuthors, setVisibleAuthors] = useState(1); // Start with 1 author visible
  
//   const [formData, setFormData] = useState<FormData>({
//     authors: Array(MAX_AUTHORS).fill(null).map(() => ({
//       designation: '',
//       name: '',
//       institution: ''
//     })),
//     authorEmail: '',
//     authorWhatsApp: '',
//     articleTitle: '',
//     participantType: '',
//     transactionId: '',
//     paymentDate: '',
//   });

//   const [abstractFile, setAbstractFile] = useState<File | null>(null);
//   const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [success, setSuccess] = useState(false);

//   const steps = [
//     { id: 1, title: 'Authors', subtitle: 'Research Team', icon: Users },
//     { id: 2, title: 'Contact', subtitle: 'Communication', icon: Mail },
//     { id: 3, title: 'Article', subtitle: 'Submission Details', icon: FileText },
//     { id: 4, title: 'Payment', subtitle: 'Transaction Info', icon: CreditCard },
//     { id: 5, title: 'Review', subtitle: 'Confirm & Submit', icon: CheckCircle },
//   ];

//   const addAuthor = () => {
//     if (visibleAuthors < MAX_AUTHORS) {
//       setVisibleAuthors(prev => prev + 1);
//     }
//   };

//   const removeAuthor = (index: number) => {
//     if (visibleAuthors > 1 && index === visibleAuthors - 1) {
//       // Clear the data for this author
//       handleAuthorChange(index, 'designation', '');
//       handleAuthorChange(index, 'name', '');
//       handleAuthorChange(index, 'institution', '');
//       setVisibleAuthors(prev => prev - 1);
//     }
//   };

//   const handleAuthorChange = (index: number, field: keyof AuthorData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       authors: prev.authors.map((author, i) => 
//         i === index ? { ...author, [field]: value } : author
//       ),
//     }));
//     if (errors[`author${index + 1}${field}`]) {
//       setErrors((prev) => ({ ...prev, [`author${index + 1}${field}`]: '' }));
//     }
//   };

//   const handleChange = (field: keyof Omit<FormData, 'authors'>, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: '' }));
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'abstract' | 'payment') => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       if (type === 'abstract') {
//         setAbstractFile(file);
//         if (errors.abstractFile) setErrors((prev) => ({ ...prev, abstractFile: '' }));
//       } else {
//         if (!file.type.startsWith('image/')) {
//           setErrors((prev) => ({ ...prev, paymentScreenshot: 'Please upload an image file' }));
//           return;
//         }
//         if (file.size > 5 * 1024 * 1024) {
//           setErrors((prev) => ({ ...prev, paymentScreenshot: 'Image size must be less than 5MB' }));
//           return;
//         }
//         setPaymentScreenshot(file);
//         if (errors.paymentScreenshot) setErrors((prev) => ({ ...prev, paymentScreenshot: '' }));
//       }
//     }
//   };

//   const validateStep = (step: number): boolean => {
//     const newErrors: Record<string, string> = {};
//     let isValid = true;

//     if (step === 1) {
//       // Validate only first author (primary)
//       const primary = formData.authors[0];
//       if (!primary.name.trim()) {
//         newErrors.author1name = 'Primary author name is required';
//         isValid = false;
//       }
//       if (!primary.designation.trim()) {
//         newErrors.author1designation = 'Designation is required';
//         isValid = false;
//       }
//       if (!primary.institution.trim()) {
//         newErrors.author1institution = 'Institution is required';
//         isValid = false;
//       }
      
//       // Validate any other visible authors that have partial data
//       for (let i = 1; i < visibleAuthors; i++) {
//         const author = formData.authors[i];
//         if (author.name || author.designation || author.institution) {
//           if (!author.name.trim()) newErrors[`author${i+1}name`] = 'Name is required if filling co-author';
//           if (!author.designation.trim()) newErrors[`author${i+1}designation`] = 'Designation is required';
//           if (!author.institution.trim()) newErrors[`author${i+1}institution`] = 'Institution is required';
//         }
//       }
//     }

//     if (step === 2) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!formData.authorEmail.trim()) {
//         newErrors.authorEmail = 'Email is required';
//         isValid = false;
//       } else if (!emailRegex.test(formData.authorEmail)) {
//         newErrors.authorEmail = 'Invalid email format';
//         isValid = false;
//       }

//       const phoneRegex = /^\+?[1-9]\d{9,14}$/;
//       if (!formData.authorWhatsApp.trim()) {
//         newErrors.authorWhatsApp = 'WhatsApp number is required';
//         isValid = false;
//       } else if (!phoneRegex.test(formData.authorWhatsApp.replace(/\s/g, ''))) {
//         newErrors.authorWhatsApp = 'Invalid phone number format';
//         isValid = false;
//       }
//     }

//     if (step === 3) {
//       if (!formData.articleTitle.trim()) {
//         newErrors.articleTitle = 'Article title is required';
//         isValid = false;
//       }
//       if (!abstractFile) {
//         newErrors.abstractFile = 'Abstract file is required';
//         isValid = false;
//       }
//       if (!formData.participantType) {
//         newErrors.participantType = 'Participant type is required';
//         isValid = false;
//       }
//     }

//     if (step === 4) {
//       if (!formData.transactionId.trim()) {
//         newErrors.transactionId = 'Transaction ID is required';
//         isValid = false;
//       }
//       if (!formData.paymentDate) {
//         newErrors.paymentDate = 'Payment date is required';
//         isValid = false;
//       }
//       if (!paymentScreenshot) {
//         newErrors.paymentScreenshot = 'Payment screenshot is required';
//         isValid = false;
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep((prev) => Math.min(prev + 1, 5));
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handlePrev = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validateStep(4)) return;

//     setLoading(true);
//     try {
//       const submitFormData = new FormData();
      
//       // Only append authors that have data (fix for empty fields issue)
//       let authorCount = 0;
//       formData.authors.forEach((author, index) => {
//         if (author.name.trim()) { // Only include if name is not empty
//           authorCount++;
//           submitFormData.append(`author${index + 1}_designation`, author.designation);
//           submitFormData.append(`author${index + 1}_name`, author.name);
//           submitFormData.append(`author${index + 1}_institution`, author.institution);
//         }
//       });

//       // If no valid authors found, at least send primary (shouldn't happen due to validation)
//       if (authorCount === 0) {
//         submitFormData.append('author1_designation', formData.authors[0].designation);
//         submitFormData.append('author1_name', formData.authors[0].name);
//         submitFormData.append('author1_institution', formData.authors[0].institution);
//       }
      
//       // Add contact and article data
//       submitFormData.append('author_email', formData.authorEmail);
//       submitFormData.append('author_whatsapp', formData.authorWhatsApp);
//       submitFormData.append('article_title', formData.articleTitle);
//       submitFormData.append('participant_type', formData.participantType);
//       submitFormData.append('transaction_id', formData.transactionId);
//       submitFormData.append('payment_date', formData.paymentDate);
      
//       // Add files
//       if (abstractFile) submitFormData.append('abstractFile', abstractFile);
//       if (paymentScreenshot) submitFormData.append('paymentScreenshot', paymentScreenshot);

//       const response = await fetch('/api/register', {
//         method: 'POST',
//         body: submitFormData,
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.error || 'Registration failed');

//       setSuccess(true);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } catch (error: any) {
//       setErrors({ submit: error.message || 'Registration failed. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderTimeline = () => (
//     <div className="mb-10">
//       <div className="flex items-center justify-between relative">
//         <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#E5E7EB] -translate-y-1/2 z-0" />
//         <div 
//           className="absolute left-0 top-1/2 h-0.5 bg-[#1E2A2A] -translate-y-1/2 z-0 transition-all duration-500"
//           style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
//         />
        
//         {steps.map((step, index) => {
//           const isCompleted = currentStep > step.id;
//           const isCurrent = currentStep === step.id;
//           const Icon = step.icon;
          
//           return (
//             <div key={step.id} className="relative z-10 flex flex-col items-center">
//               <motion.div
//                 initial={false}
//                 animate={{
//                   scale: isCurrent ? 1.1 : 1,
//                   backgroundColor: isCompleted ? '#1E2A2A' : isCurrent ? '#1E2A2A' : '#ffffff',
//                   borderColor: isCompleted || isCurrent ? '#1E2A2A' : '#E5E7EB',
//                 }}
//                 className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 shadow-md transition-colors duration-300 ${
//                   isCurrent ? 'ring-4 ring-[#1E2A2A]/10' : ''
//                 }`}
//               >
//                 <Icon 
//                   size={20} 
//                   className={isCompleted || isCurrent ? 'text-[#FAFAF8]' : 'text-[#607274]'} 
//                 />
//               </motion.div>
//               <div className="mt-2 text-center hidden sm:block">
//                 <p className={`text-xs font-semibold uppercase tracking-wider ${isCurrent ? 'text-[#1E2A2A]' : 'text-[#9CA3AF]'}`}>
//                   {step.title}
//                 </p>
//                 <p className="text-[10px] text-[#9CA3AF] mt-0.5">{step.subtitle}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

//   const renderAuthorCard = (index: number) => {
//     const author = formData.authors[index];
//     const isPrimary = index === 0;
//     const authorNum = index + 1;
//     const canRemove = !isPrimary && index === visibleAuthors - 1;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E7EB] shadow-sm relative group"
//       >
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-[#1E2A2A] text-[#FAFAF8] flex items-center justify-center">
//               <User size={20} />
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-[#1E2A2A]">
//                 {isPrimary ? 'Primary Author' : `Co-Author ${index}`}
//               </h3>
//               {!isPrimary && <span className="text-xs text-[#9CA3AF]">Optional</span>}
//             </div>
//           </div>
          
//           {canRemove && (
//             <button
//               type="button"
//               onClick={() => removeAuthor(index)}
//               className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//               title="Remove author"
//             >
//               <Trash2 size={18} />
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="space-y-1.5">
//             <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider flex items-center gap-1">
//               <GraduationCap size={12} />
//               Designation {isPrimary && <span className="text-red-500">*</span>}
//             </label>
//             <input
//               type="text"
//               value={author.designation}
//               onChange={(e) => handleAuthorChange(index, 'designation', e.target.value)}
//               placeholder="Dr. / Prof. / Mr."
//               className={`w-full px-4 py-2.5 rounded-xl border ${
//                 errors[`author${authorNum}designation`] ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
//               } focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all text-sm`}
//             />
//             {errors[`author${authorNum}designation`] && (
//               <p className="text-xs text-red-500 flex items-center gap-1">
//                 <AlertCircle size={10} /> {errors[`author${authorNum}designation`]}
//               </p>
//             )}
//           </div>

//           <div className="space-y-1.5">
//             <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider flex items-center gap-1">
//               <User size={12} />
//               Full Name {isPrimary && <span className="text-red-500">*</span>}
//             </label>
//             <input
//               type="text"
//               value={author.name}
//               onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
//               placeholder="John Doe"
//               className={`w-full px-4 py-2.5 rounded-xl border ${
//                 errors[`author${authorNum}name`] ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
//               } focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all text-sm`}
//             />
//             {errors[`author${authorNum}name`] && (
//               <p className="text-xs text-red-500 flex items-center gap-1">
//                 <AlertCircle size={10} /> {errors[`author${authorNum}name`]}
//               </p>
//             )}
//           </div>

//           <div className="space-y-1.5">
//             <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider flex items-center gap-1">
//               <Building2 size={12} />
//               Institution {isPrimary && <span className="text-red-500">*</span>}
//             </label>
//             <input
//               type="text"
//               value={author.institution}
//               onChange={(e) => handleAuthorChange(index, 'institution', e.target.value)}
//               placeholder="University/Organization"
//               className={`w-full px-4 py-2.5 rounded-xl border ${
//                 errors[`author${authorNum}institution`] ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
//               } focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all text-sm`}
//             />
//             {errors[`author${authorNum}institution`] && (
//               <p className="text-xs text-red-500 flex items-center gap-1">
//                 <AlertCircle size={10} /> {errors[`author${authorNum}institution`]}
//               </p>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-2xl font-light text-[#1E2A2A]">Author Information</h2>
//                 <p className="text-sm text-[#9CA3AF] mt-1">Add all contributing authors to this research</p>
//               </div>
//               <span className="text-xs font-medium px-3 py-1 bg-[#1E2A2A]/10 text-[#1E2A2A] rounded-full">
//                 {visibleAuthors} of {MAX_AUTHORS}
//               </span>
//             </div>
            
//             <div className="space-y-4">
//               {Array.from({ length: visibleAuthors }).map((_, index) => (
//                 <div key={index}>
//                   {renderAuthorCard(index)}
//                 </div>
//               ))}
//             </div>

//             {visibleAuthors < MAX_AUTHORS && (
//               <motion.button
//                 type="button"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 onClick={addAuthor}
//                 className="w-full py-4 border-2 border-dashed border-[#DED0B6] rounded-2xl text-[#607274] hover:border-[#1E2A2A] hover:text-[#1E2A2A] transition-all flex items-center justify-center gap-2 group"
//               >
//                 <div className="w-8 h-8 rounded-full bg-[#EFEFE8] group-hover:bg-[#1E2A2A] group-hover:text-white flex items-center justify-center transition-colors">
//                   <Plus size={18} />
//                 </div>
//                 <span className="font-medium">Add Co-Author</span>
//               </motion.button>
//             )}
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6 max-w-2xl mx-auto">
//             <div className="mb-6">
//               <h2 className="text-2xl font-light text-[#1E2A2A]">Contact Details</h2>
//               <p className="text-sm text-[#9CA3AF] mt-1">How we'll communicate with you</p>
//             </div>
            
//             <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
//                     <Mail size={16} className="text-[#607274]" />
//                     Email Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     value={formData.authorEmail}
//                     onChange={(e) => handleChange('authorEmail', e.target.value)}
//                     className={`w-full px-4 py-3 rounded-xl border ${
//                       errors.authorEmail ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
//                     } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
//                     placeholder="corresponding.author@university.edu"
//                   />
//                   {errors.authorEmail && (
//                     <p className="text-xs text-red-500 flex items-center gap-1">
//                       <AlertCircle size={10} /> {errors.authorEmail}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
//                     <Smartphone size={16} className="text-[#607274]" />
//                     WhatsApp Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.authorWhatsApp}
//                     onChange={(e) => handleChange('authorWhatsApp', e.target.value)}
//                     className={`w-full px-4 py-3 rounded-xl border ${
//                       errors.authorWhatsApp ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
//                     } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
//                     placeholder="+1 234 567 8900"
//                   />
//                   {errors.authorWhatsApp && (
//                     <p className="text-xs text-red-500 flex items-center gap-1">
//                       <AlertCircle size={10} /> {errors.authorWhatsApp}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6 max-w-2xl mx-auto">
//             <div className="mb-6">
//               <h2 className="text-2xl font-light text-[#1E2A2A]">Article Details</h2>
//               <p className="text-sm text-[#9CA3AF] mt-1">Information about your submission</p>
//             </div>
            
//             <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E7EB] shadow-sm space-y-6">
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
//                   <FileText size={16} className="text-[#607274]" />
//                   Article Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.articleTitle}
//                   onChange={(e) => handleChange('articleTitle', e.target.value)}
//                   className={`w-full px-4 py-3 rounded-xl border ${
//                     errors.articleTitle ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
//                   } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
//                   placeholder="Enter the full title of your research article"
//                 />
//                 {errors.articleTitle && (
//                   <p className="text-xs text-red-500 flex items-center gap-1">
//                     <AlertCircle size={10} /> {errors.articleTitle}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
//                   <Users size={16} className="text-[#607274]" />
//                   Participant Category <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={formData.participantType}
//                   onChange={(e) => handleChange('participantType', e.target.value)}
//                   className={`w-full px-4 py-3 rounded-xl border ${
//                     errors.participantType ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
//                   } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
//                 >
//                   <option value="">Select category...</option>
//                   <option value="Student">Student</option>
//                   <option value="Research Scholar">Research Scholar</option>
//                   <option value="Academicians">Academicians</option>
//                   <option value="Industry Professional">Industry Professional</option>
//                   <option value="Independent Researcher">Independent Researcher</option>
//                 </select>
//                 {errors.participantType && (
//                   <p className="text-xs text-red-500 flex items-center gap-1">
//                     <AlertCircle size={10} /> {errors.participantType}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
//                   <Upload size={16} className="text-[#607274]" />
//                   Abstract Document <span className="text-red-500">*</span>
//                 </label>
//                 <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors relative ${
//                   errors.abstractFile ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] hover:border-[#607274] bg-white'
//                 }`}>
//                   <input
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     onChange={(e) => handleFileChange(e, 'abstract')}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     id="abstract-upload"
//                   />
//                   <div className="pointer-events-none">
//                     <div className="w-12 h-12 bg-[#EFEFE8] rounded-full flex items-center justify-center mx-auto mb-3">
//                       <FileText size={24} className="text-[#607274]" />
//                     </div>
//                     <p className="text-sm text-[#1E2A2A] font-medium">
//                       {abstractFile ? abstractFile.name : 'Click to upload abstract'}
//                     </p>
//                     <p className="text-xs text-[#9CA3AF] mt-1">PDF or Word (Max 10MB)</p>
//                   </div>
//                 </div>
//                 {errors.abstractFile && (
//                   <p className="text-xs text-red-500 flex items-center gap-1">
//                     <AlertCircle size={10} /> {errors.abstractFile}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6 max-w-2xl mx-auto">
//             <div className="mb-6">
//               <h2 className="text-2xl font-light text-[#1E2A2A]">Payment Verification</h2>
//               <p className="text-sm text-[#9CA3AF] mt-1">Secure transaction details</p>
//             </div>
            
//             {/* <div className="bg-gradient-to-br from-[#1E2A2A] to-[#2D3F40] text-[#FAFAF8] rounded-2xl p-6 mb-6 shadow-lg">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="text-lg font-medium mb-1 flex items-center gap-2">
//                     <Receipt size={20} />
//                     Registration Fee
//                   </h3>
//                   <p className="text-sm opacity-70">Standard registration includes conference kit and proceedings</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-3xl font-light">$299</div>
//                   <div className="text-xs opacity-70">USD</div>
//                 </div>
//               </div>
//               <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-60">
//                 Early bird discount applied if registered before March 2026
//               </div>
//             </div> */}

//             <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E7EB] shadow-sm space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
//                     <Receipt size={16} className="text-[#607274]" />
//                     Transaction ID <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.transactionId}
//                     onChange={(e) => handleChange('transactionId', e.target.value)}
//                     className={`w-full px-4 py-3 rounded-xl border ${
//                       errors.transactionId ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
//                     } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all uppercase tracking-wider`}
//                     placeholder="TXN123456"
//                   />
//                   {errors.transactionId && (
//                     <p className="text-xs text-red-500 flex items-center gap-1">
//                       <AlertCircle size={10} /> {errors.transactionId}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
//                     <Calendar size={16} className="text-[#607274]" />
//                     Payment Date <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     value={formData.paymentDate}
//                     max={new Date().toISOString().split('T')[0]}
//                     onChange={(e) => handleChange('paymentDate', e.target.value)}
//                     className={`w-full px-4 py-3 rounded-xl border ${
//                       errors.paymentDate ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
//                     } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
//                   />
//                   {errors.paymentDate && (
//                     <p className="text-xs text-red-500 flex items-center gap-1">
//                       <AlertCircle size={10} /> {errors.paymentDate}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-medium text-[#4F5F5F]">
//                   <Upload size={16} className="text-[#607274]" />
//                   Payment Screenshot <span className="text-red-500">*</span>
//                 </label>
//                 <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors relative ${
//                   errors.paymentScreenshot ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] hover:border-[#607274] bg-white'
//                 }`}>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleFileChange(e, 'payment')}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     id="payment-upload"
//                   />
//                   <div className="pointer-events-none">
//                     {paymentScreenshot ? (
//                       <div className="flex flex-col items-center text-green-600">
//                         <CheckCircle size={32} className="mb-2" />
//                         <p className="text-sm font-medium">{paymentScreenshot.name}</p>
//                         <p className="text-xs text-[#9CA3AF] mt-1">Click to change file</p>
//                       </div>
//                     ) : (
//                       <>
//                         <div className="w-12 h-12 bg-[#EFEFE8] rounded-full flex items-center justify-center mx-auto mb-3">
//                           <CreditCard size={24} className="text-[#607274]" />
//                         </div>
//                         <p className="text-sm text-[#1E2A2A] font-medium">Upload payment receipt</p>
//                         <p className="text-xs text-[#9CA3AF] mt-1">JPG or PNG (Max 5MB)</p>
//                       </>
//                     )}
//                   </div>
//                 </div>
//                 {errors.paymentScreenshot && (
//                   <p className="text-xs text-red-500 flex items-center gap-1">
//                     <AlertCircle size={10} /> {errors.paymentScreenshot}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 5:
//         const validAuthors = formData.authors.filter(a => a.name.trim());
        
//         return (
//           <div className="space-y-6 max-w-2xl mx-auto">
//             <div className="mb-6">
//               <h2 className="text-2xl font-light text-[#1E2A2A]">Review Submission</h2>
//               <p className="text-sm text-[#9CA3AF] mt-1">Please verify all information before submitting</p>
//             </div>
            
//             <div className="bg-[#FAFAF8] rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
//               <div className="bg-[#1E2A2A] text-[#FAFAF8] px-6 py-4 flex justify-between items-center">
//                 <h3 className="font-medium flex items-center gap-2">
//                   <FileText size={18} />
//                   Submission Summary
//                 </h3>
//                 <button 
//                   onClick={() => setCurrentStep(1)}
//                   className="text-xs underline hover:text-[#DED0B6] transition-colors"
//                 >
//                   Edit Details
//                 </button>
//               </div>
              
//               <div className="p-6 space-y-4 text-sm">
//                 <div className="pb-4 border-b border-[#E5E7EB]">
//                   <span className="text-[#9CA3AF] block mb-2 flex items-center gap-2">
//                     <Users size={14} /> Authors ({validAuthors.length})
//                   </span>
//                   <div className="space-y-2">
//                     {validAuthors.map((author, idx) => (
//                       <div key={idx} className="font-medium text-[#1E2A2A]">
//                         {author.designation} {author.name}, {author.institution}
//                         {idx === 0 && <span className="text-xs bg-[#1E2A2A]/10 text-[#1E2A2A] px-2 py-0.5 rounded ml-2">Primary</span>}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#E5E7EB]">
//                   <div>
//                     <span className="text-[#9CA3AF] block mb-1 flex items-center gap-2">
//                       <Mail size={14} /> Email
//                     </span>
//                     <span className="font-medium text-[#1E2A2A]">{formData.authorEmail}</span>
//                   </div>
//                   <div>
//                     <span className="text-[#9CA3AF] block mb-1 flex items-center gap-2">
//                       <Smartphone size={14} /> WhatsApp
//                     </span>
//                     <span className="font-medium text-[#1E2A2A]">{formData.authorWhatsApp}</span>
//                   </div>
//                 </div>

//                 <div className="pb-4 border-b border-[#E5E7EB]">
//                   <span className="text-[#9CA3AF] block mb-1 flex items-center gap-2">
//                     <FileText size={14} /> Article
//                   </span>
//                   <div className="font-medium text-[#1E2A2A]">{formData.articleTitle}</div>
//                   <div className="flex items-center gap-4 mt-2 text-xs">
//                     <span className="px-2 py-1 bg-[#EFEFE8] rounded text-[#607274]">{formData.participantType}</span>
//                     {abstractFile && <span className="text-green-600 flex items-center gap-1"><CheckCircle size={12} /> Abstract attached</span>}
//                   </div>
//                 </div>

//                 <div>
//                   <span className="text-[#9CA3AF] block mb-1 flex items-center gap-2">
//                     <CreditCard size={14} /> Payment
//                   </span>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="font-medium text-[#1E2A2A] font-mono">{formData.transactionId}</div>
//                       <div className="text-xs text-[#9CA3AF]">{formData.paymentDate}</div>
//                     </div>
//                     {paymentScreenshot && <CheckCircle size={20} className="text-green-600" />}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
//               <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={18} />
//               <div className="text-sm text-blue-800">
//                 <p className="font-medium mb-1">Before submitting:</p>
//                 <p className="opacity-80">Please verify all details are correct. You will receive a confirmation email at {formData.authorEmail} within 24 hours.</p>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen bg-[#EFEFE8] flex items-center justify-center p-6">
//         <motion.div 
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="bg-white rounded-3xl p-12 max-w-lg w-full text-center shadow-2xl border border-[#E5E7EB]"
//         >
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle size={40} className="text-green-600" />
//           </div>
//           <h2 className="text-3xl font-light text-[#1E2A2A] mb-4">Registration Complete!</h2>
//           <p className="text-[#607274] mb-8">
//             Thank you for registering for CIMA'26. A confirmation has been sent to{' '}
//             <span className="font-medium text-[#1E2A2A]">{formData.authorEmail}</span>
//           </p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-8 py-3 bg-[#1E2A2A] text-[#FAFAF8] rounded-full hover:bg-[#607274] transition-colors font-medium"
//           >
//             Submit Another Paper
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#EFEFE8] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8 mt-20">
//           <motion.div
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="inline-block"
//           >
//             <span className="px-4 py-1.5 rounded-full bg-[#1E2A2A] text-[#DED0B6] text-xs font-semibold tracking-wider uppercase mb-4 inline-block">
//               CIMA'26 Conference
//             </span>
//             <h1 className="text-4xl md:text-5xl font-light text-[#1E2A2A] mb-2">
//               Registration
//             </h1>
//             <p className="text-[#607274]">International Conference on Innovative Materials and Applications</p>
//           </motion.div>
//         </div>

//         <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
//           <div className="p-8 md:p-12">
//             {renderTimeline()}

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentStep}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {renderStepContent()}
//               </motion.div>
//             </AnimatePresence>

//             {errors.submit && (
//               <motion.div 
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm text-center flex items-center justify-center gap-2"
//               >
//                 <AlertCircle size={16} />
//                 {errors.submit}
//               </motion.div>
//             )}

//             <div className="mt-8 flex justify-between items-center pt-6 border-t border-[#E5E7EB]">
//               <button
//                 type="button"
//                 onClick={handlePrev}
//                 disabled={currentStep === 1}
//                 className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
//                   currentStep === 1 
//                     ? 'opacity-0 cursor-default' 
//                     : 'bg-[#EFEFE8] text-[#1E2A2A] hover:bg-[#DED0B6]'
//                 }`}
//               >
//                 <ChevronLeft size={16} />
//                 Previous
//               </button>

//               <div className="flex gap-2">
//                 {steps.map((step) => (
//                   <button
//                     key={step.id}
//                     onClick={() => step.id < currentStep && setCurrentStep(step.id)}
//                     className={`w-2 h-2 rounded-full transition-all ${
//                       step.id === currentStep ? 'bg-[#1E2A2A] w-6' : 
//                       step.id < currentStep ? 'bg-[#607274] cursor-pointer' : 'bg-[#E5E7EB]'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {currentStep < 5 ? (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   className="flex items-center gap-2 px-8 py-2.5 bg-[#1E2A2A] text-[#FAFAF8] rounded-full text-sm font-medium hover:bg-[#607274] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 >
//                   Next Step
//                   <ChevronRight size={16} />
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="flex items-center gap-2 px-8 py-2.5 bg-green-700 text-white rounded-full text-sm font-medium hover:bg-green-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       <CheckCircle size={16} />
//                       Complete Registration
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* <div className="mt-8 text-center text-xs text-[#9CA3AF] flex items-center justify-center gap-4">
//           <span>© 2026 CIMA. All rights reserved.</span>
//           <span>•</span>
//           <span className="flex items-center gap-1">
//             <CheckCircle size={12} /> Secure SSL Encryption
//           </span>
//         </div> */}
//       </div>
//     </div>
//   );
// }














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
  IndianRupee,
  Landmark,
  Copy,
  Info,
  FileCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type AuthorData = {
  designation: string;
  name: string;
  institution: string;
};

type FormData = {
  authors: AuthorData[];
  authorWhatsApp: string;
  articleTitle: string;
  participantType: string;
  transactionId: string;
  paymentDate: string;
};

const MAX_AUTHORS = 5;

// Pricing configuration
const PRICING = {
  'Student': { amount: 1000, label: 'Student (UG/PG)' },
  'Research Scholar': { amount: 1500, label: 'Research Scholar' },
  'Academicians': { amount: 2000, label: 'Academicians' },
  'Industry Professional': { amount: 3000, label: 'Industry Professional' },
} as const;

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
  const [existingRegistration, setExistingRegistration] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    authors: Array(MAX_AUTHORS).fill(null).map(() => ({
      designation: '',
      name: '',
      institution: ''
    })),
    authorWhatsApp: '',
    articleTitle: '',
    participantType: '',
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
          setExistingRegistration(regData.registration);
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
      handleAuthorChange(index, 'designation', '');
      handleAuthorChange(index, 'name', '');
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

  const getRegistrationFee = () => {
    if (!formData.participantType) return null;
    return PRICING[formData.participantType as keyof typeof PRICING];
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
      if (!primary.designation.trim()) {
        newErrors.author1designation = 'Designation is required';
        isValid = false;
      }
      if (!primary.institution.trim()) {
        newErrors.author1institution = 'Institution is required';
        isValid = false;
      }
      
      for (let i = 1; i < visibleAuthors; i++) {
        const author = formData.authors[i];
        if (author.name || author.designation || author.institution) {
          if (!author.name.trim()) newErrors[`author${i+1}name`] = 'Name is required if filling co-author';
          if (!author.designation.trim()) newErrors[`author${i+1}designation`] = 'Designation is required';
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
      if (!formData.participantType) {
        newErrors.participantType = 'Participant type is required';
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
          submitFormData.append(`author${index + 1}_designation`, author.designation);
          submitFormData.append(`author${index + 1}_name`, author.name);
          submitFormData.append(`author${index + 1}_institution`, author.institution);
        }
      });

      submitFormData.append('author_whatsapp', formData.authorWhatsApp);
      submitFormData.append('article_title', formData.articleTitle);
      submitFormData.append('participant_type', formData.participantType);
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

  if (existingRegistration && !success) {
    return (
      <div className="min-h-screen bg-[#EFEFE8] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-12 max-w-lg w-full text-center shadow-2xl border border-[#E5E7EB]"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileCheck size={40} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-light text-[#1E2A2A] mb-4">Registration In Process</h2>
          <p className="text-[#607274] mb-6">
            You have already submitted a registration for <span className="font-medium text-[#1E2A2A]">{existingRegistration.article_title}</span>.
          </p>
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm px-4 py-2 bg-[#FAFAF8] rounded-lg">
              <span className="text-[#9CA3AF]">Status</span>
              <span className="font-medium text-[#1E2A2A] capitalize">{existingRegistration.status}</span>
            </div>
            <div className="flex justify-between text-sm px-4 py-2 bg-[#FAFAF8] rounded-lg">
              <span className="text-[#9CA3AF]">Submitted</span>
              <span className="font-medium text-[#1E2A2A]">
                {new Date(existingRegistration.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-8 py-3 bg-[#1E2A2A] text-[#FAFAF8] rounded-full hover:bg-[#607274] transition-colors font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </motion.div>
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
                <p className={`text-xs font-semibold uppercase tracking-wider ${isCurrent ? 'text-[#1E2A2A]' : 'text-[#9CA3AF]'}`}>
                  {step.title}
                </p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5">{step.subtitle}</p>
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
              {!isPrimary && <span className="text-xs text-[#9CA3AF]">Optional</span>}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider flex items-center gap-1">
              <GraduationCap size={12} />
              Designation {isPrimary && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={author.designation}
              onChange={(e) => handleAuthorChange(index, 'designation', e.target.value)}
              placeholder="Dr. / Prof. / Mr."
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors[`author${authorNum}designation`] ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
              } focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all text-sm`}
            />
            {errors[`author${authorNum}designation`] && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={10} /> {errors[`author${authorNum}designation`]}
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
              className={`w-full px-4 py-2.5 rounded-xl border ${
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
              <Building2 size={12} />
              Institution {isPrimary && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={author.institution}
              onChange={(e) => handleAuthorChange(index, 'institution', e.target.value)}
              placeholder="University/Organization"
              className={`w-full px-4 py-2.5 rounded-xl border ${
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
    const fee = getRegistrationFee();

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-light text-[#1E2A2A]">Author Information</h2>
                <p className="text-sm text-[#9CA3AF] mt-1">Add all contributing authors to this research</p>
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
              <p className="text-sm text-[#9CA3AF] mt-1">How we'll communicate with you</p>
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
                  <p className="text-xs text-[#9CA3AF]">Using your account email</p>
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
                    className={`w-full px-4 py-3 rounded-xl border ${
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
              <p className="text-sm text-[#9CA3AF] mt-1">Information about your submission</p>
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
                  className={`w-full px-4 py-3 rounded-xl border ${
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
                  <Users size={16} className="text-[#607274]" />
                  Participant Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.participantType}
                  onChange={(e) => handleChange('participantType', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.participantType ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'
                  } bg-white focus:outline-none focus:ring-2 focus:ring-[#607274] transition-all`}
                >
                  <option value="">Select category...</option>
                  {Object.entries(PRICING).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label} - ₹{value.amount}
                    </option>
                  ))}
                </select>
                {errors.participantType && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.participantType}
                  </p>
                )}
              </div>

              {/* Fee Display */}
              {fee && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-[#1E2A2A] to-[#2D3F40] text-[#FAFAF8] rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <IndianRupee size={20} />
                    </div>
                    <div>
                      <p className="text-xs opacity-70">Registration Fee</p>
                      <p className="text-lg font-medium">₹{fee.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70">Category</p>
                    <p className="text-sm">{fee.label}</p>
                  </div>
                </motion.div>
              )}

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
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="abstract-upload"
                  />
                  <div className="pointer-events-none">
                    <div className="w-12 h-12 bg-[#EFEFE8] rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText size={24} className="text-[#607274]" />
                    </div>
                    <p className="text-sm text-[#1E2A2A] font-medium">
                      {abstractFile ? abstractFile.name : 'Click to upload abstract'}
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-1">PDF or Word (Max 10MB)</p>
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
              <p className="text-sm text-[#9CA3AF] mt-1">Complete your registration fee payment</p>
            </div>

            {/* Fee Summary Card */}
            {fee && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-[#1E2A2A] to-[#2D3F40] text-[#FAFAF8] rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1 flex items-center gap-2">
                      <Receipt size={20} />
                      Payment Summary
                    </h3>
                    <p className="text-sm opacity-70">{fee.label}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-light flex items-center justify-end gap-1">
                      <IndianRupee size={24} />
                      {fee.amount}
                    </div>
                    <div className="text-xs opacity-70">INR</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20 text-xs opacity-60">
                  Please pay the exact amount to complete your registration
                </div>
              </motion.div>
            )}

            {/* Bank Details Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
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
                      <p className="text-xs text-[#9CA3AF]">Beneficiary Name</p>
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
                      <p className="text-xs text-[#9CA3AF]">Bank Name</p>
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
                      <p className="text-xs text-[#9CA3AF]">Branch</p>
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
                    <p className="text-xs text-[#9CA3AF]">Account Number</p>
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
                    <p className="text-xs text-[#9CA3AF]">IFSC Code</p>
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
                    className={`w-full px-4 py-3 rounded-xl border ${
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
                    className={`w-full px-4 py-3 rounded-xl border ${
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
                        <p className="text-xs text-[#9CA3AF] mt-1">Click to change file</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-[#EFEFE8] rounded-full flex items-center justify-center mx-auto mb-3">
                          <CreditCard size={24} className="text-[#607274]" />
                        </div>
                        <p className="text-sm text-[#1E2A2A] font-medium">Upload payment proof</p>
                        <p className="text-xs text-[#9CA3AF] mt-1">Screenshot, PDF, or Image (Max 5MB)</p>
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
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-[#1E2A2A]">Review Submission</h2>
              <p className="text-sm text-[#9CA3AF] mt-1">Please verify all information before submitting</p>
            </div>
            
            <div className="bg-[#FAFAF8] rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
              <div className="bg-[#1E2A2A] text-[#FAFAF8] px-6 py-4 flex justify-between items-center">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText size={18} />
                  Submission Summary
                </h3>
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="text-xs underline hover:text-[#DED0B6] transition-colors"
                >
                  Edit Details
                </button>
              </div>
              
              <div className="p-6 space-y-4 text-sm">
                <div className="pb-4 border-b border-[#E5E7EB]">
                  <span className="text-[#9CA3AF] block mb-2 flex items-center gap-2">
                    <Users size={14} /> Authors ({validAuthors.length})
                  </span>
                  <div className="space-y-2">
                    {validAuthors.map((author, idx) => (
                      <div key={idx} className="font-medium text-[#1E2A2A]">
                        {author.designation} {author.name}, {author.institution}
                        {idx === 0 && <span className="text-xs bg-[#1E2A2A]/10 text-[#1E2A2A] px-2 py-0.5 rounded ml-2">Primary</span>}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-[#9CA3AF] block mb-1 flex items-center gap-2">
                      <Mail size={14} /> Email
                    </span>
                    <span className="font-medium text-[#1E2A2A]">{user?.email}</span>
                  </div>
                  <div>
                    <span className="text-[#9CA3AF] block mb-1 flex items-center gap-2">
                      <Smartphone size={14} /> WhatsApp
                    </span>
                    <span className="font-medium text-[#1E2A2A]">{formData.authorWhatsApp}</span>
                  </div>
                </div>

                <div className="pb-4 border-b border-[#E5E7EB]">
                  <span className="text-[#9CA3AF] block mb-1 flex items-center gap-2">
                    <FileText size={14} /> Article
                  </span>
                  <div className="font-medium text-[#1E2A2A]">{formData.articleTitle}</div>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span className="px-2 py-1 bg-[#EFEFE8] rounded text-[#607274]">{formData.participantType}</span>
                    {abstractFile && <span className="text-green-600 flex items-center gap-1"><CheckCircle size={12} /> Abstract attached</span>}
                  </div>
                </div>

                <div className="pb-4 border-b border-[#E5E7EB]">
                  <span className="text-[#9CA3AF] block mb-1 flex items-center gap-2">
                    <CreditCard size={14} /> Payment Details
                  </span>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#1E2A2A] font-mono">{formData.transactionId}</div>
                      <div className="text-xs text-[#9CA3AF]">{formData.paymentDate}</div>
                    </div>
                    {fee && (
                      <div className="text-right">
                        <div className="text-lg font-medium text-[#1E2A2A] flex items-center justify-end gap-1">
                          <IndianRupee size={16} />
                          {fee.amount}
                        </div>
                        <div className="text-xs text-[#9CA3AF]">{fee.label}</div>
                      </div>
                    )}
                  </div>
                  {paymentScreenshot && <div className="text-xs text-green-600 mt-2 flex items-center gap-1"><CheckCircle size={12} /> Payment proof attached</div>}
                </div>

                <div>
                  <span className="text-[#9CA3AF] block mb-1 flex items-center gap-2">
                    <Landmark size={14} /> Bank Details Used
                  </span>
                  <div className="text-xs text-[#607274] space-y-1">
                    <p><span className="font-medium">To:</span> {BANK_DETAILS.beneficiaryName}</p>
                    <p><span className="font-medium">Bank:</span> {BANK_DETAILS.bankName}, {BANK_DETAILS.branch}</p>
                    <p><span className="font-medium">A/C:</span> {BANK_DETAILS.accountNo}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
              <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Before submitting:</p>
                <p className="opacity-80">Please verify all details are correct. You will receive a confirmation email at {user?.email} within 24 hours.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#EFEFE8] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-12 max-w-lg w-full text-center shadow-2xl border border-[#E5E7EB]"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-light text-[#1E2A2A] mb-4">Registration Complete!</h2>
          <p className="text-[#607274] mb-8">
            Thank you for registering for CIMA'26. A confirmation has been sent to{' '}
            <span className="font-medium text-[#1E2A2A]">{user?.email}</span>
          </p>
          <button 
            onClick={handleDashboard}
            className="px-8 py-3 bg-[#1E2A2A] text-[#FAFAF8] rounded-full hover:bg-[#607274] transition-colors font-medium"
          >
            Go To Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFEFE8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with logout */}
        <div className="flex justify-between items-center mb-8 mt-20">
          <div className="text-center flex-1">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-block"
            >
              <span className="px-4 py-1.5 rounded-full bg-[#1E2A2A] text-[#DED0B6] text-xs font-semibold tracking-wider uppercase mb-4 inline-block">
                CIMA'26 Conference
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-[#1E2A2A] mb-2">
                Registration
              </h1>
              <p className="text-[#607274]">International Conference on Innovative Materials and Applications</p>
            </motion.div>
          </div>
          <button
            onClick={handleLogout}
            className="absolute right-4 top-60 md:top-50 md:right-80 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur border border-[#E5E7EB] rounded-full text-sm text-[#607274] hover:text-[#1E2A2A] hover:border-[#1E2A2A] transition-all shadow-sm"
          >
            <LogOut size={16} />
            Logout
        </button>
        </div>
        

        <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
          <div className="p-8 md:p-12">
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

            {errors.submit && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm text-center flex items-center justify-center gap-2"
              >
                <AlertCircle size={16} />
                {errors.submit}
              </motion.div>
            )}

            <div className="mt-8 flex justify-between items-center pt-6 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  currentStep === 1 
                    ? 'opacity-0 cursor-default' 
                    : 'bg-[#EFEFE8] text-[#1E2A2A] hover:bg-[#DED0B6]'
                }`}
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <div className="flex gap-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      step.id === currentStep ? 'bg-[#1E2A2A] w-6' : 
                      step.id < currentStep ? 'bg-[#607274] cursor-pointer' : 'bg-[#E5E7EB]'
                    }`}
                  />
                ))}
              </div>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-2.5 bg-[#1E2A2A] text-[#FAFAF8] rounded-full text-sm font-medium hover:bg-[#607274] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Next Step
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-2.5 bg-green-700 text-white rounded-full text-sm font-medium hover:bg-green-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      Complete Registration
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}