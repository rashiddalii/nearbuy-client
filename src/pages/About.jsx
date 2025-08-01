import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "50,000+", label: "Items Listed" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support" }
  ];

  const values = [
    {
      icon: "🤝",
      title: "Community First",
      description: "We believe in building strong local communities through trusted commerce."
    },
    {
      icon: "🔒",
      title: "Safety & Security",
      description: "Your safety is our priority with verified users and secure transactions."
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description: "Promoting reuse and reducing waste through second-hand commerce."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Continuously improving our platform with cutting-edge technology."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former e-commerce executive with 10+ years building community platforms.",
      avatar: "👩‍💼"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      bio: "Full-stack developer passionate about creating seamless user experiences.",
      avatar: "👨‍💻"
    },
    {
      name: "Emma Davis",
      role: "Head of Community",
      bio: "Community builder with expertise in user engagement and safety.",
      avatar: "👩‍🎨"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About NearBuy
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to create the most trusted and vibrant local marketplace 
          where communities can buy, sell, and connect with confidence.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white rounded-lg p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            NearBuy was born from a simple idea: what if buying and selling locally 
            could be as easy and safe as shopping online? We believe that the best 
            deals happen between neighbors who trust each other, and we're building 
            the platform to make that happen.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Our platform combines the convenience of modern e-commerce with the 
            personal touch of local community commerce, creating a unique experience 
            that benefits both buyers and sellers.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Growing Together</h2>
          <p className="text-xl text-blue-100">
            Our community is growing stronger every day
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-xl text-gray-600">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600">
            The passionate people behind NearBuy
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-6xl mb-4">{member.avatar}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white rounded-lg p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              NearBuy started in 2023 when our founder, Sarah, was trying to sell some 
              furniture before moving. She found that existing platforms were either too 
              impersonal or too risky for local transactions.
            </p>
            <p>
              That's when the idea for NearBuy was born. We wanted to create a platform 
              that combines the best of both worlds: the convenience and reach of online 
              marketplaces with the trust and community feel of local classifieds.
            </p>
            <p>
              Today, NearBuy serves thousands of users across multiple cities, helping 
              communities build stronger connections while making commerce more sustainable 
              and accessible.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Ready to be part of the future of local commerce? 
          Start buying and selling with your neighbors today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/marketplace"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Browse Marketplace
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About; 