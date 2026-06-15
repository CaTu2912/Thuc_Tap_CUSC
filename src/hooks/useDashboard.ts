import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';

export const useDashboard = () => {
  const dashboardQuery = useQuery({
    queryKey: ['dashboardData'],
    queryFn: dashboardService.getDashboardData,
  });

  const accessChartQuery = useQuery({
    queryKey: ['accessChartData'],
    queryFn: dashboardService.getAccessChartData,
  });

  const pieChartQuery = useQuery({
    queryKey: ['dormitoryPieData'],
    queryFn: dashboardService.getDormitoryPieData,
  });

  const strangerChartQuery = useQuery({
    queryKey: ['strangerChartData'],
    queryFn: dashboardService.getStrangerChartData,
  });

  return {
    dashboardData: dashboardQuery.data,
    accessChartData: accessChartQuery.data,
    dormitoryPieData: pieChartQuery.data,
    strangerChartData: strangerChartQuery.data,
    isLoading:
      dashboardQuery.isLoading ||
      accessChartQuery.isLoading ||
      pieChartQuery.isLoading ||
      strangerChartQuery.isLoading,
    isError:
      dashboardQuery.isError ||
      accessChartQuery.isError ||
      pieChartQuery.isError ||
      strangerChartQuery.isError,
    refetchAll: () => {
      dashboardQuery.refetch();
      accessChartQuery.refetch();
      pieChartQuery.refetch();
      strangerChartQuery.refetch();
    },
  };
};
