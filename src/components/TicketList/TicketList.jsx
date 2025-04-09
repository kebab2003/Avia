import styles from './TicketList.module.scss';
import Ticket from '../Ticket/Ticket';
import fetchTickets from '../../redux/TicketActions/TicketActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

function getStopsLabel(count) {
  const labels = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
  return labels[count] || '';
}

function TicketList({ visibleTickets, filterType, stopsNumber }) {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  if (loading) return <Spin style={{ marginBottom: '10px' }} />;
  if (error) return <p>Ошибка: {error}</p>;

  const filteredTickets = tickets.filter((ticket) =>
    ticket.segments.every((segment) => stopsNumber.includes(getStopsLabel(segment.stops.length)))
  );

  const sortedTickets = [...filteredTickets];

  if (filterType === 'САМЫЙ ДЕШЁВЫЙ') {
    sortedTickets.sort((a, b) => a.price - b.price);
  } else if (filterType === 'САМЫЙ БЫСТРЫЙ') {
    sortedTickets.sort((a, b) => {
      const durationA = a.segments[0].duration + a.segments[1].duration;
      const durationB = b.segments[0].duration + b.segments[1].duration;
      return durationA - durationB;
    });
  }

  const displayedTickets = sortedTickets.slice(0, visibleTickets);

  if (displayedTickets.length === 0) {
    return (
      <div style={{ width: '100%', marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>
        Нет подходящих билетов.
      </div>
    );
  }

  return (
    <ul>
      {displayedTickets.map((ticket) => {
        const key = `${ticket.price}-${ticket.carrier}-${ticket.segments[0].origin}-${ticket.segments[0].destination}-${ticket.segments[0].date}`;
        return (
          <li key={key} className={styles.ticket_item}>
            <Ticket ticket={ticket} />
          </li>
        );
      })}
    </ul>
  );
}

export default TicketList;
