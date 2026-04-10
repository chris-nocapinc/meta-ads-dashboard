'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, TrendingUp, Zap, Target, Globe } from 'lucide-react';

const CHANNEL_COLORS = {
  Meta: '#1877F2',
  TikTok: '#00F2EA',
  Google: '#4285F4',
  ASA: '#007AFF',
};

type ChannelKey = keyof typeof CHANNEL_COLORS;

const weeklyTrendData = [
  { week: 'W1', Meta: 17.5, TikTok: 22.0, Google: 35.0, ASA: 2.6 },
  { week: 'W2', Meta: 16.8, TikTok: 34.5, Google: 32.0, ASA: 2.7 },
  { week: 'W3', Meta: 16.2, TikTok: 42.0, Google: 40.0, ASA: 2.8 },
];

const channelOverview = [
  {
    name: 'Meta',
    spend: 2539000,
    installs: 132500,
    cpi: 19.15,
    trend: -36,
    color: CHANNEL_COLORS.Meta,
  },
  {
    name: 'TikTok',
    spend: 145000,
    installs: 5200,
    cpi: 27.88,
    trend: -45,
    color: CHANNEL_COLORS.TikTok,
  },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(2)}`;
};

const TrendIndicator = ({ trend }: { trend: number }) => {
  const isPositive = trend >= 0;
  return (
    <div className={`flex items-center gap-1 ${isPositive ? 'text-red-500' : 'text-green-500'}`}>
      {isPositive ? (
        <ArrowUp className="h-4 w-4" />
      ) : (
        <ArrowDown className="h-4 w-4" />
      )}
      <span className="text-sm font-semibold">{Math.abs(trend)}%</span>
    </div>
  );
};

export default function ChannelPerformance() {
  const totalSpend = useMemo(
    () => channelOverview.reduce((sum, ch) => sum + ch.spend, 0),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Channel Performance</h1>
          <p className="text-slate-400">Multi-channel overview for Captions app (iOS) - 90 Day Performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {channelOverview.map((channel) => (
            <Card
              key={channel.name}
              className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{channel.name}</h3>
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: channel.color }}
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-400">Total Spend</p>
                    <p className="text-2xl font-bold">{formatCurrency(channel.spend)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Installs</p>
                    <p className="text-xl font-semibold">{channel.installs}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-700">
                    <p className="text-sm text-slate-400">CPI</p>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-xl font-semibold">${channel.cpi.toFixed(2)}</p>
                      <TrendIndicator trend={channel.trend} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-900 border-slate-700 p-6">
          <h2 className="text-xl font-semibold mb-6">CPI Trends (90 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="Meta" stroke={CHANNEL_COLORS.Meta} strokeWidth={2} />
              <Line type="monotone" dataKey="TikTok" stroke={CHANNEL_COLORS.TikTok} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
