import { useDashboard } from '../../hooks/useDashboard';
import { genderTranslation } from '../../utils/genderTranslation';
import BarChart from '../Charts/BarChart/BarChart';

const HomeChart = () => {
  const { genderCount } = useDashboard();
  const genderData = genderCount?.map((el) => ({
    ...el,
    name: genderTranslation[el.name] ?? el.name,
  }));
  return <BarChart values={genderData || []} />;
};
export default HomeChart;
