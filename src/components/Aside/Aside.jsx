import styles from './Aside.module.scss';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

function Aside({ checkedList, setCheckedList }) {
  const checkAll = plainOptions.length === checkedList.length;

  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  return (
    <div className={styles.aside_wrap}>
      <div className={styles.aside_title}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Всё
      </Checkbox>
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
        style={{ display: 'flex', flexDirection: 'column', gap: '19px' }}
      />
    </div>
  );
}

export default Aside;
