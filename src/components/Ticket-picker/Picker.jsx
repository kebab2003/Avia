import styles from './Ticket-picker.module.scss';
import { Radio } from 'antd';

const options = [
  {
    label: 'САМЫЙ ДЕШЁВЫЙ',
    value: 'САМЫЙ ДЕШЁВЫЙ',
  },
  {
    label: 'САМЫЙ БЫСТРЫЙ',
    value: 'САМЫЙ БЫСТРЫЙ',
  },
  {
    label: 'ОПТИМАЛЬНЫЙ',
    value: 'ОПТИМАЛЬНЫЙ',
  },
];

function Picker({ filterType, onFilterChange }) {
  return (
    <Radio.Group
      options={options}
      value={filterType}
      onChange={(e) => onFilterChange(e.target.value)}
      optionType="button"
      buttonStyle="solid"
      size="large"
      style={{ marginBottom: '10px', display: 'flex' }}
      block
      className={styles.customButton}
    />
  );
}

export default Picker;
