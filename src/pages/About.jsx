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
      name: "Abdullah Safdar",
      role: "Frontend/Backend",
      bio: "Former e-commerce executive with 10+ years building community platforms.",
      avatar: "https://scontent.flyp9-1.fna.fbcdn.net/v/t39.30808-1/532510170_122111311472959059_6255053586251695716_n.jpg?stp=c0.47.372.372a_dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeHOffl1NzgeizBG3jKfdLsSOuMRSQp_g_s64xFJCn-D-3HkAKwadb4ZxW_f5cjSMfO9eShQZFGx_DW4nJAIpyre&_nc_ohc=x6Xv6e7qb1oQ7kNvwFXiJIk&_nc_oc=Adkz5sCPML-YREGYOX2DubAI3JtJHt6rvwAkesjqv9QdeWiYyHQKD4PzgX-1cWVDEtY&_nc_zt=24&_nc_ht=scontent.flyp9-1.fna&_nc_gid=T6nUErqyey8158t9ZorT2w&oh=00_AfWK7f03gajSFSUJz_7RTTfFiCNotx0LE9CiF-sdNymmQw&oe=68ACC22B"
    },
    {
      name: "Rashid Ali",
      role: "Frontend/PHP",
      bio: "Full-stack developer passionate about creating seamless user experiences.",
      avatar: "https://media.licdn.com/dms/image/v2/D4D35AQFu1047ZL4w6g/profile-framedphoto-shrink_800_800/B4DZhGrTZ7H4Ag-/0/1753532414005?e=1756382400&v=beta&t=pahCWgzCcbVZ0c4YJZulQ7x20UM_yb-mXUHCHK9Vvmk"
    },
    {
      name: "Ahmad Abdullah",
      role: "Web Designer",
      bio: "Community builder with expertise in user engagement and safety.",
      avatar: "https://media.licdn.com/dms/image/v2/D4D35AQEte-dFdiIggg/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1697379566809?e=1756382400&v=beta&t=xHFzvrwhsnx2S4y_TDQUcIIIT1VDF6Ru-Hwzyo5ry-I"
    },
    {
      name: "Ghulam Mustafa",
      role: "Frontend/Backend",
      bio: "Former e-commerce executive with 10+ years building community platforms.",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFxhO2kWJje3A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1702910637359?e=1758758400&v=beta&t=Z67_lAE0wHSdqLrgswkAY9Gj_m5IXLn59qMUYN66VIA"
    },
     {
      name: "Shawaiz Khan",
      role: "Web Desinger",
      bio: "Former e-commerce executive with 10+ years building community platforms.",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFLmnBd8Pc06A/profile-displayphoto-crop_800_800/B4DZioFAKRHsAI-/0/1755166541259?e=1758758400&v=beta&t=2TCOG6iTCLHuB37ie_aV9MAh5Gwv1QNzN_3htkiM1pI"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="lg:text-4xl text-2xl md:text-5xl font-bold text-gray-900 mb-6">
          About NearBuy
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to create the most trusted and vibrant local marketplace 
          where communities can buy, sell, and connect with confidence.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white rounded-lg p-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="lg:text-3xl text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center justify-center items-center">
              <div className="text-6xl mb-4 items-center text-center flex justify-center"><img src={member.avatar} className='rounded-full' height={70} width={70} alt="" /></div>
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
              NearBuy started in 2025 when we was trying to sell some 
              furniture before moving. We found that existing platforms were either too 
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