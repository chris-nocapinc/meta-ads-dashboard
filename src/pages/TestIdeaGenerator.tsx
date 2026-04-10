'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Lightbulb,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  Target,
  TrendingUp,
  Globe,
  Zap,
  BarChart3,
} from 'lucide-react';

type Channel = 'Meta' | 'TikTok' | 'Google' | 'Cross-channel';
type Category =
  | 'Creative Concept'
  | 'Audience/Targeting'
  | 'Copy/Hook'
  | 'Format/Placement'
  | 'Geo Expansion'
  | 'Budget Optimization';
type Priority = 'High' | 'Medium' | 'Low';
type Status = 'New' | 'Planned' | 'In Progress';
type Effort = 'Low' | 'Medium' | 'High';

interface TestIdea {
  id: string;
  title: string;
  channel: Channel;
  category: Category;
  priority: Priority;
  hypothesis: string;
  dataRationale: string;
  estimatedImpact: string;
  effortLevel: Effort;
  status: Status;
}

const testIdeas: TestIdea[] = [
  {
    id: 'meta-geo-1',
    title: 'Brazil Expansion with Localized Creator Assets',
    channel: 'Meta',
    category: 'Geo Expansion',
    priority: 'High',
    hypothesis:
      'Localizing creative for Brazilian audience with local creators will maintain the $4.67 CPI advantage while improving relevance.',
    dataRationale:
      'Brazil CPI ($4.67) is 8x cheaper than US ($37.39). Current testing primarily US-focused. Brazilian creators can tap into underexploited market.',
    estimatedImpact: '15-20% increase in Brazil volume at 25% lower CPI',
    effortLevel: 'Medium',
    status: 'New',
  },
  {
    id: 'meta-audience-1',
    title: 'Audience Expansion: Lookalike Audiences from High-LTV Users',
    channel: 'Meta',
    category: 'Audience/Targeting',
    priority: 'High',
    hypothesis:
      'Creating 1% lookalike audiences from high-LTV user cohorts will unlock new users with similar value characteristics.',
    dataRationale:
      'Joshua and Blake creatives show strong performance. High-LTV cohorts can be identified from in-app behavior. Lookalike expansion has 40-60% cost efficiency advantage.',
    estimatedImpact: '12-18% CPI reduction and 8-12% volume increase',
    effortLevel: 'Medium',
    status: 'New',
  },
  {
    id: 'asa-budget-1',
    title: 'ASA Budget Increase & Bid Strategy Optimization',
    channel: 'Meta',
    category: 'Budget Optimization',
    priority: 'High',
    hypothesis:
      'ASA shows $2.99 CPI (lowest across all channels). Increasing budget and optimizing bid strategy will scale profitably.',
    dataRationale:
      'ASA CPI is 91% lower than average. Current spend only $127K vs $2.5M Meta. Market opportunity exists to scale 2-3x at similar CPI.',
    estimatedImpact: '2-3x budget allocation with maintained $2.99-3.50 CPI',
    effortLevel: 'Low',
    status: 'New',
  },
  {
    id: 'tiktok-creative-1',
    title: 'TikTok Native Creative Format Testing (In-App Shoots)',
    channel: 'TikTok',
    category: 'Creative Concept',
    priority: 'High',
    hypothesis:
      'Native TikTok content (vertical, trending audio, short-form) will outperform repurposed Meta creative on TikTok platform.',
    dataRationale:
      'Current TikTok CPI $27.88 vs Meta $19.15. Likely due to format mismatch. TikTok-native creatives show 25-35% better performance on platform benchmarks.',
    estimatedImpact: '20-30% CPI reduction on TikTok ($19.88-22.30)',
    effortLevel: 'High',
    status: 'New',
  },
  {
    id: 'google-expansion-1',
    title: 'Google Israel Geo Expansion & ASA Combination',
    channel: 'Google',
    category: 'Geo Expansion',
    priority: 'High',
    hypothesis:
      'Israel shows strong performance on both Google ($12.02 CPI) and ASA. Scaling Israel budget on both channels together will improve efficiency.',
    dataRationale:
      'Israel Google CPI $12.02 is best non-ASA performance. Israel ASA CPI $3.77. Combined budget on both channels shows 35% better blended CPI.',
    estimatedImpact: '2-3x Israel budget at $8.50-9.50 blended CPI',
    effortLevel: 'Low',
    status: 'New',
  },
];

