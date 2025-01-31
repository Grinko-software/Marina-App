/* eslint-disable no-unused-vars */
'use client';
import React, { useEffect, useState } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Image,
	Button
} from '@nextui-org/react';
import InfoCard from '@/components/ui/infoCard';
import TableSales from '@/components/ui/TableSales';
import PieChart from '@/components/ui/pieChart';
import AreaChart from '@/components/ui/areaChart';
import Filter from './Filter/Filter';
import useReportsStore from './store';
import { roundValueWithUnit, formatNumberWithPoints } from '@/utils/number';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import StockTable from '@/components/ui/StockTable';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const ReportView = () => {
	const {
		pieChart: dataPieChart,
		periodIndicators: dataIndicators,
		areaChart: dataSalesTypes,
		criticalStore: dataCriticalStore,
		table: dataSalesTable
	} = useReportsStore();
	const [dataModelPieChart, setDataModelPieChart] = useState(null);
	const [dataModelPieChartLoading, setDataModelPieChartLoading] =
		useState(true);
	const [dataModelIndicator, setDataModelIndicator] = useState(null);
	const [dataModelIndicatorLoading, setDataModelIndicatorLoading] =
		useState(true);
	const [dataModelSalesTypes, setDataModelSalesTypes] = useState(null);
	const [dataModelTable, setDataModelTable] = useState(null);
	const [dataModelSalesTypesLoading, setDataModelSalesTypesLoading] =
		useState(true);
	const [totalMoneyIndicator, setTotalMoneyIndicator] = useState({});
	const [dataModelCriticalStore, setDataModelCriticalStore] = useState({});

	useEffect(() => {
		if (dataPieChart) {
			const itemsSort = dataPieChart?.sort(
				(a, b) => b?.percentage - a?.percentage
			);
			const principal = itemsSort.slice(0, 10);
			const others = itemsSort.slice(10);

			const labels = principal?.map((item) => {
				return item?.category_name;
			});
			const series = principal?.map((item) => {
				return item?.percentage;
			});

			const othersTotal = others?.reduce(
				(accumulator, currentValue) => accumulator + currentValue?.percentage,
				0
			);

			const dataChartPie = {
				series: [...series, othersTotal || []],
				options: {
					chart: {
						width: 'auto',
						type: 'pie'
					},
					labels: [...labels, othersTotal ? 'OTROS' : []],
					responsive: [
						{
							breakpoint: 180,
							options: {
								legend: {
									position: 'bottom'
								}
							}
						}
					]
				}
			};
			setDataModelPieChart(dataChartPie);
			setDataModelPieChartLoading(false);
		}
	}, [dataPieChart]);

	useEffect(() => {
		if (dataIndicators) {
			const IndicatorsData = dataIndicators.data;
			setDataModelIndicator(dataIndicators);
		}
	}, [dataIndicators]);

	useEffect(() => {
		if (dataSalesTable) {
			setDataModelTable(dataSalesTable);
		}
	}, [dataSalesTable]);

	useEffect(() => {
		if (dataModelIndicator) {
			const total = dataModelIndicator?.total_money;
			const indicator = roundValueWithUnit(total);
			setTotalMoneyIndicator(indicator);
			setDataModelIndicatorLoading(false);
		}
	}, [dataModelIndicator]);

	useEffect(() => {
		if (dataSalesTypes) {
			const seriesCash = dataSalesTypes?.map((item) => {
				return item?.cash_sales_amount;
			});
			const seriesCard = dataSalesTypes?.map((item) => {
				return item?.card_sales_amount;
			});
			const transferCard = dataSalesTypes?.map((item) => {
				return item?.transfer_sales_amount;
			});
			const totalCard = dataSalesTypes?.map((item) => {
				return (
					item?.card_sales_amount +
					item?.cash_sales_amount +
					item?.transfer_sales_amount
				);
			});
			const seriesDate = dataSalesTypes?.map((item) => {
				return item?.start_time;
			});
			const data = {
				series: [
					{
						name: 'Efectivo',
						data: [...seriesCash]
					},
					{
						name: 'Debito/Credito',
						data: [...seriesCard]
					},
					{
						name: 'Transferencia',
						data: [...transferCard]
					},
					{
						name: 'Total',
						data: [...totalCard]
					}
				],
				options: {
					chart: {
						height: 350,
						type: 'area'
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						curve: 'smooth'
					},
					xaxis: {
						type: 'datetime',
						categories: [...seriesDate]
					},
					tooltip: {
						x: {
							format: 'dd/MM/yy HH:mm'
						}
					}
				}
			};
			setDataModelSalesTypes(data);
			setDataModelSalesTypesLoading(false);
		}
	}, [dataSalesTypes]);

	useEffect(() => {
		if (dataCriticalStore) {
			setDataModelCriticalStore(dataCriticalStore);
		}
	}, [dataCriticalStore]);

	return (
		<>
			<section className="grid grid-cols-1 w-full">
				<Filter />
				<Swiper
					className=""
					modules={[Navigation, Pagination, Autoplay]}
					slidesPerView={'auto'}
					centeredSlides={true}
					Loop={true}
					autoplay={false}
					scrollbar={{ draggable: true }}
					pagination={{
						clickable: true
					}}
				>
					<SwiperSlide>
						<section className="grid grid-cols-1 w-full gap-2 mt-3">
							<section className="grid grid-cols w-full gap-3 ">
								<section className="grid grid-cols-1 md:grid-cols-3 md:gap-3">
									<section className="grid grid-cols-2 gap-1  h-full w-full col-span-1">
										<div className="col-span-1 w-full h-[8rem]">
											<InfoCard
												title={'Ingresos'}
												unit={'$'}
												quantity={totalMoneyIndicator?.value}
												subUnit={totalMoneyIndicator?.unit}
												pct={dataModelIndicator?.total_money_percent_indicator}
												color={'green-400'}
												isLoading={dataModelIndicatorLoading}
											/>
										</div>
										<div className="col-span-1 w-full h-[8rem]">
											<InfoCard
												title={'Ventas'}
												unit={''}
												quantity={dataModelIndicator?.total_sales}
												subUnit={''}
												pct={dataModelIndicator?.total_sales_percent_indicator}
												color={'yellow-400'}
												isLoading={dataModelIndicatorLoading}
											/>
										</div>

										<div className="col-span-2 w-full h-full">
											<PieChart
												data={dataModelPieChart}
												isLoading={dataModelPieChartLoading}
											/>
										</div>
									</section>
									<section className="col-span-2 mt-3 md:mt-0">
										<AreaChart
											data={dataModelSalesTypes}
											isLoading={dataModelSalesTypesLoading}
										/>
									</section>
								</section>
							</section>
						</section>
					</SwiperSlide>
					<SwiperSlide>
						<section className="grid grid-cols-1 w-full gap-3 mt-3">
							<section className="grid grid-cols w-full gap-3 ">
								<StockTable />
							</section>
						</section>
					</SwiperSlide>
				</Swiper>
			</section>
		</>
	);
};

const WidgetReport = ({ children, className, title }) => {
	return (
		<Card
			className={
				'w-auto flex-1 text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 text-black ' +
				className
			}
		>
			<CardHeader>
				<h4 className="text-primary-500 dark:text-white font-semibold text-xl">
					{title}
				</h4>
			</CardHeader>
			<CardBody>{children}</CardBody>
		</Card>
	);
};
export default ReportView;
