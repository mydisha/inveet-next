import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'pricing';
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs: FAQItem[] = [
    // General Questions (Inspired by Inveet.id)
    {
      question: 'Apakah ini gratis?',
      answer: 'Undangan pernikahan online ini gratis selama masa uji coba (2 hari setelah undangan di aktivasi). Setelah itu, Anda bisa upgrade ke paket berbayar untuk fitur lebih lengkap.',
      category: 'general'
    },
    {
      question: 'Berapa lama proses pembuatannya?',
      answer: 'Untuk pembuatan undangan pernikahan online membutuhkan waktu sekitar 10 menit untuk mengisi data dan sudah bisa langsung disebar setelahnya. Proses sangat cepat dan mudah!',
      category: 'general'
    },
    {
      question: 'Apakah bisa di edit lagi?',
      answer: 'Undangan pernikahan online Inveet.id dapat di edit kapanpun tanpa ada batas. Anda bisa mengubah konten, foto, atau informasi kapan saja.',
      category: 'general'
    },
    {
      question: 'Apakah tema bisa di custom?',
      answer: 'Untuk saat ini tema undangan tidak dapat di custom secara penuh, tapi kami menyediakan 100+ template yang bisa dikustomisasi sesuai kebutuhan. Kami akan selalu mengembangkan tema sesuai dengan masukan dari pengguna 😉',
      category: 'general'
    },

    // Technical Questions (Inspired by Wedew.id)
    {
      question: 'Apakah undangan responsif di semua device?',
      answer: 'Ya! Undangan digital kami dibuat dengan teknologi responsive design yang memastikan tampilan sempurna di desktop, tablet, dan smartphone. Semua fitur akan berfungsi optimal di berbagai ukuran layar.',
      category: 'technical'
    },
    {
      question: 'Bagaimana cara membagikan undangan?',
      answer: 'Anda bisa membagikan undangan dengan cara copy link dan kirim via WhatsApp, email, atau social media. Kami juga menyediakan fitur auto-send WhatsApp untuk kemudahan pengiriman.',
      category: 'technical'
    },
    {
      question: 'Apakah ada fitur RSVP?',
      answer: 'Ya! Paket Diamond menyediakan fitur RSVP lengkap dimana tamu bisa konfirmasi kehadiran, pilih menu makanan, dan kirim ucapan. Semua data akan tersimpan dan bisa dipantau real-time.',
      category: 'technical'
    },
    {
      question: 'Bagaimana dengan keamanan data?',
      answer: 'Data Anda aman dengan kami. Kami menggunakan teknologi enkripsi SSL dan server yang terpercaya. Data tidak akan dibagikan ke pihak ketiga tanpa izin.',
      category: 'technical'
    },

    // Pricing Questions (Inspired by Katsudoto.id)
    {
      question: 'Berapa undangan yang bisa dibuat?',
      answer: 'Untuk saat ini satu akun dapat membuat satu link undangan saja. Untuk membuat banyak link undangan dapat menggunakan fitur reseller yang akan segera kami rilis.',
      category: 'pricing'
    },
    {
      question: 'Apakah ada biaya tersembunyi?',
      answer: 'Tidak ada biaya tersembunyi sama sekali! Harga yang tertera sudah termasuk hosting, domain, dan support. Anda hanya bayar sekali sesuai paket yang dipilih.',
      category: 'pricing'
    },
    {
      question: 'Bisakah upgrade paket nanti?',
      answer: 'Ya! Anda bisa upgrade dari paket gratis ke berbayar kapan saja. Semua data dan konten undangan akan tetap tersimpan. Proses upgrade sangat mudah dan cepat.',
      category: 'pricing'
    },
    {
      question: 'Apakah ada refund jika tidak puas?',
      answer: 'Kami memberikan garansi 30 hari. Jika dalam 30 hari pertama Anda tidak puas dengan layanan kami, kami akan berikan refund penuh tanpa syarat.',
      category: 'pricing'
    }
  ];

  const categories = [
    { key: 'general', label: 'Pertanyaan Umum', color: 'from-blue-500 to-blue-600' },
    { key: 'technical', label: 'Teknis & Fitur', color: 'from-purple-500 to-purple-600' },
    { key: 'pricing', label: 'Harga & Paket', color: 'from-green-500 to-green-600' }
  ];

  const [activeCategory, setActiveCategory] = useState<string>('general');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-24 bg-gradient-to-b from-primary-light/5 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-semibold">Pertanyaan Umum</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Ada{' '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Pertanyaan?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan undangan digital kami
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.key
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-primary'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/30"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-card-foreground pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <Minus className="w-6 h-6 text-primary" />
                  ) : (
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl px-8 py-6 border border-primary/20">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              <span className="font-semibold text-card-foreground">Masih ada pertanyaan?</span>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-glow transition-colors duration-300">
              Hubungi Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
