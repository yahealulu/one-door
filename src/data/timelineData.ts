import { Calendar, MapPin, Users, Award, Handshake, Eye } from 'lucide-react';
import activity1 from '../assets/activity-1.jpg';
import activity2 from '../assets/activity-2.jpg';
import activity3 from '../assets/activity-3.jpg';
import activity4 from '../assets/activity-4.jpg';
import activity5 from '../assets/activity-5.jpg';
import activity6 from '../assets/activity-6.jpg';
import activity7 from '../assets/activity-7.jpg';
import activity8 from '../assets/activity-8.jpg';
import activity9 from '../assets/activity-9.jpg';
import activity10 from '../assets/activity-10.jpg';
import activity11 from '../assets/11.jpg';
import activity12 from '../assets/12.jpg';
import activity13 from '../assets/13.jpg';
import activity14 from '../assets/14.jpg';
import activity15 from '../assets/15.jpg';
import activity16 from '../assets/16.jpg';
import activity17 from '../assets/17.jpg';
import activity18 from '../assets/18.jpg';
import activity19 from '../assets/19.jpg';
import activity20 from '../assets/20.jpg';
import activity21 from '../assets/21.jpg';
import activity22 from '../assets/22.jpg';
import activity23 from '../assets/23.jpg';
import activity24 from '../assets/24.jpg';
import activity25 from '../assets/25.jpg';
import activity26 from '../assets/26.jpg';
import activity27 from '../assets/27.jpg';

export interface TimelineItem {
  id: string;
  type: 'exhibition' | 'news';
  title: string;
  date: string;
  location?: string; 
  content: string;
  images: string[];
  icon: any;
  isNested?: boolean;
}

export const timelineData: TimelineItem[] = [
  {
    id: 'sylicon-summit',
    type: 'exhibition',
    title: 'SYLICON Summit – Aleppo',
    date: 'July 31 – August 2, 2025',
    location: 'Sheraton Hotel, Aleppo',
    content: "From July 31st to August 2nd, 2025, One Door proudly participated in the SYLICON Technology Summit, held at the Sheraton Hotel in Aleppo. Our booth opened the door to the future, showcasing the true meaning of technological creativity. Visitors experienced innovative digital solutions, opportunities for career growth, and the potential for strategic partnerships.\n\nAt the exhibition, we presented intelligent applications powered by artificial intelligence – solutions that don't just solve problems, but learn, adapt, and grow with users. The event was an inspiring opportunity to connect with the tech community, exchange ideas, and highlight our vision for digital transformation in Syria and beyond.",
    images: [activity1, activity2, activity3],
    icon: Award
  },
  {
    id: 'damascus-fair',
    type: 'exhibition', 
    title: 'Damascus International Fair – 62nd Edition',
    date: 'August 27 – September 5, 2025',
    location: 'Damascus Fairgrounds',
    content: "From August 27th to September 5th, 2025, One Door participated in the 62nd Damascus International Fair at the Damascus Fairgrounds. Our presence highlighted the latest innovations in artificial intelligence and digital technology. Visitors discovered how One Door is redefining programming through smart, adaptive solutions that leave a unique mark in the AI and tech industry.",
    images: [activity4, activity5, activity6, activity7, activity8],
    icon: Users
  },
  {
    id: 'telecom-meeting',
    type: 'news',
    title: 'Strategic Meeting with Syrian Telecommunications Company',
    date: 'During Damascus Fair',
    content: "As part of Syria's path towards modernization and digital transformation, One Door's General Manager, Eng. Mohammad Al-Mohammad, held a productive meeting with Mr. Ghassan Akkash, General Manager of the Syrian Telecommunications Company. The meeting focused on strengthening cooperation and supporting the work of ministries and institutions with advanced digital solutions. Both sides agreed on practical steps, paving the way for a more connected, efficient, and prosperous Syria.",
    images: [activity9, activity10, activity11],
    icon: Handshake,
    isNested: true
  },
  {
    id: 'saudi-companies',
    type: 'news',
    title: 'Engagement with Saudi Companies',
    date: 'During Damascus Fair',
    content: "During its participation in the Damascus International Fair, One Door toured the Saudi companies present at the exhibition. The visit provided an opportunity to introduce One Door's vision, expand partnerships, and exchange expertise with leading companies. This reflects our commitment to building strong regional connections and fostering collaboration for mutual growth.",
    images: [activity12, activity13, activity14, activity15, activity16, activity17, activity18, activity19],
    icon: Users,
    isNested: true
  },
  {
    id: 'official-visit',
    type: 'news', 
    title: 'Official Visit by Organizing Committee',
    date: 'During Damascus Fair',
    content: "The organizing committee and the general management of the Damascus International Fair and Exhibition City paid an official visit to One Door's booth. The visit highlighted One Door's role in showcasing AI and digital technology solutions and reflected the appreciation of the organizers for our active participation in this landmark national event.",
    images: [activity20, activity21],
    icon: Eye,
    isNested: true
  },
  {
    id: 'mou-innovation',
    type: 'news',
    title: 'MoU with the National Authority for Innovation', 
    date: 'During Damascus Fair',
    content: "In a landmark step towards building a digital Syria, One Door Software Company, represented by its General Manager, Eng. Mohammad Al-Mohammad, signed a Memorandum of Understanding (MoU) with the National Authority for Innovation, represented by its Executive Director, Eng. Mohammad Aboudan. The agreement aims to collaborate on digital transformation projects and initiatives, supporting governmental and social digitization and placing Syria firmly on the path toward a promising digital future.",
    images: [activity22, activity23, activity24, activity25, activity26, activity27],
    icon: Award,
    isNested: true
  }
];