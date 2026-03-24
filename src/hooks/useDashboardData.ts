import { useMemo } from "react";

export type Period = 7 | 30 | 90;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateRevenueData(period: Period) {
  const rand = seededRandom(period * 7);
  const months = ["Jan", "Feb", "Mar"];
  return Array.from({ length: period }, (_, i) => {
    const day = i + 1;
    const base = period === 7 ? 600000 : period === 30 ? 500000 : 400000;
    const wave = Math.sin(i * 0.4) * 250000 + rand() * 80000;
    const prevWave = Math.sin(i * 0.4 - 0.5) * 220000 + rand() * 60000;
    const monthIdx = Math.floor((i / period) * 3);
    const label = period <= 30 ? `Mar ${day}` : `${months[monthIdx]} ${(day % 28) + 1}`;
    return {
      day: label,
      revenue: Math.round(base + wave),
      previous: Math.round(base * 0.85 + prevWave),
    };
  });
}

export function useDashboardData(period: Period) {
  return useMemo(() => {
    const multiplier = period === 7 ? 0.25 : period === 30 ? 1 : 2.8;
    const changeMultiplier = period === 7 ? 0.7 : period === 30 ? 1 : 1.4;

    const kpis = {
      revenue: {
        value: Math.round(12450000 * multiplier),
        change: +(18.3 * changeMultiplier).toFixed(1),
        today: `₦${Math.round(890000 * (0.8 + Math.random() * 0.4)).toLocaleString()}`,
        week: `₦${Math.round(4200000 * (0.8 + Math.random() * 0.4)).toLocaleString()}`,
        sparkData: Array.from({ length: 12 }, () => 30 + Math.random() * 55),
      },
      orders: {
        value: Math.round(847 * multiplier),
        change: +(12.1 * changeMultiplier).toFixed(1),
        today: String(Math.round(32 * (0.8 + Math.random() * 0.4))),
        week: String(Math.round(198 * (0.8 + Math.random() * 0.4))),
        sparkData: Array.from({ length: 12 }, () => 20 + Math.random() * 45),
      },
      aov: {
        value: Math.round(14700 + (period - 30) * 50),
        change: +(5.4 * changeMultiplier).toFixed(1),
        today: `₦${Math.round(15200 + (period - 30) * 30).toLocaleString()}`,
        week: `₦${Math.round(14900 + (period - 30) * 20).toLocaleString()}`,
        sparkData: Array.from({ length: 12 }, () => 50 + Math.random() * 12),
      },
      conversion: {
        value: +(3.2 + (period === 7 ? 0.4 : period === 90 ? -0.2 : 0)).toFixed(1),
        change: +(period === 7 ? 0.5 : period === 30 ? -0.3 : -0.8).toFixed(1),
        today: `${(3.4 + (period - 30) * 0.01).toFixed(1)}%`,
        week: `${(3.1 + (period - 30) * 0.01).toFixed(1)}%`,
        sparkData: Array.from({ length: 12 }, () => 30 + Math.random() * 10),
      },
    };

    const revenueChart = generateRevenueData(period);

    const visitors = {
      active: Math.round(142 * (period === 7 ? 0.9 : period === 90 ? 1.2 : 1)),
      today: Math.round(1847 * multiplier).toLocaleString(),
      week: Math.round(12340 * (multiplier * 0.3)).toLocaleString(),
      month: Math.round(48200 * (multiplier * 0.15)).toLocaleString(),
      sources: [
        { pct: period === 7 ? 38 : period === 30 ? 34 : 30 },
        { pct: period === 7 ? 25 : period === 30 ? 28 : 32 },
        { pct: period === 7 ? 24 : period === 30 ? 22 : 20 },
        { pct: period === 7 ? 13 : period === 30 ? 16 : 18 },
      ],
    };

    const products = [
      { name: "Organic Shea Butter 500ml", revenue: Math.round(2340000 * multiplier), units: Math.round(312 * multiplier), growth: +(24.5 * changeMultiplier).toFixed(1) },
      { name: "African Black Soap Bundle", revenue: Math.round(1890000 * multiplier), units: Math.round(456 * multiplier), growth: +(18.2 * changeMultiplier).toFixed(1) },
      { name: "Moringa Oil Cold-Pressed", revenue: Math.round(1450000 * multiplier), units: Math.round(198 * multiplier), growth: +(12.8 * changeMultiplier).toFixed(1) },
      { name: "Cocoa Butter Body Cream", revenue: Math.round(980000 * multiplier), units: Math.round(267 * multiplier), growth: +(-3.2 * changeMultiplier).toFixed(1) },
      { name: "Hibiscus Hair Growth Oil", revenue: Math.round(870000 * multiplier), units: Math.round(189 * multiplier), growth: +(8.7 * changeMultiplier).toFixed(1) },
    ];

    const funnel = {
      stages: [
        { value: Math.round(48200 * multiplier) },
        { value: Math.round(4820 * multiplier) },
        { value: Math.round(1930 * multiplier) },
        { value: Math.round(847 * multiplier) },
      ],
      cac: `₦${Math.round(5200 * (period === 7 ? 1.1 : period === 90 ? 0.85 : 1)).toLocaleString()}`,
      payback: period === 7 ? "2.8 months" : period === 30 ? "2.3 months" : "1.9 months",
      funnelRate: `${(1.76 * (period === 7 ? 0.9 : period === 90 ? 1.15 : 1)).toFixed(2)}%`,
    };

    const segments = [
      { count: Math.round(102 * multiplier), value: 12 },
      { count: Math.round(195 * multiplier), value: 23 },
      { count: Math.round(296 * multiplier), value: 35 },
      { count: Math.round(152 * multiplier), value: 18 },
      { count: Math.round(102 * multiplier), value: 12 },
    ];
    const segmentStats = {
      clv: `₦${Math.round(89400 * (period === 7 ? 0.95 : period === 90 ? 1.08 : 1)).toLocaleString()}`,
      retention: `${(74.2 + (period === 7 ? -1.2 : period === 90 ? 2.1 : 0)).toFixed(1)}%`,
      atRisk: Math.round(18 * (period === 7 ? 0.8 : period === 90 ? 1.3 : 1)),
    };

    return { kpis, revenueChart, visitors, products, funnel, segments, segmentStats };
  }, [period]);
}
