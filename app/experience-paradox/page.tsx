"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SoftwareHiringTrends = () => {
  // Chart data
  const bigTechData = [
    { name: "2019", value: 14, year: "2019 (>14%)" },
    { name: "2025", value: 7, year: "2025 (7%)" },
  ];

  const startupData = [
    { name: "2019", value: 8.5, year: "2019 (>8.5%)" },
    { name: "2025", value: 5.9, year: "2025 (<6%)" },
  ];

  const colors = {
    primary: ["#2A9D8F", "#E9C46A"],
    secondary: ["#F4A261", "#E76F51"],
    skillsColors: [
      "#2A9D8F",
      "#E9C46A",
      "#F4A261",
      "#E76F51",
      "#6A8EAF",
      "#778DA9",
    ],
    sectorsColors: ["#2A9D8F", "#E9C46A", "#F4A261", "#E76F51", "#6A8EAF"],
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 shadow-lg">
          <p className="text-white font-medium">{`${
            label ||
            payload[0].payload.year ||
            payload[0].payload.skill ||
            payload[0].payload.sector
          }`}</p>
          <p className="text-[#2A9D8F]">
            {`${
              payload[0].dataKey === "value"
                ? "Percentage"
                : payload[0].dataKey === "score"
                ? "Importance Score"
                : "Growth"
            }: ${payload[0].value}${
              payload[0].dataKey === "growth"
                ? "%"
                : payload[0].dataKey === "value"
                ? "%"
                : ""
            }`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#E0E0E0] font-inter">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="text-center my-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            The Experience Paradox
          </h1>
          <p className="text-xl md:text-2xl text-[#2A9D8F] max-w-4xl mx-auto">
            The Global Software Hiring Landscape in 2025: A Strategic Shift from
            Volume to Value
          </p>
        </header>

        {/* Timeline Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-white mb-10">
            A Decade of Disruption: Hiring Volatility (2015-2025)
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative pl-10 pb-8 border-l-4 border-[#415A77]">
              <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-[#E9C46A] border-4 border-[#0D1B2A]"></div>
              <h3 className="text-2xl font-bold text-[#E9C46A]">
                2015-2019: Stable Growth
              </h3>
              <p className="text-lg mt-2">
                The pre-pandemic era saw consistent, stable expansion in
                software engineering roles, driven by accelerating
                digitalization across all industries.
              </p>
            </div>
            <div className="relative pl-10 pb-8 border-l-4 border-[#415A77]">
              <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-[#E9C46A] border-4 border-[#0D1B2A]"></div>
              <h3 className="text-2xl font-bold text-[#F4A261]">
                2020-2022: The Pandemic Boom
              </h3>
              <p className="text-lg mt-2">
                A "frenzied peak" in hiring as companies aggressively scaled to
                meet the demands of remote work and digital transformation. Job
                postings soared to{" "}
                <span className="font-bold text-white">350%</span> of early 2020
                levels.
              </p>
            </div>
            <div className="relative pl-10 pb-8 border-l-4 border-[#415A77]">
              <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-[#E9C46A] border-4 border-[#0D1B2A]"></div>
              <h3 className="text-2xl font-bold text-[#E76F51]">
                2023-2025: Post-Boom Recalibration
              </h3>
              <p className="text-lg mt-2">
                A major market correction featuring over{" "}
                <span className="font-bold text-white">400,000+</span> tech
                layoffs, a plummet in job postings, and a strategic pivot
                towards efficiency and proven, high-impact talent.
              </p>
            </div>
          </div>
        </section>

        {/* Two Tiers Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            The 2025 Hiring Landscape: A Tale of Two Tiers
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12">
            In 2025, the demand for software engineers is not uniform. A clear
            divide has emerged, creating unprecedented challenges for new talent
            while placing a premium on experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Junior Dilemma */}
            <div className="bg-[#1B263B] rounded-xl shadow-2xl p-6 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-[#E76F51] mb-4">
                The Junior Dilemma
              </h3>
              <p className="text-base mb-6 h-24">
                Entry-level and new graduate roles have seen a sharp
                contraction. Companies, prioritizing immediate ROI, are hesitant
                to invest in training, creating a bottleneck for emerging
                talent.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div>
                  <p className="font-bold text-white mb-2">Big Tech Hires</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bigTechData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          innerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {bigTechData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                colors.primary[index % colors.primary.length]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value, entry) => (
                            <span
                              style={{ color: "#E0E0E0", fontSize: "12px" }}
                            >
                              {bigTechData.find((item) => item.name === value)
                                ?.year || value}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-white mb-2">Startup Hires</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={startupData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          innerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {startupData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                colors.secondary[
                                  index % colors.secondary.length
                                ]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value, entry) => (
                            <span
                              style={{ color: "#E0E0E0", fontSize: "12px" }}
                            >
                              {startupData.find((item) => item.name === value)
                                ?.year || value}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Senior Advantage */}
            <div className="bg-[#1B263B] rounded-xl shadow-2xl p-6 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-[#2A9D8F] mb-4">
                The Senior Advantage
              </h3>
              <p className="text-base mb-6 h-24">
                Experienced, AI-capable senior engineers are in high demand.
                Their proven ability to deliver complex solutions and drive
                productivity makes them a strategic investment in a cautious
                market.
              </p>
              <div className="flex flex-col justify-center items-center h-full">
                <p className="text-lg text-white">Productivity Gain with AI</p>
                <p className="text-6xl font-black text-[#2A9D8F] leading-none">
                  35%
                </p>
                <p className="text-lg mt-2 max-w-sm">
                  Senior engineers leveraging AI can be significantly more
                  productive, justifying the premium on their expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Drivers Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why the Shift? Key Market Drivers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1B263B] rounded-xl shadow-2xl p-6 text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-[#E9C46A] mb-2">
                AI & Automation
              </h3>
              <p>
                AI tools automate routine tasks, raising the bar for entry-level
                roles and increasing the leverage of senior engineers who can
                design and integrate AI-driven systems.
              </p>
            </div>
            <div className="bg-[#1B263B] rounded-xl shadow-2xl p-6 text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-[#F4A261] mb-2">
                Economic Pressure
              </h3>
              <p>
                Tighter budgets and a focus on leaner operations mean companies
                are prioritizing hires who can deliver immediate, high-impact
                results with minimal ramp-up time.
              </p>
            </div>
            <div className="bg-[#1B263B] rounded-xl shadow-2xl p-6 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-[#E76F51] mb-2">
                Skills Over Credentials
              </h3>
              <p>
                The market has shifted to skills-based hiring. Demonstrable
                expertise in high-demand areas now outweighs traditional
                qualifications or years on a resume.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 mb-8">
          <h2 className="text-3xl font-black text-white mb-4">
            The Path Forward: Adapt or Be Left Behind
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            The software engineering landscape is more competitive than ever.
            For individuals, success demands continuous upskilling in AI and
            other high-demand areas. For companies, it requires a strategic
            blend of targeted hiring and investing in internal talent
            development to build resilient, future-proof teams.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SoftwareHiringTrends;
