import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import ChatBot from "@/components/ChatBot"; // Import the ChatBot component

const LandingPage = () => {
  const [rotation, setRotation] = useState(0);
  const [inView] = useState({ image1: false, image2: false });

  // Track scroll and trigger 3D rotation
  useEffect(() => {
    const handleScroll = () => {
      const scrollFactor = window.scrollY / 10;
      setRotation(scrollFactor);

    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Track when elements come into the viewport using IntersectionObserver
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up"); // Add the animation class on scroll into view
        }
      });
    }, options);

    const elements = document.querySelectorAll(".fade-up-on-scroll");
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center fade-up-on-scroll">
        <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job
          <span className="flex items-center gap-2 sm:gap-6">
            and get
            <img
              src="/hired.png"
              className="h-14 sm:h-24 lg:h-32"
              alt="Hirrd Logo"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center fade-up-on-scroll">
        <Link to={"/jobs"}>
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10 fade-up-on-scroll"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* First Image-Text Section with 3D rotation */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center fade-up-on-scroll">
        <div
          id="image1"
          className={`w-full h-auto rotate-on-scroll ${
            inView.image1 ? "static" : "rotate-[-20deg]"
          }`}
          style={{
            transform: `rotateY(${rotation}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src="/Businessman_Hiring-removebg-preview.png"
            alt="3D Image 1"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">
            Discover Thousands of Job Opportunities
          </h2>
          <p className="text-lg">
            Our platform connects you with job listings from various industries,
            helping you find the perfect job that matches your skills and
            experience.
          </p>
          <p className="text-lg">
            Whether you are looking for a full-time position or freelance
            opportunities, we have something for everyone.
          </p>
        </div>
      </section>

      {/* Second Text-Image Section with 3D rotation */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center fade-up-on-scroll">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">
            Easily Post and Manage Job Listings
          </h2>
          <p className="text-lg">
            Employers can quickly post job openings and manage applications
            through an intuitive interface. Find the best candidates for your
            job openings with our streamlined process.
          </p>
          <p className="text-lg">
            Manage your hiring process with ease and track the status of each
            application effortlessly.
          </p>
        </div>
        <div
          id="image2"
          className={`w-full h-auto rotate-on-scroll ${
            inView.image2 ? "static" : "rotate-[-20deg]"
          }`}
          style={{
            transform: `rotateY(${rotation}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src="Man_Giving_Job_Interview-removebg-preview.png"
            alt="3D Image 2"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 fade-up-on-scroll">
        <Card>
          <CardHeader>
            <Link to={"/jobs"}>
              <CardTitle className="font-bold">For Job Seekers</CardTitle>
            </Link>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Link to={"/post-job"}>
              <CardTitle className="font-bold">For Employers</CardTitle>
            </Link>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      <Accordion type="multiple" className="w-full fade-up-on-scroll">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Add the ChatBot component */}
      <ChatBot />
    </main>
  );
};

export default LandingPage;