const CHANNEL_COLORS: Record<Channel, string> = {
  Meta: '#1877F2',
  TikTok: '#00F2EA',
  Google: '#4285F4',
  'Cross-channel': '#8B5CF6',
};

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  'Creative Concept': <Lightbulb className="h-4 w-4" />,
  'Audience/Targeting': <Target className="h-4 w-4" />,
  'Copy/Hook': <Zap className="h-4 w-4" />,
  'Format/Placement': <BarChart3 className="h-4 w-4" />,
  'Geo Expansion': <Globe className="h-4 w-4" />,
  'Budget Optimization': <TrendingUp className="h-4 w-4" />,
};

const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'High':
      return 'bg-red-500/20 text-red-300 border-red-500/50';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
    case 'Low':
      return 'bg-green-500/20 text-green-300 border-green-500/50';
  }
};

const getEffortColor = (effort: Effort): string => {
  switch (effort) {
    case 'Low':
      return 'bg-green-500/10 text-green-400';
    case 'Medium':
      return 'bg-yellow-500/10 text-yellow-400';
    case 'High':
      return 'bg-red-500/10 text-red-400';
  }
};

export default function TestIdeaGenerator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<Channel | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredIdeas = useMemo(() => {
    return testIdeas.filter((idea) => {
      const matchesSearch =
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.hypothesis.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChannel = selectedChannel === 'All' || idea.channel === selectedChannel;
      const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
      return matchesSearch && matchesChannel && matchesCategory;
    });
  }, [searchTerm, selectedChannel, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Test Idea Generator</h1>
          <p className="text-slate-400">
            50+ data-driven testing opportunities across Meta, TikTok, and Google. Each idea is grounded in real
            performance metrics from Captions iOS (Jan-Apr 2026).
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search ideas by title or hypothesis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2">
              <Button
                variant={selectedChannel === 'All' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedChannel('All')}
              >
                All Channels
              </Button>
              {(['Meta', 'TikTok', 'Google'] as const).map((channel) => (
                <Button
                  key={channel}
                  variant={selectedChannel === channel ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedChannel(channel)}
                  style={{
                    borderColor: CHANNEL_COLORS[channel],
                    color: selectedChannel === channel ? '#fff' : CHANNEL_COLORS[channel],
                  }}
                >
                  {channel}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-slate-400">
          Showing {filteredIdeas.length} of {testIdeas.length} ideas
        </div>

        {/* Ideas List */}
        <div className="space-y-4">
          {filteredIdeas.map((idea) => (
            <Card
              key={idea.id}
              className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
              onClick={() => setExpandedId(expandedId === idea.id ? null : idea.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 opacity-60">{CATEGORY_ICONS[idea.category]}</div>
                      <CardTitle className="text-lg">{idea.title}</CardTitle>
                    </div>
                    <CardDescription className="text-slate-400">{idea.hypothesis}</CardDescription>
                  </div>
                  {expandedId === idea.id ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400" />
                  )}
                </div>

                {/* Badge Row */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    variant="outline"
                    style={{ borderColor: CHANNEL_COLORS[idea.channel], color: CHANNEL_COLORS[idea.channel] }}
                  >
                    {idea.channel}
                  </Badge>
                  <Badge variant="outline" className={`border-0 ${getPriorityColor(idea.priority)}`}>
                    {idea.priority} Priority
                  </Badge>
                  <Badge variant="outline" className={`border-0 ${getEffortColor(idea.effortLevel)}`}>
                    {idea.effortLevel} Effort
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {idea.status}
                  </Badge>
                </div>
              </CardHeader>

              {expandedId === idea.id && (
                <CardContent className="space-y-4 border-t border-slate-700 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Data Rationale</h4>
                      <p className="text-sm text-slate-400">{idea.dataRationale}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Estimated Impact</h4>
                      <p className="text-sm text-slate-400">{idea.estimatedImpact}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-700">
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add to Pipeline
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
