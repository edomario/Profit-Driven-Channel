
import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2, Building2, ShieldCheck, Star } from 'lucide-react';
import { CheckoutItem, User } from '../types';

interface PaymentModalProps {
  item: CheckoutItem;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ item, isOpen, onClose, onConfirm, user }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate API process
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Success
    }, 1500);
  };

  const handleEnterpriseInquiry = () => {
     setIsProcessing(true);
     setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
     }, 1000);
  }

  // If enterprise type but has a price, treat as checkout (Team Pass). 
  // If price is 0/undefined, treat as Inquiry.
  const isEnterpriseInquiry = item.type === 'enterprise' && (!item.price || item.price === 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">
             {isEnterpriseInquiry ? 'Enterprise Access' : 'Secure Checkout'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                   {item.type === 'subscription' ? 'Subscription' : item.type === 'enterprise' ? 'Team License' : 'Item'}
                </p>
                <div className="flex justify-between items-start">
                   <div>
                      <h4 className="font-bold text-lg text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                   </div>
                   <div className="text-right">
                      {isEnterpriseInquiry ? (
                         <span className="font-bold text-xl text-gray-900">Custom</span>
                      ) : (
                         <>
                           <span className="font-bold text-xl text-gray-900">${item.price?.toLocaleString()}</span>
                           {item.recurringInterval && <span className="text-xs text-gray-500 block">/{item.recurringInterval}</span>}
                         </>
                      )}
                   </div>
                </div>
              </div>

              {isEnterpriseInquiry ? (
                 <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100">
                       <h5 className="font-bold flex items-center gap-2 mb-2"><Building2 className="w-4 h-4" /> Why Enterprise?</h5>
                       <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Unlimited seat access for your team.</li>
                          <li>Dedicated account manager & unified billing.</li>
                          <li><span className="font-bold">30% Revenue Share</span> support for trainers.</li>
                          <li>Custom consultation & training duration packages.</li>
                       </ul>
                    </div>
                    <form className="space-y-3">
                       <input type="text" placeholder="Company Name" className="w-full border-gray-300 rounded-lg p-2.5 text-sm" />
                       <input type="email" placeholder="Work Email" className="w-full border-gray-300 rounded-lg p-2.5 text-sm" defaultValue={user?.email || ''} />
                       <textarea placeholder="Number of seats required?" className="w-full border-gray-300 rounded-lg p-2.5 text-sm h-20 resize-none"></textarea>
                    </form>
                 </div>
              ) : (
                 /* Standard Checkout Flow (Includes Paid Enterprise Team Pass) */
                 <div className="space-y-4">
                    <p className="text-sm font-bold text-gray-900">Select Payment Method</p>
                    <div 
                       onClick={() => setPaymentMethod('card')}
                       className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200'}`}
                    >
                       <CreditCard className="w-5 h-5 text-gray-700" />
                       <span className="text-sm font-medium">Credit / Debit Card</span>
                       {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 ml-auto text-black" />}
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                       <div className="flex gap-2 mb-2">
                          <input type="text" placeholder="Card Number" className="flex-1 border-gray-300 rounded p-2 text-sm" />
                          <input type="text" placeholder="MM/YY" className="w-20 border-gray-300 rounded p-2 text-sm" />
                          <input type="text" placeholder="CVC" className="w-16 border-gray-300 rounded p-2 text-sm" />
                       </div>
                    </div>
                 </div>
              )}
            </div>
          )}

          {step === 3 && (
             <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce-short">
                   <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                   {isEnterpriseInquiry ? 'Request Received' : 'Payment Successful'}
                </h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                   {isEnterpriseInquiry 
                      ? 'Our sales team will contact you within 24 hours to finalize your Enterprise plan.' 
                      : `You have successfully purchased ${item.title}. A receipt has been sent to your email.`}
                </p>
             </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50">
           {step === 1 ? (
              <button 
                 onClick={isEnterpriseInquiry ? handleEnterpriseInquiry : handlePay}
                 disabled={isProcessing}
                 className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                 {isProcessing ? 'Processing...' : (isEnterpriseInquiry ? 'Submit Inquiry' : `Pay $${item.price?.toLocaleString()}`)}
                 {!isProcessing && !isEnterpriseInquiry && <Lock className="w-4 h-4" />}
              </button>
           ) : (
              <button 
                 onClick={() => { onClose(); onConfirm(); }}
                 className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800"
              >
                 {isEnterpriseInquiry ? 'Close' : 'Start Access'}
              </button>
           )}
           
           {!isEnterpriseInquiry && step === 1 && (
              <p className="text-center text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
                 <ShieldCheck className="w-3 h-3" /> Secure 256-bit SSL Encrypted Payment
              </p>
           )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
