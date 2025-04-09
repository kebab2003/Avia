import styles from './App.module.scss';
import store from '../../redux';
import Header from '../Header';
import Aside from '../Aside';
import Picker from '../Ticket-picker';
import TicketList from '../TicketList';
import MoreButton from '../MoreButton';
import { Provider } from 'react-redux';
import { useState } from 'react';

function App() {
  const [visibleTickets, setVisibleTickets] = useState(5);
  const [filterType, setFilterType] = useState('ОПТИМАЛЬНЫЙ');
  const [stopsNumber, setStopsNumber] = useState(['1 пересадка', '2 пересадки']);

  const handleShowMore = () => {
    setVisibleTickets((prev) => prev + 5);
  };

  const handleFilterChange = (value) => setFilterType(value);

  return (
    <Provider store={store}>
      <div className={styles.main}>
        <Header />
        <div className={styles.main_page}>
          <Aside checkedList={stopsNumber} setCheckedList={setStopsNumber} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Picker filterType={filterType} onFilterChange={handleFilterChange} />
            <TicketList visibleTickets={visibleTickets} filterType={filterType} stopsNumber={stopsNumber} />
            <MoreButton onClick={handleShowMore} />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
