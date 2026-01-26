import AboutConferenceSection from "./components/Abouthero";
import AboutSection from "./components/Abouthero";
import ConferenceEvents from "./components/Events";
import SpeakersSection from "./components/Speakers";



export default function About() {
  return (
    <main className="min-h-screen">
        <AboutConferenceSection/>
        <ConferenceEvents/>
        <SpeakersSection/>
    </main>
  );
}
