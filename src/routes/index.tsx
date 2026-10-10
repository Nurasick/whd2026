import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';

import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import InfoCards from '@/components/landing/InfoCards';
import About from '@/components/landing/About';
import Timeline from '@/components/landing/Timeline';
import Schedule from '@/components/landing/Schedule';
import Benefits from '@/components/landing/Benefits';
import Gallery from '@/components/landing/Gallery';
import FAQ from '@/components/landing/FAQ';
import Partners from '@/components/landing/Partners';
import Footer from '@/components/landing/Footer';
import StarTrail from '@/components/landing/StarTrail';
import { getSession } from '@/lib/auth.server';
import { getParticipant } from '@/lib/onboarding.server';
import { getTeamByParticipant } from '@/lib/team.server';
import { MIN_TEAM_SIZE } from '@/db/schema';
import type { NextStep } from '@/lib/next-step';

/** The session, plus where this visitor is in the sign-up funnel. */
const getLandingState = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await getSession(getRequest());
  if (!session?.user) return { session, nextStep: 'register' as NextStep };
  const profile = await getParticipant(session.user.id);
  if (!profile) return { session, nextStep: 'onboarding' as NextStep };
  if (!profile.teamId) return { session, nextStep: 'team' as NextStep };
  // Having a team is not enough: it only competes once it reaches MIN_TEAM_SIZE.
  const team = await getTeamByParticipant(session.user.id);
  const ready = !!team && team.members.length >= MIN_TEAM_SIZE;
  return { session, nextStep: (ready ? 'ready' : 'incomplete') as NextStep };
});

export const Route = createFileRoute('/')({
  loader: () => getLandingState(),
  component: LandingPage,
});

function LandingPage() {
  const { session, nextStep } = Route.useLoaderData();

  return (
    <div className="bg-whd-dark whd-grid-bg relative min-h-screen">
      {/* Neon star cursor trail — mouse only */}
      <StarTrail />

      <Navbar session={session} />
      <Hero nextStep={nextStep} />
      <InfoCards />
      <About />
      <Timeline />
      <Schedule />
      <Partners />
      <Benefits />
      <Gallery />
      <FAQ />
      <Footer session={session} />
    </div>
  );
}
