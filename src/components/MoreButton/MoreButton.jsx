import { Button } from 'antd';

function MoreButton({ onClick }) {
  return (
    <Button type="primary" onClick={onClick}>
      ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
    </Button>
  );
}

export default MoreButton;
