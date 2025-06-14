import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine, Area, AreaChart } from 'recharts';

const StatisticalTestVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Naše data z příkladu
  const sampleMean = 172.5;
  const nullMean = 175;
  const sampleSD = 8.2;
  const sampleSize = 30;
  const tStat = -1.67;
  const criticalValue = 2.045;
  const alpha = 0.05;
  const pValue = 0.106;

  // Kroky testovací procedury
  const steps = [
    {
      title: "1. Formulace hypotéz",
      description: "H₀: μ = 175 cm vs H₁: μ ≠ 175 cm",
      component: "hypotheses"
    },
    {
      title: "2. Hladina významnosti",
      description: "α = 0.05 (5% riziko chyby)",
      component: "alpha"
    },
    {
      title: "3. Naměřená data",
      description: "Výška 30 studentů (x̄ = 172.5 cm, s = 8.2 cm)",
      component: "data"
    },
    {
      title: "4. t-rozdělení a kritické hodnoty",
      description: "Kritické hodnoty: ±2.045",
      component: "distribution"
    },
    {
      title: "5. Testová statistika",
      description: "t = -1.67",
      component: "teststat"
    },
    {
      title: "6. Rozhodnutí",
      description: "Nezamítáme H₀ (|t| < 2.045)",
      component: "decision"
    }
  ];

  // Generování dat pro t-rozdělení
  const generateTDistribution = () => {
    const data = [];
    for (let x = -4; x <= 4; x += 0.1) {
      // Aproximace t-rozdělení pomocí normálního rozdělení (pro vizualizaci)
      const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
      data.push({
        x: x,
        y: y,
        critical: Math.abs(x) > criticalValue,
        testStat: Math.abs(x - tStat) < 0.05
      });
    }
    return data;
  };

  // Generování vzorových dat výšek
  const generateSampleData = () => {
    const data = [];
    const mean = sampleMean;
    const sd = sampleSD;
    
    // Aproximace normálního rozdělení kolem našich dat
    for (let i = 0; i < 30; i++) {
      const height = mean + (Math.random() - 0.5) * sd * 2;
      data.push({
        student: i + 1,
        height: Math.round(height * 10) / 10,
        isAboveNull: height > nullMean
      });
    }
    return data.sort((a, b) => a.height - b.height);
  };

  const [sampleData] = useState(generateSampleData());
  const [tDistData] = useState(generateTDistribution());

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const renderHypotheses = () => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-700 mb-2">Nulová hypotéza (H₀)</h4>
          <p className="text-lg">μ = 175 cm</p>
          <p className="text-sm text-gray-600 mt-1">Průměrná výška je 175 cm</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
          <h4 className="font-bold text-red-700 mb-2">Alternativní hypotéza (H₁)</h4>
          <p className="text-lg">μ ≠ 175 cm</p>
          <p className="text-sm text-gray-600 mt-1">Průměrná výška není 175 cm</p>
        </div>
      </div>
    </div>
  );

  const renderAlpha = () => (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-200">
      <div className="text-center">
        <div className="bg-white p-6 rounded-lg shadow-sm inline-block">
          <h4 className="font-bold text-orange-700 mb-4">Hladina významnosti</h4>
          <div className="text-4xl font-bold text-orange-600 mb-2">α = 0.05</div>
          <p className="text-gray-600">5% riziko chyby I. druhu</p>
          <p className="text-sm text-gray-500 mt-2">
            Pravděpodobnost zamítnutí správné H₀
          </p>
        </div>
      </div>
    </div>
  );

  const renderData = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
        <h4 className="font-bold text-green-700 mb-4">Popisné statistiky vzorku</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{sampleSize}</div>
            <div className="text-sm text-gray-600">Velikost vzorku (n)</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{sampleMean} cm</div>
            <div className="text-sm text-gray-600">Výběrový průměr (x̄)</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{sampleSD} cm</div>
            <div className="text-sm text-gray-600">Směr. odchylka (s)</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h5 className="font-semibold mb-3">Rozdělení výšek ve vzorku</h5>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="student" />
            <YAxis domain={[160, 190]} />
            <Tooltip formatter={(value) => [`${value} cm`, 'Výška']} />
            <Bar 
              dataKey="height" 
              fill={(entry) => entry?.isAboveNull ? "#10b981" : "#3b82f6"}
            />
            <ReferenceLine y={nullMean} stroke="#ef4444" strokeDasharray="5 5" label="H₀: μ = 175" />
            <ReferenceLine y={sampleMean} stroke="#059669" strokeDasharray="5 5" label="x̄ = 172.5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderDistribution = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border-2 border-purple-200">
        <h4 className="font-bold text-purple-700 mb-2">t-rozdělení (df = 29)</h4>
        <p className="text-sm text-gray-600">Kritické hodnoty pro α = 0.05: ±2.045</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={tDistData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" domain={[-4, 4]} />
            <YAxis />
            <Tooltip formatter={(value, name) => [value.toFixed(3), 'Hustota']} />
            <Area 
              dataKey="y" 
              stroke="#8b5cf6" 
              fill="#8b5cf6" 
              fillOpacity={0.3}
            />
            <ReferenceLine x={-criticalValue} stroke="#ef4444" strokeDasharray="5 5" label="-2.045" />
            <ReferenceLine x={criticalValue} stroke="#ef4444" strokeDasharray="5 5" label="2.045" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-2 text-center text-sm text-gray-600">
          <span className="text-red-500">■</span> Kritická oblast (α/2 = 0.025 v každém ocasu)
        </div>
      </div>
    </div>
  );

  const renderTestStat = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border-2 border-indigo-200">
        <h4 className="font-bold text-indigo-700 mb-4">Výpočet testové statistiky</h4>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-center space-y-2">
            <div className="text-lg">t = (x̄ - μ₀) / (s/√n)</div>
            <div className="text-lg">t = ({sampleMean} - {nullMean}) / ({sampleSD}/√{sampleSize})</div>
            <div className="text-lg">t = -2.5 / 1.497</div>
            <div className="text-2xl font-bold text-indigo-600">t = {tStat}</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h5 className="font-semibold mb-3">Pozice testové statistiky</h5>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={tDistData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" domain={[-4, 4]} />
            <YAxis />
            <Tooltip formatter={(value, name) => [value.toFixed(3), 'Hustota']} />
            <Area 
              dataKey="y" 
              stroke="#8b5cf6" 
              fill="#8b5cf6" 
              fillOpacity={0.3}
            />
            <ReferenceLine x={-criticalValue} stroke="#ef4444" strokeDasharray="5 5" label="-2.045" />
            <ReferenceLine x={criticalValue} stroke="#ef4444" strokeDasharray="5 5" label="2.045" />
            <ReferenceLine x={tStat} stroke="#059669" strokeWidth={3} label={`t = ${tStat}`} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-2 text-center text-sm text-gray-600">
          <span className="text-red-500">■</span> Kritická oblast 
          <span className="ml-4 text-green-500">■</span> Naše testová statistika
        </div>
      </div>
    </div>
  );

  const renderDecision = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-lg border-2 border-emerald-200">
        <h4 className="font-bold text-emerald-700 mb-4">Rozhodnutí a závěr</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold text-gray-700 mb-2">Kritérium</h5>
            <p className="text-lg">|t| = {Math.abs(tStat)} &lt; {criticalValue}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold text-gray-700 mb-2">P-hodnota</h5>
            <p className="text-lg">p = {pValue} &gt; α = {alpha}</p>
          </div>
        </div>

        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
          <h5 className="font-bold text-green-800 mb-2">Závěr:</h5>
          <p className="text-green-700">
            <strong>Nezamítáme nulovou hypotézu</strong> na hladině významnosti 0.05.
          </p>
          <p className="text-green-600 mt-2 text-sm">
            Nemáme dostatečné důkazy k tvrzení, že průměrná výška studentů se liší od 175 cm.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h5 className="font-semibold mb-3">Finální vizualizace</h5>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={tDistData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" domain={[-4, 4]} />
            <YAxis />
            <Tooltip formatter={(value, name) => [value.toFixed(3), 'Hustota']} />
            <Area 
              dataKey="y" 
              stroke="#8b5cf6" 
              fill="#8b5cf6" 
              fillOpacity={0.3}
            />
            <ReferenceLine x={-criticalValue} stroke="#ef4444" strokeDasharray="5 5" label="Kritická hodnota" />
            <ReferenceLine x={criticalValue} stroke="#ef4444" strokeDasharray="5 5" label="Kritická hodnota" />
            <ReferenceLine x={tStat} stroke="#059669" strokeWidth={4} label={`t = ${tStat} (nezamítnout H₀)`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCurrentComponent = () => {
    switch (steps[currentStep].component) {
      case "hypotheses": return renderHypotheses();
      case "alpha": return renderAlpha();
      case "data": return renderData();
      case "distribution": return renderDistribution();
      case "teststat": return renderTestStat();
      case "decision": return renderDecision();
      default: return renderHypotheses();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Statistická testovací procedura
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Test průměrné výšky studentů (t-test pro jeden výběr)
        </p>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Krok {currentStep + 1} z {steps.length}</span>
            <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current step */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600 mb-6">
            {steps[currentStep].description}
          </p>

          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'}`}>
            {renderCurrentComponent()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Předchozí
          </button>
          
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Další →
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatisticalTestVisualization;