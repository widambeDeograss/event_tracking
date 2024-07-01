"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'
import {BASE_URL, MEDIA_URL} from "@/constants/baseUrl";

interface EventData {
  id: string;
  name: string;
  description: string;
  location: string;
  date_time: Date;
  artists: Artist[];
  profile?: string;
  tickets_amount: number;
  likes_count: number;
  type: string;
  price: number;
}


interface Artist {
  id: string;
  username: string;
}

interface Props {
  eventId: string;
}



const EventDetails = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const params = useParams<{ eventId: string; }>()
 // Replace with your base API URL

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/events?querytype=single&&eventId=${params.eventId}`);
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [params.eventId]); // Fetch event details when eventId changes

  if (!eventData) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5 mx-5">
        <div className="card p-3">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold py-5">{eventData.name}</div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table datanew w-full p-5 text-left text-black">
                <tbody className="p-3">
                <tr>
                  <th>Profile</th>
                  <td>
                    {eventData.profile && (
                        <img src={`${ MEDIA_URL}/${eventData.profile}`} alt="Event Profile" />
                    )}
                  </td>
                </tr>
                <tr>
                  <th>ID</th>
                  <td>{eventData.id}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{eventData.description}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>{eventData.location}</td>
                </tr>
                <tr>
                  <th>Date Time</th>
                  <td>{new Date(eventData.date_time).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Artists</th>
                  <td>
                    {eventData.artists.map((artist) => (
                        <span key={artist.id}>{artist.username}</span>
                    ))}
                  </td>
                </tr>

                <tr>
                  <th>Tickets Amount</th>
                  <td>{eventData.tickets_amount}</td>
                </tr>
                <tr>
                  <th>Likes Count</th>
                  <td>{eventData.likes_count}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{eventData.type}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{eventData.price}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EventDetails;
