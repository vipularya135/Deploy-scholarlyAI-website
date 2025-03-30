import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { staggeredEntrance, animateNumber } from '@/utils/animations';

const getRandomData = (count: number, min: number, max: number) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * (max - min + 1)) + min
  }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const PieChartWithAnimation = ({ data }: { data: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [data.length]);

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx={200}
        cy={150}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        animationDuration={1000}
        animationBegin={0}
      >
        {data.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={COLORS[index % COLORS.length]} 
            strokeWidth={index === activeIndex ? 2 : 0}
            stroke="#fff"
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

const citationsData = [
  { name: '2018', value: 120 },
  { name: '2019', value: 180 },
  { name: '2020', value: 270 },
  { name: '2021', value: 310 },
  { name: '2022', value: 420 },
  { name: '2023', value: 490 },
  { name: '2024', value: 560 }
];

const trendsData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
  { name: 'Aug', value: 1300 }
];

const papersData = [
  { name: 'ML', value: 35 },
  { name: 'AI', value: 40 },
  { name: 'IoT', value: 15 },
  { name: 'NLP', value: 25 },
  { name: 'Web3', value: 10 },
  { name: 'AR/VR', value: 20 }
];

const journalData = getRandomData(10, 10, 100);
const institutionData = getRandomData(8, 50, 300);
const researcherData = getRandomData(7, 10, 200);

const AnalysisPage = () => {
  const { analysisType } = useParams<{ analysisType: string }>();
  const [chartData, setChartData] = useState<any[]>([]);
  const [secondaryData, setSecondaryData] = useState<any[]>([]);
  const [summaryMetric, setSummaryMetric] = useState(0);
  const [animatedMetric, setAnimatedMetric] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    document.body.style.paddingTop = '72px';
    
    switch(analysisType) {
      case 'citations':
        setChartData(citationsData);
        setSecondaryData(journalData);
        setSummaryMetric(2350);
        break;
      case 'trends':
        setChartData(trendsData);
        setSecondaryData(institutionData);
        setSummaryMetric(5700);
        break;
      case 'papers':
        setChartData(papersData);
        setSecondaryData(researcherData);
        setSummaryMetric(145);
        break;
      default:
        setChartData([]);
        setSecondaryData([]);
        setSummaryMetric(0);
    }
    
    setTimeout(() => {
      staggeredEntrance('.chart-item', 120);
    }, 300);
    
    const counterElement = document.getElementById('summary-counter');
    if (counterElement) {
      animateNumber(counterElement, 0, summaryMetric, 2000);
    }
    
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, [analysisType, summaryMetric]);

  const getPageTitle = () => {
    switch(analysisType) {
      case 'citations':
        return 'Citation Impact Analysis';
      case 'trends':
        return 'Research Trends Analysis';
      case 'papers':
        return 'Influential Papers Analysis';
      default:
        return 'Analysis Dashboard';
    }
  };

  const getSummaryTitle = () => {
    switch(analysisType) {
      case 'citations':
        return 'Total Citations';
      case 'trends':
        return 'Research Trends';
      case 'papers':
        return 'Influential Papers';
      default:
        return 'Summary';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div 
        className="fixed inset-0 bg-cover bg-center z-0 opacity-15" 
        style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/006/817/039/small_2x/educational-equipment-boards-and-books-education-concept-with-copy-space-photo.jpg')` }}
      ></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
        </div>
        
        <div className="bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{getSummaryTitle()}</h2>
              <p className="text-gray-300">Summary of key metrics and insights</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-4xl font-bold text-primary">
                <span id="summary-counter">0</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="chart-item opacity-0 transform translate-y-8 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Primary Metrics</h3>
            <ChartContainer
              config={{
                value: { theme: { light: "#1976d2", dark: "#90caf9" } },
              }}
              className="h-[300px]"
            >
              {analysisType === 'papers' ? (
                <PieChartWithAnimation data={chartData} />
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" />
                </BarChart>
              )}
            </ChartContainer>
          </div>
          
          <div className="chart-item opacity-0 transform translate-y-8 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
            <ChartContainer
              config={{
                value: { theme: { light: "#00C49F", dark: "#00C49F" } },
                secondary: { theme: { light: "#8884d8", dark: "#8884d8" } },
              }}
              className="h-[300px]"
            >
              <LineChart data={secondaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-value)" 
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </div>
          
          <div className="chart-item opacity-0 transform translate-y-8 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Historical Data</h3>
            <ChartContainer
              config={{
                value: { theme: { light: "#8884d8", dark: "#8884d8" } },
              }}
              className="h-[300px]"
            >
              <AreaChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-value)" 
                  fill="var(--color-value)" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ChartContainer>
          </div>
          
          <div className="chart-item opacity-0 transform translate-y-8 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Comparative Analysis</h3>
            <ChartContainer
              config={{
                value: { theme: { light: "#FFBB28", dark: "#FFBB28" } },
                secondary: { theme: { light: "#FF8042", dark: "#FF8042" } },
              }}
              className="h-[300px]"
            >
              <BarChart data={institutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="value" fill="var(--color-value)" name="Current" />
                <Bar dataKey="value" fill="var(--color-secondary)" name="Previous" stackId="a" />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-white/10 py-8 bg-background/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} ScholarlyAI. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">About</a>
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnalysisPage;
