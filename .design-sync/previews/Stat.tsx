import { Stat } from 'taffy-web';

export function Figures() {
  return (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
      <Stat label="This month" value="$2,418.50" delta={{ direction: 'up', value: '12% vs last' }} />
      <Stat label="Dining out" value="$312.00" delta={{ direction: 'down', value: '8% vs last' }} />
      <Stat label="Transactions sorted" value="148" />
    </div>
  );
}

export function SingleFigure() {
  return <Stat label="Saved this year" value="$4,820.00" delta={{ direction: 'down', value: 'less than last year' }} />;
}
