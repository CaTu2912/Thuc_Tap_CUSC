'use client';

import React from 'react';
import { Breadcrumb, Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  extra?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  extra,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        {breadcrumbs && (
          <Breadcrumb className="mb-2 text-xs">
            {breadcrumbs.map((item, index) => (
              <Breadcrumb.Item key={index}>
                {item.href ? (
                  <Link href={item.href} className="hover:text-[#1f5ca9] transition-colors">
                    {item.title}
                  </Link>
                ) : (
                  <span className="text-zinc-400">{item.title}</span>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
        <div className="flex flex-col">
          <Title level={3} className="m-0 font-bold text-zinc-800 tracking-tight" style={{ margin: 0 }}>
            {title}
          </Title>
          {description && (
            <Paragraph className="m-0 text-zinc-500 text-sm mt-1" style={{ marginBottom: 0 }}>
              {description}
            </Paragraph>
          )}
        </div>
      </div>
      {extra && <div className="flex items-center gap-3 w-full md:w-auto justify-end">{extra}</div>}
    </div>
  );
};

export default PageHeader;
