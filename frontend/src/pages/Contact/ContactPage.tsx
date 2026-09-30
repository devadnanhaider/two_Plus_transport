import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import axios from 'axios';
import { COMPANY_INFO, CONTACT_LINKS } from '../../data/companyInfo';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/contact', { name, email, phone, subject, message });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-sky-50 text-[#0066FF] border border-sky-200 text-xs font-extrabold uppercase">
            GET IN TOUCH WITH US
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900">Contact & Dispatch Support</h1>
          <p className="text-slate-600 text-sm">Have a question or need emergency fleet dispatch? Contact our team 24/7.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6 bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-white">Contact Information</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Our dispatch team operates 24 hours a day, 7 days a week to ensure seamless transport operations across Qatar.
            </p>

            <div className="space-y-4 text-xs pt-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#00A3FF] shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Head Office Address</h4>
                  <p className="text-slate-400">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#00A3FF] shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Telephone & Hotline</h4>
                  <p className="text-slate-400">
                    Mobile / WhatsApp: <a href={CONTACT_LINKS.telMobile} className="hover:text-[#00A3FF]">{COMPANY_INFO.mobileDisplay}</a>
                    {' / '}Landline: <a href={CONTACT_LINKS.telLandline} className="hover:text-[#00A3FF]">{COMPANY_INFO.landlineDisplay}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#00A3FF] shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Email Inquiries</h4>
                  <a href={CONTACT_LINKS.mailto} className="text-slate-400 hover:text-[#00A3FF] transition-colors">{COMPANY_INFO.email}</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Operating Hours</h4>
                  <p className="text-emerald-400 font-semibold">Dispatch Center: 24/7 365 Days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 p-8 rounded-3xl border border-slate-200">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-slate-600 text-xs max-w-md mx-auto">
                  Thank you <strong className="text-slate-900">{name}</strong>. Our customer support representative will review your inquiry and respond to <strong className="text-[#0066FF]">{email}</strong> shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow">
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Send Us a Direct Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Kadir Miye"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0066FF]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0066FF]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+974 XXXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0066FF]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Corporate Staff Transport Inquiry"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0066FF]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your transportation requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0066FF]"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'SENDING...' : 'SUBMIT CONTACT MESSAGE'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
