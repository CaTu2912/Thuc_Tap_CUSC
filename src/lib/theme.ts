import type { ThemeConfig } from 'antd';
import { MAU_SAC } from '@/constants';

export const ctuTheme: ThemeConfig = {
  token: {
    colorPrimary: MAU_SAC.primary,
    colorSuccess: MAU_SAC.success,
    colorWarning: MAU_SAC.warning,
    colorError: MAU_SAC.danger,
    colorBgLayout: MAU_SAC.background,
    colorBgContainer: MAU_SAC.card,
    borderRadius: 8,
    fontFamily: 'var(--font-readex-pro), sans-serif',
  },
  components: {
    Menu: {
      itemSelectedBg: `${MAU_SAC.sidebarActive}18`,
      itemSelectedColor: MAU_SAC.sidebarActive,
      itemHoverBg: `${MAU_SAC.sidebarActive}10`,
    },
    Table: {
      headerBg: MAU_SAC.background,
      headerColor: '#334155',
    },
    Button: {
      primaryShadow: 'none',
    },
  },
};
