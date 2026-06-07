import React, { useState } from 'react';
import { LucideIcon } from './LucideIcon';

interface ContactSectionProps {
  vintedUrl: string;
}

export function ContactSection({ vintedUrl }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const emailSubject = subject || `Contact Inquiry from ${name}`;
    const bodyText = `Hello Reloved Pages Team,

You have received a new message from the contact form:

Name: ${name}
Email: ${email}
Subject: ${emailSubject}

Message:
${message || "No message content provided."}

Best regards,
${name}`;

    const mailtoUrl = `mailto:relovedpages@starborne.xyz?subject=${encodeURIComponent(emailSubject)}&cc=${encodeURIComponent(email)}&reply-to=${encodeURIComponent(email)}&body=${encodeURIComponent(bodyText)}`;
    
    // Open native browser mailto
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-brand-orange-500 uppercase block mb-3 font-sans">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal leading-tight mb-4 text-white">
            Get in Touch
          </h2>
          <p className="text-base text-neutral-400 font-sans leading-relaxed">
            Have questions about our books, shipping, or looking for a custom recommendation? Send us a direct letter or find us online. We are always happy to help!
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Information & Channels */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Primary Email Card */}
            <div className="bg-[#0e0e0e] p-8 rounded-3xl border border-white/10 space-y-4 flex-1 flex flex-col justify-between min-h-[220px]">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-brand-orange-500 shadow-sm">
                  <LucideIcon name="Mail" size={20} />
                </div>
                <h3 className="text-xl font-serif font-black text-white">
                  Send us a direct letter
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                  We check list entries and mail several times daily. We respond to custom styling queries, wholesale requests, or general customer support.
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="mailto:relovedpages@starborne.xyz"
                  className="font-serif text-lg font-bold text-brand-orange-500 hover:text-white transition-colors duration-300 inline-flex items-center gap-1.5 hover:underline"
                >
                  relovedpages@starborne.xyz
                  <LucideIcon name="ArrowUpRight" size={15} />
                </a>
              </div>
            </div>

            {/* Catalog Page Direct Line Card */}
            <div className="bg-[#0e0e0e] p-8 rounded-3xl border border-white/10 space-y-4 flex-1 flex flex-col justify-between min-h-[220px]">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-brand-orange-500 shadow-sm">
                  <LucideIcon name="BookOpen" size={20} />
                </div>
                <h3 className="text-xl font-serif font-black text-white">
                  Explore our Catalogue
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                  Browse our real-time curated bookshelf of restored classics and design covers pre-wrapped with family care in London.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    // This triggers direct catalogue jump when rendered inside parent
                    const event = new CustomEvent('navigate-catalogue');
                    window.dispatchEvent(event);
                  }}
                  className="bg-white hover:bg-brand-orange-500 text-black hover:text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-sm transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border border-transparent"
                >
                  Go to Catalogue
                  <LucideIcon name="ArrowUpRight" size={13} />
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-[#0e0e0e] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-center">
            
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-brand-orange-500/10 border border-brand-orange-500/20 text-brand-orange-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <LucideIcon name="Mail" size={28} />
                </div>
                <h3 className="text-2xl font-serif text-white">
                  Inquiry Prepared
                </h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed font-sans">
                  Wonderful! We have compiled an email draft with your inquiry. If your local email client did not automatically load, please copy and write to us directly at <strong className="font-semibold text-white">relovedpages@starborne.xyz</strong>.
                </p>
                
                {subject && (
                  <div className="bg-zinc-950 p-4 rounded-xl max-w-sm mx-auto text-xs text-neutral-400 border border-white/5 font-mono">
                    Subject: &ldquo;{subject}&rdquo;
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="bg-white hover:bg-brand-orange-500 text-black hover:text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-md transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border border-transparent"
                  >
                    Send Another Message
                    <LucideIcon name="ChevronRight" size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-white">
                    Send us a Message
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans">
                    Leave your contact details and message, and we will follow up as soon as possible.
                  </p>
                </div>

                 {/* Input Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/55">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Lady Clara"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl font-sans focus:outline-none focus:border-brand-orange-500 text-sm text-white/90 placeholder-white/20 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/55">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. clara@london.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl font-sans focus:outline-none focus:border-brand-orange-500 text-sm text-white/90 placeholder-white/20 transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/55 block">
                    Subject / Topic
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Inquiry about vintage clothbound editions"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl font-sans focus:outline-none focus:border-brand-orange-500 text-sm text-white/90 placeholder-white/20 transition-all"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/55 block">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your comments or questions here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl font-sans focus:outline-none focus:border-brand-orange-500 text-sm text-white/90 placeholder-white/20 transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-white hover:bg-brand-orange-500 text-black hover:text-white font-sans text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all duration-300 shadow-md cursor-pointer text-center border border-transparent disabled:opacity-50"
                  >
                    {loading ? (
                      'Preparing Message...'
                    ) : (
                      <>
                        <LucideIcon name="Mail" size={12} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
