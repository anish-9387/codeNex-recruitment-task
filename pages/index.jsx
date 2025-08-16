import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Wallpoet } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";

// Load custom font
const wallpoet = Wallpoet({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [scrollStage, setScrollStage] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState("50% 0%");
  const [backgroundSize, setBackgroundSize] = useState("100% 300vh");
  const [timeLeft, setTimeLeft] = useState("");

  // Countdown Timer
  useEffect(() => {
    // Recruitment deadline
    const endDate = new Date("2025-09-10T23:59:59").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("CLOSED");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}D ${hours}H ${minutes}M ${seconds}S`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Background Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const stage = Math.floor(scrollY / windowHeight);

      if (stage !== scrollStage) {
        setScrollStage(Math.min(stage, 4));
      }

      updateBackgroundPosition(Math.min(stage, 4));
    };

    const updateBackgroundPosition = (stage) => {
      switch (stage) {
        case 0:
          setBackgroundPosition("50% 0%");
          setBackgroundSize("100% 300vh");
          break;
        case 1:
          setBackgroundPosition("50% 33.33%");
          setBackgroundSize("100% 300vh");
          break;
        case 2:
          setBackgroundPosition("50% 66.66%");
          setBackgroundSize("100% 300vh");
          break;
        case 3:
          setBackgroundPosition("50% 83.33%");
          setBackgroundSize("100% 300vh");
          break;
        case 4:
          setBackgroundPosition("50% 83.33%");
          setBackgroundSize("150% 450vh"); // Zoom effect
          break;
        default:
          setBackgroundPosition("50% 0%");
          setBackgroundSize("100% 300vh");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollStage]);

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Fixed Background */}
      <div
        className="fixed inset-0 w-full h-full transition-all duration-1000 ease-out"
        style={{
          background: "#000000",
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("/bg-img.jpg")',
          backgroundPosition: backgroundPosition,
          backgroundSize: backgroundSize,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          zIndex: -1,
        }}
      />

      {/* Luffy Overlay (over content) */}
      {(() => {
        const luffyKeyframes = [
          // stage 0: peek (half visible)
          { x: 0, y: 200, scale: 1.0, opacity: 1 },
          // stage 1: fully visible with increase in size
          { x: 0, y: -100, scale: 1.5, opacity: 1 },
          // stage 2: move right
          { x: 420, y: -60, scale: 1.38, opacity: 1 },
          // stage 3: fully left + small
          { x: -540, y: 0, scale: 1.1, opacity: 1 },
          // stage 4: peek (half visible)
          { x: 0, y: 200, scale: 1.0, opacity: 1 },
        ];
        const target = luffyKeyframes[Math.min(scrollStage, 4)];

        return (
          <motion.img
            src="/luffy.png"
            alt="Luffy"
            initial={{ y: 200, scale: 1, opacity: 1 }}
            animate={target}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: "30%",
              left: "38.5%",
              transform: "translate(-50%, -50%)",
              zIndex: 40,
              pointerEvents: "none",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        );
      })()}

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Section 1 - Recruitment */}
        <motion.section
          id="home"
          className="h-screen flex items-center justify-center"
          initial={{ opacity: 1, y: 0 }}
          animate={
            scrollStage === 0
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -100 }
          }
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="text-center text-white">
            {/* Big Recruitment Heading */}
            <h1 className={`${wallpoet.className} text-[7rem] leading-none mb-8`}>
              RECRUITMENT
            </h1>

            {/* Slightly smaller subtext */}
            <p className={`${wallpoet.className} text-[3rem] mb-4`}>
              CLOSES IN
            </p>

            {/* Countdown */}
            <p
              className={`${wallpoet.className} text-[3rem] font-bold mb-8`}
              style={{ marginBottom: "40px" }}
            >
              {timeLeft}
            </p>

            {/* Apply Button */}
            <Link
              href="#register"
              style={{
                font: "wallpoet",
                display: "inline-block",
                backgroundColor: "black",
                color: "white",
                padding: "16px 40px",
                borderRadius: "9999px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textDecoration: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              APPLY NOW
            </Link>
          </div>
        </motion.section>

        {/* Section 2 - About */}
        <section
          id="about"
          className="h-screen flex items-center justify-center"
        >
          <div className="text-center text-white">
          </div>
        </section>

        {/* Section 3 - Our Domains */}
        <motion.section
          id="domains"
          className="h-screen flex flex-col items-start justify-center px-16"
          initial={{ opacity: 0, x: -200 }}
          animate={
            scrollStage < 2
              ? { opacity: 0, x: -200 }
              : scrollStage === 2
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 200 }
          }
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h2
            className={`${wallpoet.className} text-[3rem] font-bold mb-12`}
            style={{ paddingLeft: "230px", color: "white" }}
          >
            OUR DOMAINS
          </h2>

          {/* Domain Cards */}
          <div
            className="flex flex-wrap"
            style={{
              gap: "40px",
              justifyContent: "flex-start",
            }}
          >
            {/* Card 1 - Creatives */}
            <div
              className="flex items-center justify-center text-[2rem] font-bold"
              style={{
                width: "220px",
                height: "340px",
                backgroundImage: "url('/Cartel.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "black",
                margin: "20px",
                borderRadius: "12px",
                marginTop: "100px",
              }}
            >
              CREATIVES
            </div>

            {/* Card 2 - Technical */}
            <div
              className="flex items-center justify-center text-[2rem] font-bold"
              style={{
                width: "220px",
                height: "340px",
                backgroundImage: "url('/Cartel.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "black",
                margin: "20px",
                borderRadius: "12px",
              }}
            >
              TECHNICAL
            </div>

            {/* Card 3 - Non-Tech */}
            <div
              className="flex items-center justify-center text-[2rem] font-bold"
              style={{
                width: "220px",
                height: "340px",
                backgroundImage: "url('/Cartel.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "black",
                margin: "20px",
                borderRadius: "12px",
                marginTop: "100px",
              }}
            >
              NON-TECH
            </div>
          </div>
        </motion.section>

        {/* Section 4 - Timeline */}
        <motion.section
          className="timeline-section min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-16"
          initial={{ opacity: 0, y: 200 }}
          animate={
            scrollStage < 3
              ? { opacity: 0, y: 200 }
              : scrollStage === 3
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -200 }
          }
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h2 className="timeline-heading">Timeline</h2>

          <div className="relative w-full max-w-5xl">
            {/* Vertical line in center */}
            <div className="timeline-line"></div>

            {/* Events Wrapper */}
            <div className="flex flex-col gap-24 relative">

              {/* Event 1 - Left */}
              <div className="flex justify-start items-center relative">
                <div className="timeline-content-left">
                  <h3 className="text-2xl font-bold">19th August</h3>
                  <p className="text-lg text-gray-300">Application Starts</p>
                </div>
                <div className="timeline-circle bg-white"></div>
              </div>

              {/* Event 2 - Right */}
              <div className="flex justify-end items-center relative">
                <div className="timeline-content-right">
                  <h3 className="text-2xl font-bold">29th August</h3>
                  <p className="text-lg text-gray-300">Application Close</p>
                </div>
                <div className="timeline-circle bg-gray-400"></div>
              </div>

              {/* Event 3 - Left */}
              <div className="flex justify-start items-center relative">
                <div className="timeline-content-left">
                  <h3 className="text-2xl font-bold">1st September</h3>
                  <p className="text-lg text-gray-300">Task Assignment</p>
                </div>
                <div className="timeline-circle bg-yellow-500"></div>
              </div>

              {/* Event 4 - Right */}
              <div className="flex justify-end items-center relative">
                <div className="timeline-content-right">
                  <h3 className="text-2xl font-bold">6th September</h3>
                  <p className="text-lg text-gray-300">Task Submission</p>
                </div>
                <div className="timeline-circle bg-orange-500"></div>
              </div>

              {/* Event 5 - Left */}
              <div className="flex justify-start items-center relative">
                <div className="timeline-content-left">
                  <h3 className="text-2xl font-bold">8th September</h3>
                  <p className="text-lg text-gray-300">Interview</p>
                </div>
                <div className="timeline-circle bg-sky-400"></div>
              </div>

              {/* Event 6 - Right */}
              <div className="flex justify-end items-center relative">
                <div className="timeline-content-right">
                  <h3 className="text-2xl font-bold">10th September</h3>
                  <p className="text-lg text-gray-300">Result</p>
                </div>
                <div className="timeline-circle bg-green-400"></div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* Section 5 - Register */}
        <motion.section
          id="register"
          className="relative h-screen flex flex-col items-center justify-center text-white px-8 py-12 text-center"
          initial={{ opacity: 0, y: 200 }}
          animate={scrollStage === 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Heading */}
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              letterSpacing: "0.05em",
              color: "#facc15",
              marginBottom: "80px",
            }}
          >
            CONNECT WITH US
          </h2>

          {/* Social Icons Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              fontSize: "3.5rem",
              marginBottom: "72px",
            }}
          >
            <i className="fab fa-instagram" style={{ color: "limegreen" }}></i>
            <i className="fab fa-x-twitter" style={{ color: "limegreen" }}></i>
            <i className="fab fa-whatsapp" style={{ color: "limegreen" }}></i>
            <i className="fas fa-envelope" style={{ color: "limegreen" }}></i>
            <i className="fas fa-phone" style={{ color: "limegreen" }}></i>
          </div>

          {/* Big Brand Name */}
          <h1
            style={{
              fontSize: "8rem",
              fontWeight: "800",
              opacity: "0.5",
              color: "white",
              letterSpacing: "0.3rem",
            }}
          >
            CODENEX
          </h1>

          {/* Footer Line + Handle */}
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ width: "100px", height: "1px", backgroundColor: "white" }}></div>
            <p style={{ fontSize: "1.5rem", fontWeight: "bolder", color: "white" }}>
              @recruitment'25
            </p>
            <div style={{ width: "700px", height: "1px", backgroundColor: "white" }}></div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}