import Hero from "@/components/home/Hero";
import HomeMenu from "@/components/home/HomeMenu";
import LogoutButton from "@/components/share/LogoutButton";
import SectionHeader from "@/components/share/SectionHeader";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
    <section className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <HomeMenu />
      <div id="about" className="text-center my-16">
        <SectionHeader subHeader="our story" mainHeader="about us" />
        <div className="text-gray-500 max-w-6xl mx-auto mt-8 flex flex-col gap-4">
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ipsum
            dicta incidunt totam quibusdam maiores quo, aspernatur dolorum iste
            cumque obcaecati assumenda ullam autem odio perferendis ea adipisci
            eius provident.
          </p>
        </div>
      </div>
      <div id="contact" className="text-center my-8">
        <SectionHeader subHeader="don't hesitate" mainHeader="contact us" />
        <div className="mt-8">
          <a
            href="tel:+61123456789"
            className="text-4xl  text-gray-500 underline"
          >
            +61 123 456 789
          </a>
        </div>
      </div>
    </section>
  );
}
