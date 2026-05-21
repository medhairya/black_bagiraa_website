import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import logo from "../assets/logo.png";
import "../styles/SecretPage.css";
import { FaYoutube, FaInstagram, FaFacebookF, FaHome } from "react-icons/fa";

const manufacturingUnits = [
  {
    id: 1,
    code: "VB",
    name: "Vrundavan Foods And Beverages Private Limited",
    address: "6 - Hari Savita Industrial Estate, Palaswada, TA - Dabhoi, Vadodara, Gujarat - 391110",
    fssai: "10725997000504",
    gstin: "24AAKCV5629L1ZS",
    cin: "",
    email: "info.blackbagiraa@gmail.com",
    phone: "9106493347",
  },
  {
    id: 2,
    code: "PE",
    name: "Pisbi Enterprises",
    address: "Survey Number-204, Village: Luna, Ta: Padra, Vadodara, Gujarat   391440",
    fssai: "10720032000554",
    gstin: "24ABBFP0283E1ZN",
    cin: "",
    email: "pisbienterprises@gmail.com",
    phone: "9979611388",
  },
  {
    id: 3,
    code: "PB",
    name: "Patel Beverages Private Limited",
    address: "505/2-3-4, GIDC, Makarpura, Vadodara, Gujarat - 390010",
    fssai: "10013021000941",
    gstin: "24AADCP6641C1ZR",
    cin: "U15549GJ2005PTC46612",
    email: "info@patelbeverages.com",
    phone: "",
  },
  {
    id: 4,
    code: "GB",
    name: "Gulzar Beverages",
    address: "Block No.9, Royal Estate, Anand-Bhalej Road, Anand - 388001",
    fssai: "10724004060466",
    gstin: "24AMCPV2331H1Z9",
    cin: "",
    email: "gulzarbeverages9992@gmail.com",
    phone: "9723337171",
  },
];

const SecretPage = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden px-4 py-12">
      {/* Home Button */}
      {/* Remove the top-left Home button */}
      <Particles
        id="secret-particles"
        init={particlesInit}
        className="absolute inset-0 w-full h-full z-0"
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 400 },
            color: { value: "#ffcc00" },
            opacity: { value: 0.7, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: "top" },
          },
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Bagiraa Logo"
            className="w-24 h-24 md:w-40 md:h-40 object-contain glowing-logo"
          />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold glow-header tracking-wider">
            Bagiraa Manufacturing Units
          </h1>
          <p className="mt-3 text-gray-400">Proudly Made Across India</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full rounded-xl border border-white/10">
          <table className="w-full text-sm md:text-base table-auto bg-white/5 backdrop-blur-md">
            <thead className="text-white uppercase bg-white/10 text-left">
              <tr>
                <th className="px-3 py-3 table-border">Sr. No.</th>
                <th className="px-3 py-3 table-border">Code</th>
                <th className="px-3 py-3 table-border">Description</th>
              </tr>
            </thead>
            <tbody>
              {manufacturingUnits.map((unit, index) => (
                <tr key={unit.id} className="border-t border-white/10 hover:bg-white/10 transition-all">
                  <td className="px-3 py-4 align-top">{index + 1}</td>
                  <td className="px-3 py-4 align-top">{unit.code}</td>
                  <td className="px-3 py-4 whitespace-pre-line text-sm sm:text-base leading-relaxed">
                    <strong>Name:</strong> {unit.name}
                    {"\n"}<strong>Address:</strong> {unit.address}
                    {"\n"}<strong>FSSAI:</strong> {unit.fssai}
                    {"\n"}<strong>GSTIN:</strong> {unit.gstin}
                    {unit.cin && `\n`} {unit.cin && <><strong>CIN:</strong> {unit.cin}</>}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Social Media Links */}
      <div className="relative z-10 flex flex-col items-center mt-12">
        <div className="flex space-x-8 text-3xl md:text-4xl">
          <a
            href="/"
            aria-label="Home"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            <FaHome className="social-icon drop-shadow-lg" />
          </a>
          <a
            href="https://www.youtube.com/@Black_Bagiraa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-red-500 transition-colors duration-200"
          >
            <FaYoutube className="social-icon drop-shadow-lg" />
          </a>
          <a
            href="https://www.instagram.com/blackbagiraa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-400 transition-colors duration-200"
          >
            <FaInstagram className="social-icon drop-shadow-lg" />
          </a>
          <a
            href="https://facebook.com/blackbagiraaenergydrink"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            <FaFacebookF className="social-icon drop-shadow-lg" />
          </a>
        </div>
        <div className="mt-2 text-gray-400 text-xs md:text-sm tracking-wide">
          Connect with us on social media
        </div>
      </div>
    </div>
  );
};

export default SecretPage;
