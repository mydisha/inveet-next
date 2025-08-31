import { Heart, Users, Award, Globe } from 'lucide-react';
import { Button } from './ui/button';

const About = () => {
  const stats = [
    {
      icon: <Heart className="w-8 h-8" />,
      number: '10K+',
      label: 'Happy Couples',
      description: 'Trusted by couples worldwide'
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: '50K+',
      label: 'Invitations Sent',
      description: 'Digital invitations delivered'
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: '4.9',
      label: 'Rating',
      description: 'Customer satisfaction score'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: '25+',
      label: 'Countries',
      description: 'Serving couples globally'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We continuously innovate to provide the best digital wedding solutions.',
      icon: '🚀'
    },
    {
      title: 'Quality',
      description: 'Every design and feature is crafted with attention to detail and excellence.',
      icon: '✨'
    },
    {
      title: 'Community',
      description: 'Building a supportive community of couples and wedding professionals.',
      icon: '🤝'
    },
    {
      title: 'Sustainability',
      description: 'Promoting eco-friendly digital solutions for modern weddings.',
      icon: '🌱'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We're on a Mission to
            <br />
            <span className="text-blue-600">Transform Weddings</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded with a passion for making wedding planning easier and more enjoyable, 
            we've helped thousands of couples create unforgettable digital experiences.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Our Story
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                It all started when our founders experienced the challenges of traditional 
                wedding planning firsthand. They realized that technology could make this 
                beautiful journey much smoother and more enjoyable.
              </p>
              <p>
                Today, we're proud to be the leading digital wedding platform, helping 
                couples around the world create meaningful, beautiful, and stress-free 
                wedding experiences.
              </p>
              <p>
                Our team of designers, developers, and wedding experts work tirelessly 
                to ensure every couple gets the perfect digital solution for their special day.
              </p>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
              Learn More About Us
            </Button>
          </div>

          {/* Right Content - Values */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Values
            </h3>
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 transition-all duration-300">
                  <div className="text-2xl">{value.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-100 to-yellow-100 rounded-3xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Growing Team
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our vision of 
              transforming the wedding industry through technology and innovation.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 text-lg px-8 py-4">
              View Open Positions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;