import React from 'react';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Pillars from './components/Pillars';
import Programme from './components/Programme';
import Departments from './components/Departments';
import Institution from './components/Institution';
import Pricing from './components/Pricing';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Overview/>
      <Pillars/>
      <Programme/>
      <Departments/>
      <Institution/>
      <Pricing/>
    </main>
  );
}
