'use client';
import useStore from './store';
import ViewPayment from './ViewPayment/ViewPayment';
import WorkerPerformance from './WorkerPerformance';
const RootWorkPerformance = () => {
	const { isSectionPayment } = useStore();
	return isSectionPayment ? <ViewPayment /> : <WorkerPerformance />;
};
export default RootWorkPerformance;
