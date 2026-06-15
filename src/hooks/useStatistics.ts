import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '../services/statistics.service';
import { useStatisticsStore } from '../store/statisticsStore';
import type { AccessStatsByDormitory, AccessStatsByTime } from '../types/Statistic';

type TimeframeStats = AccessStatsByTime | AccessStatsByDormitory;

export const useStatistics = () => {
  const timeframe = useStatisticsStore((state) => state.timeframe);

  const statsQuery = useQuery<TimeframeStats[]>({
    queryKey: ['statisticsByTime', timeframe],
    queryFn: () => {
      // DORMITORY has separate call but we can fallback
      if (timeframe === 'DORMITORY') return statisticsService.getStatsByDormitory();
      return statisticsService.getStatsByTime(timeframe);
    },
  });

  const topStudentsQuery = useQuery({
    queryKey: ['topAccessStudents'],
    queryFn: statisticsService.getTopAccessStudents,
  });

  const absentStudentsQuery = useQuery({
    queryKey: ['longAbsentStudents'],
    queryFn: statisticsService.getLongAbsentStudents,
  });

  const strangerStatsQuery = useQuery({
    queryKey: ['strangerStats'],
    queryFn: statisticsService.getStrangerStats,
  });

  const bannedStudentStatsQuery = useQuery({
    queryKey: ['bannedStudentStats'],
    queryFn: statisticsService.getBannedStudentStats,
  });

  return {
    timeframeStats: statsQuery.data || [],
    topStudents: topStudentsQuery.data || [],
    absentStudents: absentStudentsQuery.data || [],
    strangerStats: strangerStatsQuery.data || [],
    bannedStudentStats: bannedStudentStatsQuery.data || [],
    isLoading:
      statsQuery.isLoading ||
      topStudentsQuery.isLoading ||
      absentStudentsQuery.isLoading ||
      strangerStatsQuery.isLoading ||
      bannedStudentStatsQuery.isLoading,
  };
};
