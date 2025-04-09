import styles from './Ticket.module.scss';
import { format, addMinutes } from 'date-fns';

function Ticket({ ticket }) {
  const { price, segments, carrier } = ticket;
  const there = segments[0];
  const back = segments[1];

  const formatTime = (dateStr) => format(new Date(dateStr), 'HH:mm');
  const getArrivalTime = (dateStr, duration) => format(addMinutes(new Date(dateStr), duration), 'HH:mm');
  const formatDuration = (min) => `${Math.floor(min / 60)}ч ${min % 60}м`;

  const stopsText = (stopsCount) => {
    let ending = 'ок';

    if (stopsCount === 1) {
      ending = 'а';
    } else if (stopsCount > 1) {
      ending = 'и';
    }

    return `${stopsCount} пересадк${ending}`;
  };

  return (
    <div className={styles.ticket_wrapper}>
      <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt={`${carrier} logo`} className={styles.companyLogo} />
      <div className={styles.ticket_price}>{price} P</div>
      <div className={styles.ticket_info}>
        <div className={styles.ticket_route}>
          <div>
            <div className={styles.ticket_route_city}>
              {there.origin} - {there.destination}
            </div>
            <div className={styles.ticket_route_time}>
              {formatTime(there.date)} - {getArrivalTime(there.date, there.duration)}
            </div>
          </div>
          <div className={styles.ticket_route_return}>
            <div className={styles.ticket_route_city}>
              {back.origin} - {back.destination}
            </div>
            <div className={styles.ticket_route_time}>
              {' '}
              {formatTime(back.date)} - {getArrivalTime(back.date, back.duration)}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.ticket_route_city}>В ПУТИ</div>
            <div className={styles.ticket_route_time}>{formatDuration(there.duration)}</div>
          </div>
          <div className={styles.ticket_route_return}>
            <div className={styles.ticket_route_city}>В ПУТИ</div>
            <div className={styles.ticket_route_time}>{formatDuration(back.duration)}</div>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.ticket_route_city}>{stopsText(there.stops.length)}</div>
            <div className={styles.ticket_route_time}>
              {there.stops.length ? there.stops.join(', ') : 'Без пересадок'}
            </div>
          </div>
          <div className={styles.ticket_route_return}>
            <div className={styles.ticket_route_city}>{stopsText(back.stops.length)}</div>
            <div className={styles.ticket_route_time}>
              {back.stops.length ? back.stops.join(', ') : 'Без пересадок'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
