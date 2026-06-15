import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { historyService } from '../services/history.service';
import { useHistoryStore } from '../store/historyStore';
import { AccessHistory } from '../types/History';

export const useHistory = () => {
  const queryClient = useQueryClient();
  const filters = useHistoryStore((state) => state.filters);

  const historyQuery = useQuery({
    queryKey: ['accessHistories', filters],
    queryFn: () => historyService.getHistories(filters),
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<AccessHistory, 'id' | 'timestamp'>) => historyService.createHistory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accessHistories'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => historyService.deleteHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accessHistories'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  return {
    histories: historyQuery.data || [],
    isLoading: historyQuery.isLoading,
    isError: historyQuery.isError,
    refetch: historyQuery.refetch,
    createHistory: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteHistory: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
