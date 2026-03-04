import ExploreBtn from '@/components/ExploreBtn'
import { Props } from '@/components/EventCard';
import events from "@/lib/constants";
import EventCard from '@/components/EventCard';
import connectToDatabase from '@/lib/mongodb';
import { Event, Booking } from '@/database';

import ExploreBtn from '@/components/ExploreBtn'
import { li } from 'motion/react-client'
import { Props } from '@/components/EventCard';
import events from "@/lib/constants";
import EventCard from '@/components/EventCard';


const page = () => {
  return (
    <section>
      <h1 className="text-center">The Hub for Every Day <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups and Conferences. All in one place</p>
      <ExploreBtn />

      <div>
        <h3 className='mt-20 space-y-7 mb-5 '>Featured Events</h3>
        <ul className='events'>
          {events.map((event: Props) => (
            <li key={event.title} className='list-none'>
              <EventCard {...event} />
            </li>
          ))}
        </ul>

      </div>

    </section>
  )

    <section>
      <h1 className="text-center">The Hub for Every Day <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups and Conferences. All in one place</p>
      <ExploreBtn />

        <div>
          <h3 className='mt-20 space-y-7 mb-5 '>Featured Events</h3>
          <ul className='events'>
            {events.map((event: Props) => (
              <li key={event.title} className='list-none'>
                <EventCard {... event} />
              </li>
            ) )}
          </ul>

        </div>
      
    </section>
  )

}

export default page