import type { ThemeConfig } from 'antd';
import { COLORS } from '@/constants';

export const ctuTheme: ThemeConfig = {
  token: {
    colorPrimary: COLORS.primary,
    colorSuccess: COLORS.success,
    colorWarning: COLORS.warning,
    colorError: COLORS.danger,
    colorBgLayout: COLORS.background,
    colorBgContainer: COLORS.card,
    borderRadius: 8,
    fontFamily: 'var(--font-readex-pro), sans-serif',
  },
  components: {
    Menu: {
      itemSelectedBg: `${COLORS.sidebarActive}18`,
      itemSelectedColor: COLORS.sidebarActive,
      itemHoverBg: `${COLORS.sidebarActive}10`,
    },
    Table: {
      headerBg: COLORS.background,
      headerColor: '#334155',
    },
    Button: {
      primaryShadow: 'none',
    },
  },
};
